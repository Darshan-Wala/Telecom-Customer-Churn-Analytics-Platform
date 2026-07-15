from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
import uuid
import json

from app.spark.etl import run_etl
from app.services.prediction import predict_single, predict_batch

app = FastAPI(title="Churn Prediction API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), '..', 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Churn Prediction API"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a CSV.")
    
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.csv")
    
    with open(file_path, "wb") as f:
        f.write(await file.read())
        
    try:
        # Run ETL and prediction
        df = run_etl(file_path)
        predictions = predict_batch(df)
        
        df['Churn_Probability'] = [p['churn_probability'] for p in predictions]
        df['Prediction'] = [p['prediction'] for p in predictions]
        df['Risk_Level'] = [p['risk_level'] for p in predictions]
        
        # Save processed data with predictions for analytics
        processed_path = os.path.join(UPLOAD_DIR, f"{file_id}_processed.csv")
        df.to_csv(processed_path, index=False)
        
        return {
            "message": "File processed successfully",
            "file_id": file_id,
            "total_records": len(df)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analytics/{file_id}")
def get_analytics(file_id: str):
    processed_path = os.path.join(UPLOAD_DIR, f"{file_id}_processed.csv")
    if not os.path.exists(processed_path):
        raise HTTPException(status_code=404, detail="Processed file not found")
        
    df = pd.read_csv(processed_path)
    
    total_customers = len(df)
    total_revenue = df['TotalCharges'].sum()
    churn_rate = (df['Prediction'].sum() / total_customers) * 100
    
    high_risk_customers = len(df[df['Risk_Level'] == 'High Risk'])
    avg_monthly_revenue = df['MonthlyCharges'].mean()
    avg_tenure = df['tenure'].mean()
    
    contract_dist = df['Contract'].value_counts().to_dict()
    
    return {
        "kpis": {
            "total_customers": int(total_customers),
            "total_revenue": float(total_revenue),
            "churn_rate": float(churn_rate),
            "high_risk_customers": int(high_risk_customers),
            "avg_monthly_revenue": float(avg_monthly_revenue),
            "avg_tenure": float(avg_tenure)
        },
        "charts": {
            "contract_distribution": contract_dist
        }
    }

@app.post("/predict")
def predict_customer(data: dict):
    try:
        result = predict_single(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
