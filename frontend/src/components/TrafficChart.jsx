import {

  ResponsiveContainer,

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid

} from "recharts";

export default function TrafficChart({
  history
}) {

  return (

    <div
      className="
      bg-slate-800
      rounded-xl
      p-6
    "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-4
      "
      >
        Live Traffic Risk Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <LineChart
          data={history}
        >

          <CartesianGrid
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="time"
            tick={{
              fill: "#94a3b8"
            }}
            axisLine={{
              stroke: "#475569"
            }}
            tickLine={{
              stroke: "#475569"
            }}
          />

          <YAxis
            domain={[0, 100]}
            tick={{
              fill: "#94a3b8"
            }}
            axisLine={{
              stroke: "#475569"
            }}
            tickLine={{
              stroke: "#475569"
            }}
          />

          <Tooltip

            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "#ffffff"
            }}

            labelStyle={{
              color: "#cbd5e1"
            }}

            itemStyle={{
              color: "#3b82f6"
            }}

            formatter={(value) => [
              `${value}%`,
              "Risk Score"
            ]}
          />

          <Line
            type="monotone"
            dataKey="risk"
            stroke="#3b82f6"
            strokeWidth={3}

            dot={{
              r: 5,
              fill: "#3b82f6",
              strokeWidth: 2
            }}

            activeDot={{
              r: 8,
              fill: "#3b82f6",
              stroke: "#ffffff",
              strokeWidth: 2
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}