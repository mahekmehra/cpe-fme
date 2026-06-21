from fastapi import FastAPI

from app.routes.prediction_router import (
    router
)

app = FastAPI(

    title="CPE-FME API",

    description=
    "Traffic Bottleneck Prediction Engine",

    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def root():

    return {
        "message":
        "CPE-FME Backend Running"
    }