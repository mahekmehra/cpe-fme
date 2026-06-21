import joblib

bundle = joblib.load(
    "../artifacts/model_v2.pkl"
)

station_map = bundle["station_frequency_map"]
junction_map = bundle["junction_frequency_map"]

default_station = bundle["default_station_frequency"]
default_junction = bundle["default_junction_frequency"]


print("Known Station")

print(
    station_map.get(
        "Upparpet",
        default_station
    )
)

print()

print("Unknown Station")

print(
    station_map.get(
        "XYZ STATION",
        default_station
    )
)

print()

print("Known Junction")

print(
    junction_map.get(
        "No Junction",
        default_junction
    )
)

print()

print("Unknown Junction")

print(
    junction_map.get(
        "ABC JUNCTION",
        default_junction
    )
)