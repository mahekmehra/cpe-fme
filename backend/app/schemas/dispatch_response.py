from pydantic import BaseModel


class DispatchResponse(BaseModel):

    standardized_location: str

    operator_dispatch: str

    citizen_alert: str