from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.prediction_router import (
    router
)

app = FastAPI(

    title="CPE-FME API",

    description=
    "Traffic Bottleneck Prediction Engine",

    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
        "https://cpe-fme.vercel.app"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

app.include_router(router)


@app.get("/")
def root():

    return {
        "message":
        "CPE-FME Backend Running"
    }