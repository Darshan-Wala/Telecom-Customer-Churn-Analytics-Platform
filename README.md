# 📊 Telecom Customer Churn Analytics Platform

> A full-stack Data Engineering and Machine Learning platform for customer churn prediction, business analytics, and real-time insights using **PySpark, FastAPI, PostgreSQL, Scikit-learn, and Next.js**.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![PySpark](https://img.shields.io/badge/PySpark-Big%20Data-orange)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Docker](https://img.shields.io/badge/Docker-Containerization-blue)

---

## 📌 Overview

Customer churn directly impacts business revenue and customer retention. This project demonstrates an end-to-end **Data Engineering pipeline** that transforms raw telecom customer data into actionable business insights while leveraging Machine Learning to predict customer churn.

The platform combines scalable ETL pipelines, predictive analytics, REST APIs, and an interactive analytics dashboard to support data-driven business decisions.

---

## ✨ Key Features

- ⚡ Scalable ETL pipeline using **PySpark**
- 📊 Interactive business analytics dashboard
- 🤖 Machine Learning-based churn prediction
- 🔄 Automated data preprocessing and feature engineering
- 🚀 RESTful APIs using FastAPI
- 🗄 PostgreSQL integration
- 📈 KPI dashboards and customer insights
- 📂 CSV upload and automated analytics
- 🐳 Dockerized backend for deployment

---

# 🏗 Architecture

```
                Telecom Customer Dataset
                         │
                         ▼
               PySpark ETL Pipeline
                         │
         Cleaning • Validation • Transformation
                         │
                         ▼
              Feature Engineering Layer
                         │
                         ▼
            Machine Learning Pipeline
         (Scikit-learn Classification)
                         │
        ┌────────────────┴───────────────┐
        ▼                                ▼
 Business Analytics API          Churn Prediction API
        │                                │
        └──────────────┬─────────────────┘
                       ▼
             Next.js Analytics Dashboard
```

---

# ⚙ Tech Stack

## Data Engineering

- PySpark
- ETL Pipelines
- Data Processing
- Feature Engineering
- Workflow Automation

## Backend

- FastAPI
- Python
- REST APIs

## Machine Learning

- Scikit-learn
- Pandas
- NumPy

## Database

- PostgreSQL

## Frontend

- Next.js
- React
- Tailwind CSS
- Recharts

## Deployment

- Docker

---

# 📂 Project Structure

```text
Telecom-Customer-Churn-Analytics-Platform
│
├── backend
│   ├── app
│   │   ├── ml
│   │   ├── services
│   │   ├── spark
│   │   └── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── ...
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   └── ...
│
├── README.md
└── .gitignore
```

---

# 🔄 Data Pipeline

The application follows an end-to-end Data Engineering workflow:

1. Upload telecom customer dataset
2. Validate incoming data
3. Clean and preprocess records using PySpark
4. Perform feature engineering
5. Train Machine Learning models
6. Generate churn predictions
7. Store processed data
8. Display KPIs and analytics through interactive dashboards

---

# 📊 Dashboard Features

✔ Customer Overview

✔ Revenue Analysis

✔ Churn Distribution

✔ Customer Segmentation

✔ Feature Importance

✔ High-Risk Customer Identification

✔ Individual Customer Prediction

---

# 🤖 Machine Learning Pipeline

The platform performs:

- Missing value handling
- Feature encoding
- Feature scaling
- Feature engineering
- Model training
- Model evaluation
- Churn probability prediction

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Darshan-Wala/Telecom-Customer-Churn-Analytics-Platform.git
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Train Machine Learning Model

```bash
cd backend

python -m app.ml.train
```

---

# 📈 Business Impact

This platform enables organizations to:

- Improve customer retention
- Identify high-risk customers
- Reduce churn
- Monitor customer behaviour
- Generate business KPIs
- Support data-driven decision making

---

# 👨‍💻 Author

**Darshan Wala**

Computer Engineering Student | Data Engineering & Machine Learning Enthusiast

---

## ⭐ If you found this project useful, consider giving it a star!
