export default function DispatchPanel({
  dispatch
}) {

  if (!dispatch) {

    return (

      <div className="
        bg-slate-800
        rounded-xl
        p-6
      ">
        No dispatch generated
      </div>
    );
  }

  return (

    <div className="
      bg-slate-800
      rounded-xl
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">
        Dispatch Intelligence
      </h2>

      <div className="
        space-y-6
      ">

        <div>

          <h3 className="
            text-blue-400
            font-semibold
          ">
            Standardized Location
          </h3>

          <p>
            {
              dispatch
              .standardized_location
            }
          </p>

        </div>

        <div>

          <h3 className="
            text-green-400
            font-semibold
          ">
            Operator Dispatch
          </h3>

          <p>
            {
              dispatch
              .operator_dispatch
            }
          </p>

        </div>

        <div>

          <h3 className="
            text-yellow-400
            font-semibold
          ">
            Citizen Alert
          </h3>

          <p>
            {
              dispatch
              .citizen_alert
            }
          </p>

        </div>

      </div>

    </div>
  );
}