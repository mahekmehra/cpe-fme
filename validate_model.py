import joblib
import pandas as pd
import numpy as np
from datetime import datetime


MODEL_PATH = "artifacts/model_v2.pkl"


print("=" * 70)
print("LOADING MODEL")
print("=" * 70)

bundle = joblib.load(MODEL_PATH)

print("\nBundle Keys:\n")
print(bundle.keys())


model = bundle["model_binary"]
scaler = bundle["scaler_transform"]

station_map = bundle["station_frequency_map"]
junction_map = bundle["junction_frequency_map"]

default_station = bundle["default_station_frequency"]
default_junction = bundle["default_junction_frequency"]

features_list = bundle["features_list"]


print("\nExpected Features:")
print(features_list)


print("\nModel Loaded Successfully")

print("\n" + "=" * 70)
print("SCALER INFORMATION")
print("=" * 70)

print("\nScaler Features:")
print(scaler.feature_names_in_)

print("\nModel Feature Count:")
print(model.n_features_in_)


def build_temporal_features(timestamp):

    dt = datetime.strptime(
        timestamp,
        "%Y-%m-%d %H:%M:%S"
    )

    hour_sin = np.sin(
        2 * np.pi * dt.hour / 24
    )

    hour_cos = np.cos(
        2 * np.pi * dt.hour / 24
    )

    day_sin = np.sin(
        2 * np.pi * dt.weekday() / 7
    )

    day_cos = np.cos(
        2 * np.pi * dt.weekday() / 7
    )

    return {
        "hour_sin": hour_sin,
        "hour_cos": hour_cos,
        "day_sin": day_sin,
        "day_cos": day_cos
    }


def encode_station(station_name):

    return station_map.get(
        station_name,
        default_station
    )


def encode_junction(junction_name):

    return junction_map.get(
        junction_name,
        default_junction
    )


def create_feature_vector(payload):

    temporal = build_temporal_features(
        payload["created_datetime"]
    )

    station_encoded = encode_station(
        payload["police_station"]
    )

    junction_encoded = encode_junction(
        payload["junction_name"]
    )

    row = {
        "latitude": payload["latitude"],
        "longitude": payload["longitude"],
        "police_station_encoded": station_encoded,
        "junction_encoded": junction_encoded,
        **temporal
    }

    return pd.DataFrame([row])


sample_payload = {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "created_datetime": "2026-06-21 18:30:00",
    "police_station": "Upparpet",
    "junction_name": "No Junction"
}


print("\n")
print("=" * 70)
print("GENERATING FEATURES")
print("=" * 70)

X = create_feature_vector(sample_payload)

print(X)


print("\n")
print("=" * 70)
print("SKIPPING SCALER")
print("=" * 70)

print(
    "Scaler expects 10 features "
    "but model expects 8 features."
)

print(
    "Using raw feature vector "
    "for Random Forest inference."
)

print("\n")
print("=" * 70)
print("RUNNING INFERENCE")
print("=" * 70)

prediction = model.predict(X)[0]

probability = model.predict_proba(X)[0][1]

print(f"Prediction : {prediction}")
print(f"Probability: {probability:.4f}")


print("\n")
print("=" * 70)
print("MODEL VALIDATION COMPLETE")
print("=" * 70)