import RiskBadge from "./RiskBadge";

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

  const percentage =
    (
      result.probability * 100
    ).toFixed(2);

  return (

    <div className="
      bg-slate-800
      rounded-xl
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
      ">
        Prediction Result
      </h2>

      <div className="mt-6">

        <div className="
          flex
          justify-between
          mb-2
        ">

          <span>
            Bottleneck Probability
          </span>

          <span>
            {percentage}%
          </span>

        </div>

        <div className="
          w-full
          bg-slate-700
          rounded-full
          h-4
        ">

          <div

            className="
              bg-blue-500
              h-4
              rounded-full
              transition-all
            "

            style={{
              width:
                `${percentage}%`
            }}
          />

        </div>

      </div>

      <div className="mt-8">

        <p className="mb-3">
          Risk Classification
        </p>

        <RiskBadge
          risk={
            result.risk_level
          }
        />

      </div>

    </div>
  );
}