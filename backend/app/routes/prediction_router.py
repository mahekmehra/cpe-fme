from fastapi import APIRouter

from app.schemas.violation_schema import (
    ViolationRequest
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


@router.post("/predict")
def predict(
       "/predict",
    response_model=PredictionResponse
)