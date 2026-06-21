from app.core.model_loader import registry
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

X = (
    FeatureEngineeringService
    .create_feature_vector(payload)
)

prediction = (
    registry.model.predict(X)[0]
)

probability = (
    registry.model.predict_proba(X)[0][1]
)

print()

print("Prediction:", prediction)

print(
    "Probability:",
    round(probability, 4)
)