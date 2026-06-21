export default function PredictionCard({
  result
}) {

  if (!result) {

    return (

      <div className="
        bg-slate-800
        rounded-xl
        p-6
      ">
        No prediction yet
      </div>
    );
  }

  return (

    <div className="
      bg-slate-800
      rounded-xl
      p-6
    ">

      <h2 className="text-2xl font-bold">
        Prediction Result
      </h2>

      <p className="mt-4">

        Probability:

        {" "}

        {(result.probability * 100)
          .toFixed(2)}%

      </p>

      <p className="mt-2">

        Risk Level:

        {" "}

        {result.risk_level}

      </p>

    </div>
  );
}