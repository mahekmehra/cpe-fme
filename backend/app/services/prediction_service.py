from app.core.model_loader import registry

from app.services.feature_engineering import (
    FeatureEngineeringService
)

from app.services.gemini_service import (
    GeminiService
)

from app.services.dispatch_service import (
    DispatchService
)


class PredictionService:

    @staticmethod
    def predict(payload):

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

        probability = round(
            float(probability),
            4
        )

        if probability >= 0.70:

            risk_level = "HIGH"

        elif probability >= 0.40:

            risk_level = "MEDIUM"

        else:

            risk_level = "LOW"

        dispatch = None

        if probability >= 0.70:

            raw_response = (
                GeminiService
                .generate_dispatch(
                    payload,
                    probability
                )
            )

            dispatch = (
                DispatchService
                .parse_response(
                    raw_response
                )
            )

        return {

            "prediction":
                int(prediction),

            "probability":
                probability,

            "risk_level":
                risk_level,

            "dispatch":
                dispatch
        }