from fastapi import APIRouter
from app.core.model_loader import registry

from app.schemas.violation_schema import (
    ViolationRequest
)

from app.schemas.prediction_response import (
    PredictionResponse
)

from app.services.prediction_service import (
    PredictionService
)

router = APIRouter()


@router.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": True
    }


@router.get("/version")
def version():

    return {
        "model_version": "v2",
        "deployment_mode": "production"
    }


@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(
    request: ViolationRequest
):

    return (
        PredictionService.predict(
            request.model_dump()
        )
    )


@router.get("/test-gemini")
def test_gemini():

    from app.services.gemini_service import (
        GeminiService
    )

    result = (
        GeminiService.generate_dispatch(
            {
                "latitude": 12.97,
                "longitude": 77.59,
                "police_station": "UPPARPET",
                "junction_name": "NO JUNCTION"
            },
            0.95
        )
    )

    return {"response": result}

@router.get("/env-check")
def env_check():

    import os

    return {
        "gemini_key_loaded":
            bool(
                os.getenv(
                    "GEMINI_API_KEY"
                )
            )
    }

@router.get("/metadata")
def metadata():

    return {

        "stations":

            sorted(
                list(
                    registry.station_map.keys()
                )
            ),

        "junctions":

            sorted(
                list(
                    registry.junction_map.keys()
                )
            )
    }