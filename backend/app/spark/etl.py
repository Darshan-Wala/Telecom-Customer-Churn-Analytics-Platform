import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, when, isnan, count, mean, round

def get_spark_session():
    return SparkSession.builder \
        .appName("ChurnPredictionETL") \
        .master("local[*]") \
        .config("spark.driver.memory", "2g") \
        .getOrCreate()

def run_etl(file_path: str):
    spark = get_spark_session()
    
    # Load Data
    df = spark.read.csv(file_path, header=True, inferSchema=True)
    
    # Handle Missing Values & Fix Data Types
    # TotalCharges is string initially, needs to be cast to double
    df = df.withColumn("TotalCharges", col("TotalCharges").cast("double"))
    
    # Fill missing TotalCharges with Mean or 0
    mean_total = df.select(mean(col('TotalCharges'))).collect()[0][0]
    if mean_total is None:
        mean_total = 0.0
    df = df.fillna(mean_total, subset=['TotalCharges'])
    
    # Drop Duplicates
    df = df.dropDuplicates()
    
    # Feature Engineering
    # Average Monthly Spending = TotalCharges / tenure
    df = df.withColumn(
        "AvgMonthlySpending", 
        when(col("tenure") > 0, round(col("TotalCharges") / col("tenure"), 2)).otherwise(0)
    )
    
    # Customer Age Group
    df = df.withColumn(
        "AgeGroup",
        when(col("tenure") <= 12, "0-12 months")
        .when((col("tenure") > 12) & (col("tenure") <= 24), "12-24 months")
        .when((col("tenure") > 24) & (col("tenure") <= 60), "24-60 months")
        .otherwise("60+ months")
    )
    
    # Revenue Category
    df = df.withColumn(
        "RevenueCategory",
        when(col("TotalCharges") < 1000, "Low")
        .when((col("TotalCharges") >= 1000) & (col("TotalCharges") < 4000), "Medium")
        .otherwise("High")
    )
    
    # Contract Risk Score
    df = df.withColumn(
        "ContractRisk",
        when(col("Contract") == "Month-to-month", "High")
        .when(col("Contract") == "One year", "Medium")
        .otherwise("Low")
    )
    
    # Encoding and further steps for ML will be handled by Pandas/Scikit-learn pipeline
    # since Scikit-learn requires Pandas dataframes, we convert the PySpark dataframe to Pandas
    
    pdf = df.toPandas()
    
    # Encoding target variable
    pdf['Churn'] = pdf['Churn'].map({'Yes': 1, 'No': 0})
    
    return pdf
