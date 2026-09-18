import { useState, useEffect } from "react";
import {

Server,
Database,
Wifi,
RefreshCw,
Info,

Bell,
Moon,

} from "lucide-react";
import { getDevice } from "../services/api";

function Settings() {
    const [device, setDevice] = useState(null);
    const [refreshInterval, setRefreshInterval] = useState(
      localStorage.getItem("refreshInterval")||"2"
    );

    const [historyRows, setHistoryRows] = useState(
        localStorage.getItem("historyRows") || "10"
    );
    const [chartSamples, setChartSamples] = useState(
        localStorage.getItem("chartSamples") || "20"
    );

    useEffect(()=>{
      const loadDevice = async()=>{
        try{
          const data = await getDevice();
          setDevice(data);
        }catch (err){
          console.error("Gagal mengambil data device:",err);
          
        }
      };
      loadDevice();
      const interval=setInterval(loadDevice,2000);
      return ()=>clearInterval(interval);

    },[]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">

      <div className="mb-10">
        <h1
          className="text-5xl font-bold"
          style={{ color: "#243746" }}
        >
          Settings
        </h1>

        <p
          className="text-lg mt-2"
          style={{ color: "#243746" }}
        >
          Dashboard Configuration
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <SettingCard
            icon={<Server size={24} />}
            title="Device Information"
        >

            <SettingRow
                label="ESP32 Status"
                value={device?.status==="Online"
                  ?"🟢 Online"
                  :"🔴 Offline"
                }
            />

            <SettingRow
                label="IP Address"
                value={device?.ip||"-"}
            />

            <SettingRow
                label="Firmware"
                value={device?.firmware||"-"}
            />

            <SettingRow
                label="Database"
                value={device?.database||"-"}
            />

        </SettingCard>

        <SettingCard
            icon={<RefreshCw size={24} />}
            title="Dashboard Preferences"
        >

            Auto Refresh

            <p className="mt-4 mb-2">Auto Refresh</p>
            <select
              value={refreshInterval}
              onChange={(e)=>{
                setRefreshInterval(e.target.value);
                localStorage.setItem("refreshInterval",e.target.value);
              }}
              className="mt-2 border rounded-xl px-4 py-2 w-full"
            >
              <option value="1">1 Second</option>
              <option value="2">2 Seconds</option>
              <option value="5">5 Seconds</option>
              <option value="10">10 Seconds</option>
            </select>

            History Rows

            <p className="mt-4 mb-2">History Rows</p>

            <select
                value={historyRows}
                onChange={(e) => {
                    setHistoryRows(e.target.value);
                    localStorage.setItem("historyRows", e.target.value);
                }}
                className="mt-2 border rounded-xl px-4 py-2 w-full"
            >
                <option value="10">10 Rows</option>
                <option value="20">20 Rows</option>
                <option value="50">50 Rows</option>
                <option value="100">100 Rows</option>
            </select>

            Chart Samples

            <p className="mt-4 mb-2">Chart Samples</p>

            <select
              value={chartSamples}
              onChange={(e)=>{
                setChartSamples(e.target.value);
                localStorage.setItem("chartSamples",e.target.value);
              }}
              className="mt-2 border rounded-xl px-4 py-2 w-full"
            >
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>

        </SettingCard>

        <SettingCard
            icon={<Bell size={24} />}
            title="Notification"
        >

        <label>

        <input type="checkbox"/>

        Sound Notification

        </label>

        <label>

        <input type="checkbox"/>

        Temperature Alert

        </label>

        <label>

        <input type="checkbox"/>

        Voltage Alert

        </label>

        </SettingCard>

        <SettingCard
          icon={<Wifi size={24}/>}
          title="ESP32 Status"
        >
          <div className="flex items-center gap-2 mt-3">

            <div 
              className={`w-3 h-3 rounded-full ${
                device?.status==="Online"
                  ?"bg-green-500"
                  :"bg-red-500"
              }`}
            ></div>

            <span
              className={
                device?.status==="Online"
                  ?"tect-green-600 font-semibold"
                  :"text-red-500 font-semibold"
              }
            >
              {device?.status==="Online"
                ?"Online"
                :"Offline"}
            </span>

          </div>
        </SettingCard>

      </div>

      <div
        className="bg-white rounded-3xl shadow-sm border mt-8 p-8"
        style={{borderColor:"#008EE6"}}
      >

        <div className="flex items-center gap-3 mb-5">

          <Info size={24} color="#008EE6"/>

          <h2
            className="text-2xl font-bold"
            style={{color:"#243746"}}
          >
            Application Information
          </h2>

        </div>

        <div className="space-y-2">

          <p><b>Application</b> : IoT Monitoring Dashboard</p>

          <p><b>Version</b> : 1.0.0</p>

          <p><b>Framework</b> : React + Express + MySQL</p>

          <p><b>Developer</b> : Salsabila Sabarani</p>

        </div>

      </div>

    </div>
  );
}

function SettingCard({
  icon,
  title,
  children,
}){

  return(

    <div
      className="bg-white rounded-3xl border shadow-sm p-6"
      style={{
        borderColor:"#008EE6"
      }}
    >

      <div className="flex items-center gap-3">

        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
          style={{
            background:"#008EE6"
          }}
        >
          {icon}
        </div>

        <h2
          className="text-xl font-bold"
          style={{
            color:"#243746"
          }}
        >
          {title}
        </h2>

      </div>

      <div className="mt-5">

        {children}

      </div>

    </div>

  )

}

function SettingRow({ label, value }) {

    return (

        <div className="flex justify-between py-2 border-b border-pink-100">

            <span
                style={{
                    color:"#243746"
                }}
            >
                {label}
            </span>

            <span
                className="font-semibold"
                style={{
                    color:"#243746"
                }}
            >
                {value}
            </span>

        </div>

    );

}

export default Settings;