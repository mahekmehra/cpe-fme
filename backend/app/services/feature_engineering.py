from datetime import datetime
import numpy as np
import pandas as pd

from app.core.model_loader import registry


class FeatureEngineeringService:

    @staticmethod
    def build_temporal_features(
        created_datetime: str
    ):

        dt = datetime.strptime(
            created_datetime,
            "%Y-%m-%d %H:%M:%S"
        )

        return {

            "hour_sin":
                np.sin(
                    2 * np.pi * dt.hour / 24
                ),

            "hour_cos":
                np.cos(
                    2 * np.pi * dt.hour / 24
                ),

            "day_sin":
                np.sin(
                    2 * np.pi * dt.weekday() / 7
                ),

            "day_cos":
                np.cos(
                    2 * np.pi * dt.weekday() / 7
                )
        }

    @staticmethod
    def encode_station(
        station_name: str
    ):

        if not station_name:
            return registry.default_station

        return registry.station_map.get(
            station_name,
            registry.default_station
        )

    @staticmethod
    def encode_junction(
        junction_name: str
    ):

        if not junction_name:
            return registry.default_junction

        return registry.junction_map.get(
            junction_name,
            registry.default_junction
        )

    @classmethod
    def create_feature_vector(
        cls,
        payload: dict
    ):

        temporal_features = (
            cls.build_temporal_features(
                payload["created_datetime"]
            )
        )

        station_encoded = (
            cls.encode_station(
                payload["police_station"]
            )
        )

        junction_encoded = (
            cls.encode_junction(
                payload["junction_name"]
            )
        )

        dataframe = pd.DataFrame(
            [
                {
                    "latitude":
                        payload["latitude"],

                    "longitude":
                        payload["longitude"],

                    "police_station_encoded":
                        station_encoded,

                    "junction_encoded":
                        junction_encoded,

                    **temporal_features
                }
            ]
        )

        dataframe = dataframe[
            registry.features_list
        ]

        return dataframe