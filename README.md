# 🚦 AI Traffic Intelligence System

> Smart City Traffic Bottleneck Prediction & Dispatch Intelligence Platform

---

## 📋 Overview

AI Traffic Intelligence System is an intelligent traffic operations platform designed to assist Smart City authorities in **proactively identifying potential traffic bottlenecks, congestion hotspots, and operational disruptions** before they escalate into large-scale urban gridlocks.

The system combines **Machine Learning**, **Geospatial Analytics**, **Temporal Traffic Pattern Modeling**, and **Generative AI-powered Dispatch Intelligence** to deliver actionable recommendations for traffic management teams.

Unlike traditional traffic monitoring systems that rely primarily on reactive intervention, this platform enables **predictive traffic operations** by estimating bottleneck probability from incoming traffic violation incidents and contextual traffic information.

> ⚠️ This project is currently an active prototype. Predictions and dispatch guidelines are intended for research, system exploration, and operational validation. Future iterations will progressively incorporate live sensor feeds, advanced computer vision systems, and multi-model frameworks to optimize real-world field precision.

---

## ⚠️ Problem Statement

Urban traffic management systems frequently suffer from severe structural inefficiencies:

- **Reactive Congestion Management** — Operations act after gridlocks have already formed.
- **Lack of Predictive Analytics** — Inability to forecast bottleneck probabilities before they spread.
- **Blind Spots in Violations** — Limited visibility into how specific violations trigger broader congestion.
- **Delayed Enforcement** — Latency between incident occurrences and field officer deployment.
- **Siloed Communications** — Poor coordination between control rooms and field officers.
- **Manual Decision-Making** — Absence of automated, AI-assisted dispatch recommendations.

Traffic violations — illegal parking, unauthorized stopping, vehicle breakdowns, encroachments, and lane obstructions — frequently act as catalysts for massive traffic bottlenecks. This project shifts operations from **reactive monitoring** to **predictive intervention**.

---

## 🎯 Project Goals

**Primary Objectives**

| # | Goal | Description |
|---|------|-------------|
| 🔮 | Predict Bottleneck Probability | Quantify the likelihood of an incident causing severe congestion |
| 🛑 | Proactive Mitigation | Identify high-risk incidents before physical gridlocks form |
| ⚡ | GenAI Dispatch Recommendations | Instantly generate operational directives using LLMs |
| 📢 | Citizen Advisories | Produce automated public-facing traffic alerts |
| 🗺️ | Spatial Visualizations | Plot incident locations and risk distributions interactively |
| 🏢 | Control Room Support | Provide a unified interface for Smart City Traffic Operations Centers |

**Long-Term Vision**

Transform the system into a city-wide traffic intelligence platform capable of delivering real-time traffic forecasting, dynamic route optimization, automated enforcement prioritization, and integrated command center workflows.

---

## 🏗️ Solution Architecture

The platform processes incoming traffic incident data through an intelligent multi-layered pipeline to yield real-time operator alerts and public notifications.

```
       [ Traffic Incident ]
                │
                ▼
   ┌─────────────────────────┐
   │ Feature Engineering     │  (Spatial & Cyclical Temporal Processing)
   └────────────┬────────────┘
                │
                ▼
   ┌─────────────────────────┐
   │ Machine Learning Engine │  (Random Forest Classifier)
   └────────────┬────────────┘
                │
                ▼
   ┌─────────────────────────┐
   │ Risk Assessment Engine  ├─► [ Risk Classification (Low / Med / High) ]
   └────────────┬────────────┘
                │
                ▼
   ┌─────────────────────────┐
   │  Dispatch Intel Layer   │  (Gemini AI API)
   └────────────┬────────────┘
                │
                ├──────────────────────────────┐
                ▼                              ▼
   ┌─────────────────────────┐    ┌─────────────────────────┐
   │ Operator Directives     │    │ Citizen Advisories      │
   └────────────┬────────────┘    └────────────┬────────────┘
                │                              │
                └──────────────┬───────────────┘
                               │
                               ▼
                  ┌─────────────────────────┐
                  │  Interactive Dashboard  │
                  └─────────────────────────┘
```

---

## 📊 Dataset & Feature Engineering

The ML model was trained on real-world **Bengaluru (India)** traffic violation and incident logs, encompassing geographic coordinates, police station jurisdictions, junction locations, temporal features, vehicle types, and historical enforcement data.

### 1. Spatial Features

| Feature | Description |
|---------|-------------|
| `latitude` | Absolute geographic marker — incident location (N-S) |
| `longitude` | Absolute geographic marker — incident location (E-W) |

### 2. Frequency Encoded Features

Categorical variables with high cardinality are mapped to numerical weights based on historical incident density.

- **Police Station Encoding** — e.g., Upparpet → `0.11549`, Shivajinagar → `0.09396`, Bellandur → `0.01663`
- **Junction Encoding** — High-risk nodes mapped to calculated frequency densities (e.g., No Junction → `0.49549`)

### 3. Temporal Features (Cyclical Encodings)

Traffic patterns naturally repeat across hours and days. To preserve continuity (e.g., hour 23 being close to hour 0), time features are transformed using sine and cosine encodings.

| Feature | Description |
|---------|-------------|
| `hour_sin`, `hour_cos` | Cyclical hour encoding |
| `day_sin`, `day_cos` | Cyclical day-of-week encoding |

**Final Input Feature Set:**
```
[latitude, longitude, police_station_encoded, junction_encoded, hour_sin, hour_cos, day_sin, day_cos]
```

---

## 🤖 Model Training & Validation

**Selected Architecture: Random Forest Classifier**

The Random Forest algorithm was chosen for its non-linear decision boundary capabilities, robust handling of noisy data, immunity to outliers, and interpretable feature importances.

```
[Raw Data] → [Clean & Impute] → [Frequency Encode] → [Cyclical Temporal Encode] → [RF Train] → [Evaluate & Package]
```

### Feature Importance Breakdown

| Feature | Importance | Role |
|---------|-----------|------|
| `hour_sin` | 29.3% | Major factor; captures cyclical rush hour thresholds |
| `longitude` | 21.4% | Spatial grid mapping east-west corridors |
| `latitude` | 20.4% | Spatial grid mapping north-south corridors |
| `hour_cos` | 13.9% | Secondary temporal feature isolating day vs. night cycles |
| `police_station_encoded` | 5.7% | Local administrative jurisdiction weights |
| `junction_encoded` | 4.7% | Specific localized intersection risk factors |
| `day_sin` | 2.6% | Weekly structural trends (Weekdays vs. Weekends) |
| `day_cos` | 1.7% | Secondary weekly macro-trends |

### Operational Scenario Testing

The model underwent rigorous validation across:

- **Temporal Extremes** — Peak Morning/Evening Rush, Midday Off-Peak, Deep Midnight Traffic
- **Spatial Fallbacks** — Known vs. Unknown Police Stations and Junctions using default fallback encoding
- **Coordinate Drift** — Resilience tested across minor geographic coordinate variations

---

## 🧠 Gemini AI Dispatch Intelligence

The platform integrates **Google Gemini LLM** layers to translate raw numeric risks into contextual, actionable field instructions:

- **Operator Dispatch Directives** — Step-by-step instructions for traffic controllers, towing teams, and nearby field officers
- **Citizen Advisories** — Public-facing alerts formatted for social media, navigation apps, and digital signage
- **Location Standardization** — Parses raw lat/long coordinates into plain, human-readable intersection descriptions

---

## ⚡ Backend Architecture & API Specifications

Built on a modular microservices architecture utilizing **FastAPI** for high performance and async execution.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Core Framework | FastAPI |
| Data & ML Pipeline | Scikit-Learn, Pandas, NumPy, Joblib |
| GenAI Routing | Gemini API Engine |

### Core Service Modules

- 📦 **Model Loader** — Handles caching and operational memory lifecycle of the trained RF pipeline
- ⚙️ **Feature Engineering Service** — Formats inbound JSON payloads into mathematical vectors
- 🔮 **Prediction Service** — Executes vector inferences and outputs precise probability boundaries
- 🤖 **Gemini Service** — Manages context injection and prompt-engineered outputs
- ⚡ **Dispatch Service** — Formats mixed-model outputs into structured payloads

### Primary API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Validates backend cluster stability |
| `GET` | `/version` | Returns active application deployment context |
| `GET` | `/metadata` | Returns valid Police Stations, Junctions, Vehicle Types, and Violation Types |
| `POST` | `/predict` | Submits a field incident to run predictive inferencing |

### Sample Request

```json
{
  "latitude": 12.9716,
  "longitude": 77.5946,
  "police_station": "Upparpet",
  "junction": "No Junction",
  "vehicle_type": "Four Wheeler",
  "violation_type": "Illegal Parking",
  "hour": 18,
  "day_of_week": 3
}
```

### Sample Response

```json
{
  "prediction": 1,
  "probability": 0.846,
  "risk_level": "HIGH",
  "dispatch": {
    "standardized_location": "Near Majestic Interchange, Upparpet Jurisdiction",
    "operator_instruction": "HIGH RISK: Dispatch local towing unit immediately to clear lane obstruction. Adjust traffic signal cycles at adjacent nodes to prevent cascading queueing.",
    "citizen_advisory": "Traffic Alert: Delays expected near Majestic Area due to an obstruction. Seek alternative routes if possible."
  }
}
```

---

## 🖥️ Frontend Dashboard

Designed for deployment within Smart City Operations Centers:

- 📥 **Incident Capture Panel** — Standardized form entry for real-time incident reports (coordinates, violations, vehicle types)
- 🗺️ **Interactive Geospatial Map** — Leaflet-powered map with color-coded risk indicators
- 📊 **Trend Analytics Engine** — Recharts rendering for real-time and historical risk probability plots
- 🚨 **Command & Dispatch Widget** — Dedicated terminal displaying LLM-generated operational guidelines and public alerts

---

## 📁 Repository Structure

```
├── backend/            # FastAPI application, prediction pipelines, and GenAI services
├── frontend/           # React single-page application dashboard (Leaflet & Recharts)
├── docs/               # System documentation, model training notes, Jupyter notebooks, model validation script
└── README.md           # Core project documentation
```

---

## 🚀 Future Roadmap

```
 Phase 2             Phase 3             Phase 4             Phase 5             Phase 6
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Heatmaps &  │ ──► │   FASTag    │ ──► │    CCTV     │ ──► │  Streaming  │ ──► │  Unified    │
│ Ensembles   │     │ Integration │     │  Analytics  │     │(Kafka/Spark)│     │ Command Ctr │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

| Phase | Focus | Key Capabilities |
|-------|-------|-----------------|
| **Phase 2** | Advanced Prediction & Mapping | Dynamic real-time spatial heatmaps; multi-model ensembling (RF + XGBoost + LightGBM) |
| **Phase 3** | FASTag Frameworks | Ingest toll transaction points to measure macro corridor densities and O-D traffic trends |
| **Phase 4** | Computer Vision Integration | CCTV live-feed processing for automated vehicle counts, queue lengths, and illegal parking detection |
| **Phase 5** | Streaming Infrastructure | Apache Kafka, Spark Streaming, and MQTT sensor pipelines for high-throughput telemetry |
| **Phase 6** | Unified Smart City Command Center | Cross-department integration linking traffic flow, parking enforcement, and emergency dispatchers |

---

## 👥 Contributors

Developed under the **AI-Driven Smart City Traffic Intelligence Initiative**, focusing on bridging predictive machine learning with modern generative operational decision-making frameworks.

---

## ⚖️ Disclaimer

> This project is currently an active prototype. Predictions and dispatch guidelines are meant for research, system exploration, and operational validation. Future iterations will progressively incorporate live sensor feeds, advanced computer vision systems, and multi-model frameworks to optimize real-world field precision.
