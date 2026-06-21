## Model Validation Summary

### Validation Objective

The objective of the validation phase was to verify that the deployed Random Forest model responds meaningfully to changes in temporal and spatial inputs rather than producing near-constant predictions.

### Validation Results

#### Temporal Sensitivity

The model demonstrated clear sensitivity to time-of-day features.

| Scenario  | Probability |
| --------- | ----------- |
| Midnight  | 0.3548      |
| Afternoon | 0.4241      |
| Rush Hour | 0.4861      |

This indicates that the cyclical temporal encodings (`hour_sin`, `hour_cos`) are actively influencing model predictions and that the model has learned traffic-related temporal patterns.

#### Spatial Sensitivity

Feature importance analysis showed that geographic coordinates contribute significantly to prediction decisions.

| Feature                | Importance |
| ---------------------- | ---------- |
| hour_sin               | 29.32%     |
| longitude              | 21.48%     |
| latitude               | 20.43%     |
| hour_cos               | 13.94%     |
| police_station_encoded | 5.75%      |
| junction_encoded       | 4.75%      |
| day_sin                | 2.59%      |
| day_cos                | 1.74%      |

Combined latitude and longitude contribution exceeds 41%, indicating that geographic position is a major predictor.

#### Station and Junction Encoding

Frequency-encoded police station and junction features were successfully integrated into the feature pipeline and verified through validation tests. However, practical prediction differences across station and junction categories were relatively small compared to temporal and coordinate-based features.

This suggests that the model relies primarily on temporal patterns and geographic coordinates rather than categorical location encodings.

### Key Findings

* The deployed model is not producing constant outputs.
* Time-of-day information is the strongest predictive signal.
* Geographic coordinates contribute substantially to predictions.
* Police station and junction frequency encodings have comparatively lower impact.
* Model predictions should be interpreted as risk estimations rather than deterministic congestion forecasts.

### Current Limitations

* The model was trained using historical violation records and does not incorporate real-time traffic feeds.
* Weather conditions, public events, road closures, and live congestion data are not currently included.
* Vehicle type and violation type are collected by the API but are not used by the trained model because they were excluded during feature selection in the training pipeline.
* Fine-grained differences between nearby locations may not always produce significantly different predictions.

### Future Improvements

* Retrain using larger and more diverse datasets.
* Incorporate live traffic sensor and camera feeds.
* Include event, weather, and roadwork information.
* Improve spatial granularity through geospatial clustering and road-network features.
* Introduce online learning and continuous model retraining.
