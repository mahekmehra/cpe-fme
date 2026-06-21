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
 
  const progressColor =

    result.risk_level === "HIGH"

        ? "bg-red-500"

        : result.risk_level === "MEDIUM"

        ? "bg-yellow-500"

        : "bg-green-500";
        
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

            className={`
            h-4
            rounded-full
            transition-all
            ${progressColor}
            `}
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
      <div className="mt-6">

        <p className="
            text-slate-400
            text-sm
        ">
            Model Decision
        </p>

        <p className="
            text-xl
            font-bold
            mt-1
        ">
            {
            result.prediction === 1
                ? "BOTTLENECK LIKELY"
                : "NO BOTTLENECK DETECTED"
            }
        </p>

      </div>

    </div>
  );
}