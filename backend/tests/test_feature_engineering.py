import sys
from pathlib import Path

sys.path.append(
    str(Path(__file__).resolve().parent.parent)
)

from app.services.feature_engineering import (
    FeatureEngineeringService
)


payload = {

    "latitude": 12.9716,

    "longitude": 77.5946,

    "created_datetime":
        "2026-06-21 18:30:00",

    "police_station":
        "Upparpet",

    "junction_name":
        "No Junction"
}


df = (
    FeatureEngineeringService
    .create_feature_vector(payload)
)

print(df)

print()

print(df.columns.tolist())