import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import TopBar2 from "./components/TopBar2";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Login from "./pages/Login";

// nanti kita buat
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import {
  getLatestSensor,
  getHistory,
  getDevice,
} from "./services/api";

function App() {
  const [sensor, setSensor] = useState({});
  const [history, setHistory] = useState([]);
  const [device, setDevice]=useState({
    status:"Offline",
    database:"Disconnected",
    lastseen: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user")
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [refreshInterval,setRefreshInterval]=useState(
    localStorage.getItem("refreshInterval")||"2"
  );
  const [chartSamples, setChartSamples] = useState(
    localStorage.getItem("chartSamples") || "20"
  );

  const loadSensor = async () => {
    try {

      const latest = await getLatestSensor();
      const historyData = await getHistory();
      const deviceData = await getDevice();
      setDevice(deviceData);

      setSensor({

      readerInVoltage: latest.reader_in_voltage,
      readerInCurrent: latest.reader_in_current,

      scannerInVoltage: latest.scanner_in_voltage,
      scannerInCurrent: latest.scanner_in_current,

      readerOutVoltage: latest.reader_out_voltage,
      readerOutCurrent: latest.reader_out_current,

      scannerOutVoltage: latest.scanner_out_voltage,
      scannerOutCurrent: latest.scanner_out_current,

      motorVoltage: latest.motor_voltage,
      motorCurrent: latest.motor_current,
      motorPower: latest.motor_power,
      motorCounter: latest.motor_counter,

      temperature: latest.temperature,
      humidity: latest.humidity

  });
      setHistory(
          historyData.map((item) => ({

              readerInVoltage: item.reader_in_voltage,

              scannerInVoltage: item.scanner_in_voltage,

              readerOutVoltage: item.reader_out_voltage,

              scannerOutVoltage: item.scanner_out_voltage,

              motorVoltage: item.motor_voltage,

              motorCurrent: item.motor_current,

              motorCounter: item.motor_counter,

              temperature: item.temperature,

              humidity: item.humidity,

              time: new Date(item.created_at).toLocaleTimeString(),

          }))
      );

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    loadSensor();

    const interval = setInterval(
      loadSensor,
      Number(refreshInterval)*1000
    );

    return () => clearInterval(interval);

  }, [refreshInterval]);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: "#F7FBFF",
      }}
    >
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main
        className="flex-1 flex flex-col overflow-hidden p-6"
        style={{
          background: "#f0f6fd",
        }}
      >
        <div className="absolute top-0 right-0 z-50">
          <TopBar2 />
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  sensor={sensor}
                  history={history}
                  device={device}
                  search={search}
                  chartSamples={chartSamples}
                />
              }
            />

            <Route
              path="/history"
              element={<History />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />
          </Routes>
        </div>
      </main>
    </div>
            
  );
}

export default App;