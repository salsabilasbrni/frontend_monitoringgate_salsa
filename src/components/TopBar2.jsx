import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Bell,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { getDevice, getLatestSensor } from "../services/api";

function TopBar2() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [device, setDevice] = useState(null);
  const [sensor, setSensor] = useState(null);
  const [backendReachable, setBackendReachable] = useState(true);
  const [databaseReachable, setDatabaseReachable] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex justify-end items-center gap-4 px-10 pt-6 pb-2">

      {/* Date */}
      <div className="bg-white border border-blue-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <CalendarDays size={20} className="text-blue-500" />
        </div>

        <div>
          <p className="text-xs text-gray-500">Date</p>
          <p className="text-sm font-semibold text-gray-800">
            {currentTime.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Time */}
      <div className="bg-white border border-blue-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <Clock size={20} className="text-blue-500" />
        </div>

        <div>
          <p className="text-xs text-gray-500">Time</p>
          <p className="text-sm font-semibold text-gray-800">
            {currentTime.toLocaleTimeString("en-GB")}
          </p>
        </div>
      </div>

      {/* Notification */}
      <div className="relative">
        <button
          onClick={() => setNotificationOpen((prev) => !prev)}
          className="bg-white border border-blue-200 rounded-2xl p-3 shadow-sm hover:bg-blue-50 transition"
        >
          <div className="relative w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <Bell size={21} className="text-blue-500" />

            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {notifications.length}
            </span>
          </div>
        </button>

        {notificationOpens && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-gray-800">Notifications</p>
              <p className="text-xs text-gray-500">
                {notifications.length} gangguan terdeteksi
              </p>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                  Tidak ada gangguan. Semua sistem normal.
                </div>
              ) : (
                notifications.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <p className="text-sm font-semibold text-red-600">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {item.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default TopBar2;