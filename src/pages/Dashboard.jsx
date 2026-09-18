import SensorCard from "../components/SensorCard";
import SensorChart from "../components/SensorChart";
import { resetRelay } from "../services/api";
import toast from "react-hot-toast";

import {
  ScanLine,
  ArrowRightLeft,
  Cog,
  ThermometerIcon,
  Droplets,
} from "lucide-react";

function Dashboard({ sensor, history, device, search, chartSamples }) {
  const searchText = search?.toLowerCase().trim()||"";
  const user = JSON.parse(localStorage.getItem("user"));
  const showCard = (title) => {
    if (!searchText) return true;

    return title.toLowerCase().includes(searchText);
  };

  const chartData=history
    .slice(0,Number(chartSamples))
    .reverse();

  const handleReset = async (relay) => {
    try {
      const res = await resetRelay(relay);

      toast.success(res.message);

    } catch (err) {
      toast.error("Reset gagal");
    }
  };
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-10">

        <h1
          className="text-5xl font-bold"
          style={{ color: "#243746" }}
        >
          Dashboard
        </h1>

        <p
          className="text-lg mt-2"
          style={{ color: "#243746" }}
        >
          Welcome back, {user?.name || "User"}!
        </p>

      </div>

      {/* Sensor Cards */}
      <div
        className="
          grid
          gap-6
          [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]
        "
      >
      {showCard("Reader IN") && (
        <SensorCard
          title="Reader IN"
          value={sensor.readerInVoltage}
          unit="V"
          subValue={`${sensor.readerInCurrent ?? 0} A`}
          icon={<ScanLine size={24} />}
          color="bg-pink-500"
          online={sensor.readerInVoltage > 0}
          onReset={() => handleReset(1)}
        />
      )}

      {showCard("Scanner IN") && (
        <SensorCard
          title="Scanner IN"
          value={sensor.scannerInVoltage}
          unit="V"
          subValue={`${sensor.scannerInCurrent ?? 0} A`}
          icon={<ScanLine size={24} />}
          color="bg-sky-500"
          online={sensor.scannerInVoltage > 0}
          onReset={() => handleReset(2)}
        />
      )}

      {showCard("Reader OUT") && (
        <SensorCard
          title="Reader OUT"
          value={sensor.readerOutVoltage}
          unit="V"
          subValue={`${sensor.readerOutCurrent ?? 0} A`}
          icon={<ArrowRightLeft size={24} />}
          color="bg-violet-500"
          online={sensor.readerOutVoltage > 0}
          onReset={() => handleReset(3)}
        />
      )}

      {showCard("Scanner OUT") && (
        <SensorCard
          title="Scanner OUT"
          value={sensor.scannerOutVoltage}
          unit="V"
          subValue={`${sensor.scannerOutCurrent ?? 0} A`}
          icon={<ArrowRightLeft size={24} />}
          color="bg-amber-500"
          online={sensor.scannerOutVoltage > 0}
          onReset={() => handleReset(4)}
        />
      )}

      {showCard("Motor") && (
        <SensorCard
          title="Motor"
          value={sensor.motorVoltage}
          unit="V"
          subValue={`${sensor.motorCurrent ?? 0} A`}
          icon={<Cog size={24} />}
          color="bg-emerald-500"
          online={sensor.motorVoltage > 0}
          onReset={() => handleReset(5)}
        />
      )}
      {showCard("Temperature") && (
        <SensorCard
          title="Temperature"
          value={sensor.temperature}
          unit="°C"
          subValue={`${sensor.humidity ?? 0} % RH`}
          icon={<ThermometerIcon size={24} />}
          color="bg-red-500"
          online={sensor.temperature > 0}
          showReset={false}
        />
      )}
      {showCard("Humidity") && (
        <SensorCard
          title="Humidity"
          value={sensor.humidity}
          unit="%"
          subValue={`${sensor.temperature ?? 0} °C`}
          icon={<Droplets size={24} />}
          color="bg-green-500"
          online={sensor.humidity > 0}
          showReset={false}
        />
      )}
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-8">

        {/* Charts */}
        <div className="xl:col-span-12">

            <div className="grid md:grid-cols-2 gap-6">

                <SensorChart
                    title="Reader IN Voltage"
                    history={chartData}
                    dataKey="readerInVoltage"
                    color="#EC4899"
                />

                <SensorChart
                    title="Scanner IN Voltage"
                    history={chartData}
                    dataKey="scannerInVoltage"
                    color="#0EA5E9"
                />

                <SensorChart
                    title="Reader OUT Voltage"
                    history={chartData}
                    dataKey="readerOutVoltage"
                    color="#8B5CF6"
                />

                <SensorChart
                    title="Scanner OUT Voltage"
                    history={chartData}
                    dataKey="scannerOutVoltage"
                    color="#F59E0B"
                />
                <SensorChart
                    title="Temperature"
                    history={chartData}
                    dataKey="temperature"
                    color="#EF4444"
                />

                <SensorChart
                    title="Humidity"
                    history={chartData}
                    dataKey="humidity"
                    color="#45e90e"
                />

            </div>
          </div>

        {/* Quick Information */}
        <div
          className="xl:col-span-12 rounded-3xl border shadow-sm p-6 self-start"
          style={{
            background: "#FFFFFF",
            borderColor: "#243746",
          }}
        >

          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "#243746" }}
          >
            Quick Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

              <div className="rounded-2xl border border-gray-200 bg-[#F8FCFF] p-5">
                <p className="text-sm font-medium text-gray-500">
                  ESP32
                </p>

                <div className="flex items-center gap-2 mt-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        device?.status === "Online"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span
                      className={`text-lg font-bold ${
                        device?.status === "Online"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {device?.status === "Online"
                        ? "Connected"
                        : "Offline"}
                    </span>
                  </div>
                </div>

              {/* Backend */}
                <div className="rounded-2xl border border-gray-200 bg-[#F8FCFF] p-5">
                  <p className="text-sm font-medium text-gray-500">
                    Backend
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>

                    <span className="text-lg font-bold text-green-600">
                      Running
                    </span>
                  </div>
                </div>

                {/* Database */}
                <div className="rounded-2xl border border-gray-200 bg-[#F8FCFF] p-5">
                  <p className="text-sm font-medium text-gray-500">
                    Database
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        device?.database === "Connected"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>

                    <span
                      className={`text-lg font-bold ${
                        device?.database === "Connected"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {device?.database === "Connected"
                        ? "Connected"
                        : "Disconnected"}
                    </span>
                  </div>
                </div>

                {/* Last Update */}
                <div className="rounded-2xl border border-gray-200 bg-[#F8FCFF] p-5">
                  <p className="text-sm font-medium text-gray-500">
                    Last Update
                  </p>

                  <p className="text-lg font-bold text-[#243746] mt-3">
                    {device?.lastSeen
                      ? new Date(device.lastSeen).toLocaleTimeString()
                      : "-"}
                  </p>
                </div>

              </div>


          </div>

        </div>

      </div>
  );
}

function Row({
  title,
  value,
  green = false,
}) {
  return (
    <div className="flex justify-between items-center">

      <span
        style={{
          color: "#243746",
        }}
      >
        {title}
      </span>

      <span
        className={`font-semibold ${
          green ? "text-green-600" : ""
        }`}
        style={
          green
            ? {}
            : {
                color: "#243746",
              }
        }
      >
        {green ? "● " : ""}
        {value}
      </span>

    </div>
  );
}



export default Dashboard;