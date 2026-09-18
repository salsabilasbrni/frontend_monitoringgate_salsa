import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-right">
      <p className="text-sm text-[#8A6A74]">
        {time.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>

      <h2
        className="text-2xl font-semibold"
        style={{ color: "#5B4550" }}
      >
        {time.toLocaleTimeString()}
      </h2>
    </div>
  );
}

export default Clock;