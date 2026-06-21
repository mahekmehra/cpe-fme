from app.core.model_loader import registry
from app.services.feature_engineering import (
    FeatureEngineeringService
)


class PredictionService:

    @staticmethod
    def predict(payload: dict):

        X = (
            FeatureEngineeringService
            .create_feature_vector(payload)
        )

        prediction = (
            registry.model.predict(X)[0]
        )

        probability = (
            registry.model
            .predict_proba(X)[0][1]
        )

        return {
            "prediction": int(prediction),
            "probability": round(
                float(probability),
                4
            )
        }