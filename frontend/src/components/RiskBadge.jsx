export default function RiskBadge({
  risk
}) {

  const styles = {

    LOW:
      "bg-green-500 text-black",

    MEDIUM:
      "bg-yellow-500 text-black",

    HIGH:
      "bg-red-500 text-white"
  };

  return (

    <span
      className={`
        px-4
        py-2
        rounded-full
        font-bold
        text-sm
        ${styles[risk]}
      `}
    >
      {risk}
    </span>
  );
}