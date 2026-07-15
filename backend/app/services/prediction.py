import os
import joblib
import pandas as pd
from pydantic import BaseModel
from typing import List, Optional

model = None
model_path = os.path.join(os.path.dirname(__file__), '..', '..', 'saved_models', 'model.joblib')

def load_model():
    global model
    if model is None:
        if os.path.exists(model_path):
            model = joblib.load(model_path)
        else:
            raise FileNotFoundError("Model not found. Please train the model first.")

def predict_single(data: dict):
    load_model()
    
    # Add default values for missing columns that the model expects
    defaults = {
        "gender": "Male",
        "SeniorCitizen": 0,
        "Partner": "No",
        "Dependents": "No",
        "PhoneService": "Yes",
        "MultipleLines": "No",
        "OnlineSecurity": "No",
        "OnlineBackup": "No",
        "DeviceProtection": "No",
        "StreamingTV": "No",
        "StreamingMovies": "No",
        "PaperlessBilling": "Yes",
        "PaymentMethod": "Electronic check"
    }
    
    for key, value in defaults.items():
        if key not in data:
            data[key] = value
            
    df = pd.DataFrame([data])
    
    # Feature Engineering (mimicking PySpark ETL)
    df["AvgMonthlySpending"] = df.apply(lambda row: round(row["TotalCharges"] / row["tenure"], 2) if row["tenure"] > 0 else 0, axis=1)
    
    def get_age_group(t):
        if t <= 12: return "0-12 months"
        elif t <= 24: return "12-24 months"
        elif t <= 60: return "24-60 months"
        return "60+ months"
    df["AgeGroup"] = df["tenure"].apply(get_age_group)
    
    def get_revenue_cat(tc):
        if tc < 1000: return "Low"
        elif tc < 4000: return "Medium"
        return "High"
    df["RevenueCategory"] = df["TotalCharges"].apply(get_revenue_cat)
    
    def get_contract_risk(c):
        if c == "Month-to-month": return "High"
        elif c == "One year": return "Medium"
        return "Low"
    df["ContractRisk"] = df["Contract"].apply(get_contract_risk)
    
    prob = model.predict_proba(df)[0][1]
    prediction = int(prob > 0.5)
    
    risk_level = "Safe"
    if prob > 0.8:
        risk_level = "High Risk"
    elif prob > 0.5:
        risk_level = "Medium Risk"
        
    return {
        "churn_probability": float(prob),
        "prediction": prediction,
        "risk_level": risk_level
    }

def predict_batch(df: pd.DataFrame):
    load_model()
    
    # Drop columns that the model was not trained on
    cols_to_drop = [c for c in ['customerID', 'Churn'] if c in df.columns]
    predict_df = df.drop(columns=cols_to_drop)
    
    probs = model.predict_proba(predict_df)[:, 1]
    
    results = []
    for prob in probs:
        risk_level = "Safe"
        if prob > 0.8:
            risk_level = "High Risk"
        elif prob > 0.5:
            risk_level = "Medium Risk"
            
        results.append({
            "churn_probability": float(prob),
            "prediction": int(prob > 0.5),
            "risk_level": risk_level
        })
    return results

