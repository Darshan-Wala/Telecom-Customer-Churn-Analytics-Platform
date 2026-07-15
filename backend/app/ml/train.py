import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
from app.spark.etl import run_etl

def train_model(file_path: str, model_type: str = "rf"):
    # Run PySpark ETL and get Pandas DataFrame
    print("Running PySpark ETL...")
    df = run_etl(file_path)
    
    # Drop rows where target is missing
    df = df.dropna(subset=['Churn'])
    
    X = df.drop(columns=['customerID', 'Churn'])
    y = df['Churn']
    
    # Identify numerical and categorical columns
    num_cols = X.select_dtypes(include=['int64', 'float64']).columns.tolist()
    cat_cols = X.select_dtypes(include=['object']).columns.tolist()
    
    print(f"Numerical columns: {num_cols}")
    print(f"Categorical columns: {cat_cols}")
    
    # Preprocessing pipeline
    numeric_transformer = Pipeline(steps=[
        ('scaler', StandardScaler())
    ])
    
    categorical_transformer = Pipeline(steps=[
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, num_cols),
            ('cat', categorical_transformer, cat_cols)
        ])
    
    # Model selection
    if model_type == "lr":
        clf = LogisticRegression(max_iter=1000)
    else:
        clf = RandomForestClassifier(n_estimators=100, random_state=42)
        
    pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                               ('classifier', clf)])
    
    # Train-test split (80-20)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training model...")
    pipeline.fit(X_train, y_train)
    
    print("Evaluating model...")
    y_pred = pipeline.predict(X_test)
    y_prob = pipeline.predict_proba(X_test)[:, 1]
    
    metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "f1": f1_score(y_test, y_pred),
        "roc_auc": roc_auc_score(y_test, y_prob),
    }
    
    print("Metrics:", metrics)
    
    # Save model
    os.makedirs(os.path.join(os.path.dirname(__file__), '..', '..', 'saved_models'), exist_ok=True)
    model_path = os.path.join(os.path.dirname(__file__), '..', '..', 'saved_models', 'model.joblib')
    joblib.dump(pipeline, model_path)
    print(f"Model saved to {model_path}")
    
    return metrics

if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '.env'))
    dataset_path = os.getenv("DATASET_PATH")
    if dataset_path and os.path.exists(dataset_path):
        train_model(dataset_path)
    else:
        print(f"Dataset not found at {dataset_path}. Please update .env DATASET_PATH.")
