from typing import Optional

from pydantic import BaseModel

from app.schemas.dispatch_response import (
    DispatchResponse
)


class PredictionResponse(BaseModel):

    prediction: int

    probability: float

    risk_level: str

    dispatch: Optional[
        DispatchResponse
    ] = None