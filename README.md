# 🚦 AI Traffic Intelligence System

> Smart City Traffic Bottleneck Prediction & Dispatch Intelligence Platform

[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black)](https://cpe-fme.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-blue)](https://cpe-fme.onrender.com)
[![Status](https://img.shields.io/badge/Status-Active%20Development-green)]()

🌐 **Live Dashboard:** https://cpe-fme.vercel.app

⚙️ **Backend API:** https://cpe-fme.onrender.com

📂 **GitHub Repository:** https://github.com/mahekmehra/cpe-fme

👩‍💻 **Developer Profile:** https://github.com/mahekmehra

---

# 📋 Overview

AI Traffic Intelligence System is an intelligent traffic operations platform designed to assist Smart City authorities in proactively identifying potential traffic bottlenecks, congestion hotspots, and operational disruptions before they escalate into large-scale urban gridlocks.

The system combines **Machine Learning**, **Geospatial Analytics**, **Temporal Traffic Pattern Modeling**, and **Generative AI-powered Dispatch Intelligence** to deliver actionable recommendations for traffic management teams.

Unlike traditional traffic monitoring systems that rely primarily on reactive intervention, this platform enables predictive traffic operations by estimating bottleneck probability from incoming traffic violation incidents and contextual traffic information.

> ⚠️ This project is currently an active prototype and ongoing research initiative. Predictions and dispatch guidelines are intended for research, operational validation, and system exploration. Future iterations will progressively incorporate live sensor feeds, FASTag integrations, computer vision pipelines, and real-time traffic telemetry to improve precision and scalability.

---

# ⚠️ Problem Statement

Urban traffic management systems frequently suffer from severe structural inefficiencies:

* Reactive congestion management where intervention occurs only after bottlenecks have already formed.
* Lack of predictive analytics to forecast traffic disruptions before they spread.
* Limited visibility into how individual violations contribute to larger congestion chains.
* Delayed enforcement and response coordination.
* Poor communication between control rooms and field units.
* Absence of automated decision-support systems.

Traffic violations such as illegal parking, double parking, unauthorized stopping, lane encroachments, and junction blockages frequently act as catalysts for large-scale traffic bottlenecks.

The objective of this project is to transform traffic operations from a **reactive monitoring framework** into a **predictive prioritization engine** capable of identifying and mitigating high-risk incidents before severe congestion emerges.

---

# 🎯 Project Goals

| Goal                              | Description                                                        |
| --------------------------------- | ------------------------------------------------------------------ |
| 🔮 Predict Bottleneck Probability | Estimate the likelihood of an incident causing traffic degradation |
| 🚦 Proactive Traffic Management   | Prioritize intervention before congestion escalates                |
| 🤖 AI Dispatch Intelligence       | Generate operational recommendations using LLMs                    |
| 📢 Citizen Communication          | Produce automated public-facing advisories                         |
| 🗺️ Spatial Visualization         | Display incident locations and risk distribution                   |
| 🏢 Control Room Support           | Assist traffic management teams with decision intelligence         |

---

# 🚀 Live Deployment

## Frontend Dashboard

https://cpe-fme.vercel.app

### Features

* Interactive Traffic Intelligence Dashboard
* Real-Time Bottleneck Prediction
* Geospatial Incident Mapping
* AI Dispatch Intelligence
* Traffic Risk Trend Analytics
* Operational Decision Support

---

## Backend API

https://cpe-fme.onrender.com

### Available Endpoints

| Method | Endpoint    | Description                   |
| ------ | ----------- | ----------------------------- |
| GET    | `/`         | API Welcome Route             |
| GET    | `/health`   | Backend Health Check          |
| GET    | `/version`  | Version Information           |
| GET    | `/metadata` | Metadata Retrieval            |
| POST   | `/predict`  | Traffic Bottleneck Prediction |

### Swagger Documentation

https://cpe-fme.onrender.com/docs

---

# 🏗️ System Architecture

```text
                    Traffic Operator
                            │
                            ▼

                ┌─────────────────────┐
                │ React Dashboard UI  │
                └──────────┬──────────┘
                           │
                    HTTPS Requests
                           │
                           ▼

                ┌─────────────────────┐
                │ FastAPI Backend API │
                └──────────┬──────────┘
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼

   ┌───────────────────┐      ┌───────────────────┐
   │ Random Forest ML  │      │ Google Gemini AI  │
   │ Prediction Engine │      │ Dispatch Engine   │
   └─────────┬─────────┘      └─────────┬─────────┘
             │                           │
             └─────────────┬─────────────┘
                           ▼

                Prediction + Dispatch

                           │
                           ▼

                ┌─────────────────────┐
                │ Interactive UI      │
                │ Map + Charts + AI   │
                └─────────────────────┘
```

---

# 📊 Dataset & Feature Engineering

The model was trained using Bengaluru traffic violation and enforcement records containing approximately:

* 298,450 Incident Records
* 24 Original Features

### Core Variables

* Latitude
* Longitude
* Police Station
* Junction Name
* Vehicle Type
* Violation Type
* Incident Timestamp
* Administrative Metadata

### Data Cleaning

The preprocessing pipeline included:

* Timestamp normalization using mixed-format parsing
* Coordinate validation
* Missing value treatment
* Empty column removal
* Feature consistency verification

### Spatial Features

| Feature   | Description                     |
| --------- | ------------------------------- |
| latitude  | North-South geographic position |
| longitude | East-West geographic position   |

### Frequency Encoded Features

High-cardinality categorical variables are converted into numerical frequency-density values.

Examples:

* Upparpet → 0.11549
* Shivajinagar → 0.09396
* Bellandur → 0.01663

### Temporal Cyclical Features

| Feature  | Purpose                     |
| -------- | --------------------------- |
| hour_sin | Hour cyclic representation  |
| hour_cos | Hour cyclic representation  |
| day_sin  | Weekly cycle representation |
| day_cos  | Weekly cycle representation |

### Final Model Feature Vector

```text
[
 latitude,
 longitude,
 police_station_encoded,
 junction_encoded,
 hour_sin,
 hour_cos,
 day_sin,
 day_cos
]
```

---

# 🤖 Machine Learning Pipeline

## Model Selection

The final deployed model uses:

**Random Forest Classifier**

Selected due to:

* Strong nonlinear learning capability
* Robustness against noisy data
* Minimal assumptions regarding feature distributions
* High interpretability through feature importance analysis

---

## Training Workflow

```text
Raw Dataset
      │
      ▼

Data Cleaning
      │
      ▼

Feature Engineering
      │
      ▼

Frequency Encoding
      │
      ▼

Temporal Cyclical Encoding
      │
      ▼

Train / Validation / Test Split
      │
      ▼

Random Forest Training
      │
      ▼

Hyperparameter Optimization
      │
      ▼

Model Packaging
```

---

## Model Performance

| Metric              | Value |
| ------------------- | ----- |
| Accuracy            | ~81%  |
| ROC-AUC             | ~0.82 |
| Bottleneck F1 Score | ~0.72 |

---

## Feature Importance Analysis

| Feature                | Importance |
| ---------------------- | ---------- |
| hour_sin               | 29.3%      |
| longitude              | 21.4%      |
| latitude               | 20.4%      |
| hour_cos               | 13.9%      |
| police_station_encoded | 5.7%       |
| junction_encoded       | 4.7%       |
| day_sin                | 2.6%       |
| day_cos                | 1.7%       |

---

# 🧠 AI Dispatch Intelligence

The platform integrates Google Gemini to transform prediction outputs into actionable operational guidance.

Generated outputs include:

### Operational Dispatch Directives

Examples:

* Towing prioritization
* Traffic diversion planning
* Field officer deployment
* Intersection monitoring

### Citizen Advisories

Examples:

* Congestion warnings
* Route avoidance recommendations
* Travel delay notifications

### Location Standardization

Raw coordinates are translated into human-readable location descriptions suitable for operators and citizens.

---

# ⚡ Backend Architecture

## Technology Stack

| Layer           | Technology    |
| --------------- | ------------- |
| Framework       | FastAPI       |
| Server          | Uvicorn       |
| Validation      | Pydantic      |
| ML Framework    | Scikit-Learn  |
| AI Integration  | Google Gemini |
| Serialization   | Joblib        |
| Data Processing | Pandas, NumPy |

---

## Core Backend Modules

### Model Loader

Responsible for:

* Loading model_v2.pkl
* Loading encoding maps
* Loading metadata
* Global model caching

### Feature Engineering Service

Responsible for:

* Frequency encoding
* Temporal encoding
* Feature vector creation

### Prediction Service

Responsible for:

* Model inference
* Probability calculation
* Risk classification

### Gemini Service

Responsible for:

* Prompt generation
* Dispatch recommendation generation
* Citizen alert generation

### Dispatch Service

Responsible for:

* Response parsing
* Structured output generation

---

# 🖥️ Frontend Dashboard

## Technology Stack

| Layer              | Technology    |
| ------------------ | ------------- |
| Frontend Framework | React         |
| Build Tool         | Vite          |
| Styling            | TailwindCSS   |
| Mapping            | React Leaflet |
| Charts             | Recharts      |
| API Client         | Axios         |

---

## Dashboard Components

### Incident Submission Form

Allows operators to enter:

* Coordinates
* Police Station
* Junction
* Vehicle Type
* Violation Type
* Timestamp

### Interactive Map

Displays:

* Incident Locations
* Risk Visualization
* Geographic Context

### Risk Analytics

Displays:

* Probability Scores
* Risk Levels
* Historical Trend Charts

### Dispatch Intelligence Panel

Displays:

* Standardized Location
* Operator Instructions
* Citizen Advisories

---

# ☁️ Deployment Architecture

```text
                     GitHub Repository
                             │
                Automated CI/CD Deployments
                             │
          ┌──────────────────┴──────────────────┐
          │                                     │
          ▼                                     ▼

    Render Backend                     Vercel Frontend

   FastAPI + ML                     React Dashboard
   Random Forest                    Tailwind UI
   Gemini AI                        Leaflet Maps

          │                                     │
          └──────────────────┬──────────────────┘
                             ▼

                 Traffic Operations Users
```

---

## Backend Deployment

Platform:

**Render**

Features:

* GitHub Integration
* Automatic Deployments
* Model Hosting via Git LFS
* FastAPI Service Hosting

---

## Frontend Deployment

Platform:

**Vercel**

Features:

* Global Edge Delivery
* Automatic CI/CD
* Optimized React Deployment

---

## Security

Configured with:

* CORS Middleware
* Environment Variables
* Secure API Communication

---

# 📁 Repository Structure

```text
cpe-fme/

├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── services/
│   │
│   ├── artifacts/
│   │   └── model_v2.pkl
│   │
│   ├── tests/
│   ├── requirements.txt
│   └── render.yaml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── assets/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── notebooks/
│   ├── metrics/
│   ├── architecture/
│   └── reports/
│
└── README.md
```

---

# 📈 Current Project Status

## Completed

✅ Dataset Processing Pipeline

✅ Feature Engineering Framework

✅ Random Forest Prediction Engine

✅ FastAPI Production Backend

✅ Google Gemini Integration

✅ Interactive React Dashboard

✅ Traffic Risk Analytics

✅ Geospatial Mapping

✅ Cloud Deployment (Render + Vercel)

✅ End-to-End Prediction Workflow

---

## In Progress

🚧 Advanced Spatial Modeling

🚧 Real-Time Streaming Architecture

🚧 Automated Incident Ingestion

🚧 Smart City Integration Framework

---

# 🌆 Future Roadmap

## FASTag Integration

* Toll Booth APIs
* Vehicle Density Forecasting
* Corridor-Level Traffic Analysis

---

## Computer Vision Integration

* YOLO-Based Vehicle Detection
* Illegal Parking Detection
* Queue Length Monitoring
* Automated Incident Classification

---

## Streaming Infrastructure

* Apache Kafka
* Spark Streaming
* MQTT Sensor Networks

---

## Edge AI Deployment

* ONNX Runtime
* TensorRT Optimization
* Smart Camera Inference

---

## Unified Smart City Command Center

* Traffic Signal Integration
* Emergency Routing
* Parking Enforcement Systems
* Urban Mobility Analytics

---

# 👥 Developer

**Mahek Mehra**

GitHub: https://github.com/mahekmehra

Project Repository:

https://github.com/mahekmehra/cpe-fme

---

# ⚖️ Disclaimer

This project is currently an active prototype developed for research, smart city innovation, and operational validation purposes. While the deployed system demonstrates end-to-end predictive traffic intelligence capabilities, future versions will integrate live traffic telemetry, FASTag streams, computer vision pipelines, and real-time sensor infrastructure to improve predictive accuracy and operational scalability.

The architecture has been intentionally designed to support future expansion into a city-scale intelligent traffic management ecosystem.
