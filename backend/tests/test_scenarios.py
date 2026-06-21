from app.services.prediction_service import (
    PredictionService
)

scenarios = [

    {
        "name": "Afternoon Baseline",

        "latitude": 12.9716,
        "longitude": 77.5946,

        "created_datetime":
            "2026-06-21 14:00:00",

        "location":
            "Regular Street",

        "vehicle_type":
            "CAR",

        "violation_type":
            "NO PARKING",

        "police_station":
            "Upparpet",

        "junction_name":
            "No Junction"
    },

    {
        "name": "Rush Hour",

        "latitude": 12.9716,
        "longitude": 77.5946,

        "created_datetime":
            "2026-06-21 18:30:00",

        "location":
            "Regular Street",

        "vehicle_type":
            "CAR",

        "violation_type":
            "NO PARKING",

        "police_station":
            "Upparpet",

        "junction_name":
            "No Junction"
    },

    {
        "name": "Midnight",

        "latitude": 12.9716,
        "longitude": 77.5946,

        "created_datetime":
            "2026-06-21 02:00:00",

        "location":
            "Regular Street",

        "vehicle_type":
            "CAR",

        "violation_type":
            "NO PARKING",

        "police_station":
            "Upparpet",

        "junction_name":
            "No Junction"
    },

    {
        "name": "Unknown Station",

        "latitude": 12.9716,
        "longitude": 77.5946,

        "created_datetime":
            "2026-06-21 18:30:00",

        "location":
            "Regular Street",

        "vehicle_type":
            "CAR",

        "violation_type":
            "NO PARKING",

        "police_station":
            "XYZ STATION",

        "junction_name":
            "No Junction"
    },

    {
        "name": "Unknown Junction",

        "latitude": 12.9716,
        "longitude": 77.5946,

        "created_datetime":
            "2026-06-21 18:30:00",

        "location":
            "Regular Street",

        "vehicle_type":
            "CAR",

        "violation_type":
            "NO PARKING",

        "police_station":
            "Upparpet",

        "junction_name":
            "ABC JUNCTION"
    }

]


print("\n" + "=" * 80)
print("MODEL SCENARIO VALIDATION")
print("=" * 80)

for scenario in scenarios:

    result = (
        PredictionService.predict(
            scenario
        )
    )

    print("\n")
    print("-" * 50)

    print(
        f"Scenario : {scenario['name']}"
    )

    print(
        f"Probability : "
        f"{result['probability']}"
    )

    print(
        f"Prediction : "
        f"{result['prediction']}"
    )

    print(
        f"Risk Level : "
        f"{result['risk_level']}"
    )