import {

  ResponsiveContainer,

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip

} from "recharts";

export default function TrafficChart({
  history
}) {

  return (

    <div className="
      bg-slate-800
      rounded-xl
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Live Traffic Risk Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <LineChart
          data={history}
        >

          <XAxis
            dataKey="time"
          />

          <YAxis
            domain={[0, 100]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="risk"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}