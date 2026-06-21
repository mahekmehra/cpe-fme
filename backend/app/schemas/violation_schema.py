from pydantic import BaseModel, Field
from datetime import datetime


class ViolationRequest(BaseModel):

    latitude: float = Field(
        ...,
        ge=-90,
        le=90
    )

    longitude: float = Field(
        ...,
        ge=-180,
        le=180
    )

    created_datetime: str

    location: str

    vehicle_type: str

    violation_type: str

    police_station: str

    junction_name: str

    class Config:
        json_schema_extra = {
            "example": {
                "latitude": 12.9716,
                "longitude": 77.5946,
                "created_datetime": "2026-06-21 18:30:00",
                "police_station": "UPPARPET",
                "junction_name": "NO JUNCTION"
            }
        }