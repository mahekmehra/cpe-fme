import os
import google.generativeai as genai

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel(
    "models/gemini-2.5-flash"
)


class GeminiService:

    @staticmethod
    def generate_dispatch(payload, probability):

        prompt = f"""
You are a smart city traffic operations assistant.

Incident Information:

Latitude: {payload['latitude']}
Longitude: {payload['longitude']}
Police Station: {payload['police_station']}
Junction: {payload['junction_name']}
Predicted Bottleneck Probability: {probability:.2f}

Return EXACTLY in this format:

STANDARDIZED_LOCATION:
<value>

OPERATOR_DISPATCH:
<value>

CITIZEN_ALERT:
<value>
"""

        try:

            response = model.generate_content(prompt)

            return response.text

        except Exception as e:

            return f"""
        STANDARDIZED_LOCATION:
        Unknown

        OPERATOR_DISPATCH:
        Gemini generation failed.

        CITIZEN_ALERT:
        System unavailable.

        ERROR:
        {str(e)}
        """