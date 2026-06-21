from pathlib import Path
import joblib

BASE_DIR = Path(__file__).resolve().parent.parent.parent

MODEL_PATH = BASE_DIR / "artifacts" / "model_v2.pkl"


class ModelRegistry:

    def __init__(self):

        self.bundle = None

        self.model = None

        self.station_map = None
        self.junction_map = None

        self.default_station = None
        self.default_junction = None

        self.features_list = None

    def load(self):

        if self.bundle is not None:
            return

        self.bundle = joblib.load(MODEL_PATH)

        self.model = self.bundle["model_binary"]

        self.station_map = self.bundle["station_frequency_map"]

        self.junction_map = self.bundle["junction_frequency_map"]

        self.default_station = self.bundle[
            "default_station_frequency"
        ]

        self.default_junction = self.bundle[
            "default_junction_frequency"
        ]

        self.features_list = self.bundle[
            "features_list"
        ]

        print("Model bundle loaded successfully.")


registry = ModelRegistry()
registry.load()