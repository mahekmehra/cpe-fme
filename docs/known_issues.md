# Known Deployment Issue

model_v2.pkl contains an inconsistent scaler artifact.

Scaler expects:

- latitude
- longitude
- vehicle_weight
- violation_severity
- police_station_encoded
- junction_encoded
- hour_sin
- hour_cos
- day_sin
- day_cos

Model expects:

- latitude
- longitude
- police_station_encoded
- junction_encoded
- hour_sin
- hour_cos
- day_sin
- day_cos

Cause:
Notebook 2 scaler was exported before leakage feature removal.

Resolution:
Production backend will bypass scaler_transform entirely and feed raw feature vectors directly into RandomForest model.