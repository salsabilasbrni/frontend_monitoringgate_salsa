import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function SensorChart({
  title,
  history,
  dataKey,
  color,
}) {
  return (
    <div
      className="rounded-3xl p-6 border shadow-sm"
      style={{
        background: "#b7e0ff",
        borderColor: "#439AD0",
      }}
    >
      <div className="flex justify-between items-center mb-6">

        <div>

          <h2
            className="text-2xl font-bold"
            style={{ color: "#243746" }}
          >
            {title}
          </h2>

          <p
            className="text-sm mt-1"
            style={{ color: "#243746" }}
          >
            Last 20 Samples
          </p>

        </div>

        <span
          className="font-medium"
          style={{ color: "#00b336" }}
        >
          ● Live
        </span>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={history}>

            <defs>

              <linearGradient
                id={`${dataKey}Gradient`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor={color}
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor={color}
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#243746"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
              tick={{ fill: "#243746", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#243746", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              fill={`url(#${dataKey}Gradient)`}
              dot={false}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default SensorChart;