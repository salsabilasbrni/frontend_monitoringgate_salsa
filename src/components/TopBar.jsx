import { useEffect, useState } from "react";
import { CalendarDays, Clock, Bell } from "lucide-react";

function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

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
      <button className="bg-white border border-blue-200 rounded-2xl p-3 shadow-sm hover:bg-blue-50 transition">
        <div className="relative w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <Bell size={21} className="text-blue-500" />

          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            0
          </span>
        </div>
      </button>

    </div>
  );
}

export default TopBar;