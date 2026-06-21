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

      <h2 className="text-2xl font-bold">
        Dispatch Intelligence
      </h2>

      <p className="mt-4">

        <strong>
          Location:
        </strong>

        {" "}

        {
          dispatch.standardized_location
        }

      </p>

      <p className="mt-4">

        <strong>
          Operator:
        </strong>

        {" "}

        {
          dispatch.operator_dispatch
        }

      </p>

      <p className="mt-4">

        <strong>
          Citizen Alert:
        </strong>

        {" "}

        {
          dispatch.citizen_alert
        }

      </p>

    </div>
  );
}