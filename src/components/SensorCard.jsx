import { motion } from "framer-motion";

function SensorCard({
  icon,
  title,
  value,
  unit,
  subValue,
  color,
  online = true,
  onReset,
  showReset = true,
}) {

  return (

    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      transition={{
        duration: 0.25,
      }}
      className="rounded-3xl p-6 border shadow-sm"
      style={{
        background: "#eaf6ff",
        borderColor: "#439AD0",
      }}
    >

      <div className="flex justify-between">

        <div className="flex-1">

          <p
            className="text-sm font-medium"
            style={{
              color: "#243746",
            }}
          >
            {title}
          </p>

          <h1
            className="text-4xl font-bold mt-2"
            style={{
              color: "#243746",
            }}
          >
            {value ?? "-"}
            <span
              className="text-xl ml-1"
              style={{
                color: "#243746",
              }}
            >
              {unit}
            </span>
          </h1>

          <p
            className="text-sm mt-2"
            style={{
              color: "#243746",
            }}
          >
            {subValue}
          </p>

          <div className="flex items-center gap-2 mt-5">

            <span
              className={`w-2.5 h-2.5 rounded-full ${
                online
                  ? "bg-green-400"
                  : "bg-red-500"
              }`}
            />

            <span
              className="text-sm"
              style={{
                color: online
                  ? "#2E7D32"
                  : "#D32F2F",
              }}
            >
              {online ? "Online" : "Offline"}
            </span>

          </div>
          {showReset && (
            <button
              onClick={onReset}
              className="mt-5 px-5 py-2 rounded-xl text-white font-medium transition hover:scale-105"
              style={{
                background: "#005E99",
              }}
            >
              Reset
            </button>
          )}

        </div>

        <div
          className={`${color}
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            text-white
            shadow-md`}
        >
          {icon}
        </div>

      </div>

    </motion.div>

  );

}

export default SensorCard;