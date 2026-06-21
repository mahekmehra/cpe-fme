class DispatchService:

    @staticmethod
    def parse_response(text):

        result = {

            "standardized_location": "",

            "operator_dispatch": "",

            "citizen_alert": ""
        }

        lines = text.split("\n")

        current = None

        for line in lines:

            line = line.strip()

            if line.startswith(
                "STANDARDIZED_LOCATION:"
            ):

                current = "standardized_location"

                result[current] = (
                    line.replace(
                        "STANDARDIZED_LOCATION:",
                        ""
                    ).strip()
                )

            elif line.startswith(
                "OPERATOR_DISPATCH:"
            ):

                current = "operator_dispatch"

                result[current] = (
                    line.replace(
                        "OPERATOR_DISPATCH:",
                        ""
                    ).strip()
                )

            elif line.startswith(
                "CITIZEN_ALERT:"
            ):

                current = "citizen_alert"

                result[current] = (
                    line.replace(
                        "CITIZEN_ALERT:",
                        ""
                    ).strip()
                )

            elif current and line:

                result[current] += " " + line

        return result