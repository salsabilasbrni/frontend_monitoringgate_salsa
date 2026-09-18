import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Database,
  ScanLine,
  Cog,
  Activity,
  Gauge,
  Cpu,
  Thermometer,
  Droplets,
} from "lucide-react";
import { getAllSensor } from "../services/api";

function History() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await getAllSensor();
    setData(result);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = Number(localStorage.getItem("historyRows")) || 10;
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      new Date(item.created_at)
          .toLocaleString()
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const avgReader =
    data.length > 0
      ? (
          data.reduce(
            (a, b) => a + Number(b.reader_in_voltage),
            0
          ) / data.length
        ).toFixed(2)
      : 0;
  const avgScannerIn =
  data.length > 0
    ? (
        data.reduce(
          (a, b) => a + Number(b.scanner_in_voltage),
          0
        ) / data.length
      ).toFixed(2)
    : 0;

  const avgReaderOut =
    data.length > 0
      ? (
          data.reduce(
            (a, b) => a + Number(b.reader_out_voltage),
            0
          ) / data.length
        ).toFixed(2)
      : 0;

  const avgScannerOut =
    data.length > 0
      ? (
          data.reduce(
            (a, b) => a + Number(b.scanner_out_voltage),
            0
          ) / data.length
        ).toFixed(2)
      : 0;

  const avgMotor =
    data.length > 0
      ? (
          data.reduce(
            (a, b) => a + Number(b.motor_voltage),
            0
          ) / data.length
        ).toFixed(2)
      : 0;

  const avgCurrent =
    data.length > 0
      ? (
          data.reduce(
            (a, b) => a + Number(b.motor_current),
            0
          ) / data.length
        ).toFixed(2)
      : 0;

  const avgTemperature =
    data.length > 0
      ? (
          data.reduce(
            (a, b) => a + Number(b.temperature),
            0
          ) / data.length
        ).toFixed(2)
      : 0;

  const avgHumidity =
    data.length > 0
      ? (
          data.reduce(
            (a, b) => a + Number(b.humidity),
            0
          ) / data.length
        ).toFixed(2)
      : 0;

  const totalCounter =
    data.length > 0
      ? data[0].motor_counter
      : 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-10">

        <h1
          className="text-5xl font-bold"
          style={{ color: "#243746" }}
        >
          History
        </h1>

        <p
          className="text-lg mt-2"
          style={{ color: "#243746" }}
        >
          Sensor Data History
        </p>

      </div>

      {/* Summary Cards */}

      <div className="overflow-x-auto pb-3 mb-8">

        <div className="flex gap-5 min-w-max">

          <div className="w-72 flex-shrink-0">
            <SummaryCard
              icon={<Database size={22} />}
              title="Total Records"
              value={data.length}
              color="#FB8CAC"
            />
          </div>

          <div className="w-72 flex-shrink-0">
            <SummaryCard
              icon={<ScanLine size={22} />}
              title="Average Reader IN"
              value={`${avgReader} V`}
              color="#EC4899"
            />
          </div>

          <div className="w-72 flex-shrink-0">
            <SummaryCard
              icon={<ScanLine size={22} />}
              title="Average Scanner IN"
              value={`${avgScannerIn} V`}
              color="#0EA5E9"
            />
          </div>

          <div className="w-72 flex-shrink-0">
            <SummaryCard
              icon={<ScanLine size={22} />}
              title="Average Reader OUT"
              value={`${avgReaderOut} V`}
              color="#8B5CF6"
            />
          </div>

          <div className="w-72 flex-shrink-0">
            <SummaryCard
              icon={<ScanLine size={22} />}
              title="Average Scanner OUT"
              value={`${avgScannerOut} V`}
              color="#F59E0B"
            />
          </div>

          <div className="w-72 flex-shrink-0">
            <SummaryCard
              icon={<Cog size={22} />}
              title="Average Motor"
              value={`${avgMotor} V`}
              color="#10B981"
            />
          </div>

          <div className="w-72 flex-shrink-0">
            <SummaryCard
              icon={<Activity size={22} />}
              title="Average Current"
              value={`${avgCurrent} A`}
              color="#3B82F6"
            />
          </div>

          <div className="w-72 flex-shrink-0">
            <SummaryCard
              icon={<Activity size={22} />}
              title="Motor Counter"
              value={totalCounter}
              color="#6366F1"
            />
          </div>

          <div className="w-72 flex-shrink-0">
            <SummaryCard
              icon={<Thermometer size={22} />}
              title="Average Temperature"
              value={`${avgTemperature} °C`}
              color="#EF4444"
            />
          </div>

          <div className="w-72 flex-shrink-0">
            <SummaryCard
              icon={<Droplets size={22} />}
              title="Average Humidity"
              value={`${avgHumidity} %`}
              color="#06B6D4"
            />
          </div>

        </div>

      </div>

      {/* Search */}

      <div
        className="bg-white rounded-3xl p-5 border shadow-sm mb-6"
        style={{
          borderColor: "#439AD0",
        }}
      >

        <div className="flex items-center gap-3">

          <Search size={20} color="#439AD0" />

          <input
            type="text"
            placeholder="Search Time..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />

        </div>

      </div>

      {/* Table */}

      <div
        className="bg-white rounded-3xl border shadow-sm overflow-hidden"
        style={{
          borderColor: "#439AD0",
        }}
      >
          <div className="overflow-x-auto">
              <table className="min-w-[1700px] w-full border-collapse">

          <thead
            style={{
              background: "#eaf6ff",
            }}
          >

            <tr>

              <th className="px-5 py-4 text-center font-bold whitespace-nowrap">
                  ID
              </th>

              <th className="px-5 py-4 text-left font-bold whitespace-nowrap">
                  Time
              </th>

              <th className="px-5 py-4 text-center whitespace-nowrap">
                  Reader IN
              </th>

              <th className="px-5 py-4 text-center whitespace-nowrap">
                  Scanner IN
              </th>

              <th className="px-5 py-4 text-center whitespace-nowrap">
                  Reader OUT
              </th>

              <th className="px-5 py-4 text-center whitespace-nowrap">
                  Scanner OUT
              </th>

              <th className="px-5 py-4 text-center whitespace-nowrap">
                  Motor
              </th>

              <th className="px-5 py-4 text-center whitespace-nowrap">
                  Current
              </th>

              <th className="px-5 py-4 text-center whitespace-nowrap">
                  Counter
              </th>

              <th className="px-5 py-4 text-center whitespace-nowrap">
                  Temperature
              </th>

              <th className="px-5 py-4 text-center whitespace-nowrap">
                  Humidity
              </th>

            </tr>

          </thead>

          <tbody>

            {currentData.map((item, index) => (

              <tr
                key={item.id}
                className={`text-center h-16 ${
                  index % 2 === 0 ? "bg-white" : "bg-pink-50"
                } hover:bg-pink-100 transition`}
              >

                <td className="px-4 py-4 text-center font-semibold">
                    {item.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                    {new Date(item.created_at).toLocaleString()}
                </td>

                <td className="px-4 py-4 text-center">
                    {item.reader_in_voltage} V

                </td>

                <td className="px-4 py-4 text-center">

                    {item.scanner_in_voltage} V

                </td>

                <td className="px-4 py-4 text-center">

                    {item.reader_out_voltage} V

                </td>

                <td className="px-4 py-4 text-center">

                    {item.scanner_out_voltage} V

                </td>

                <td className="px-4 py-4 text-center">

                    {item.motor_voltage} V

                </td>

                <td className="px-4 py-4 text-center">

                    {item.motor_current} A

                </td>

                <td className="px-4 py-4 text-center">

                    {item.motor_counter}

                </td>

                <td className="px-4 py-4 text-center">
                    {item.temperature} °C
                </td>

                <td className="px-4 py-4 text-center">
                    {item.humidity} %
                </td>
                             
              </tr>

            ))}

          </tbody>

        </table>
        <div className="flex justify-between items-center p-5">

            <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * rowsPerPage + 1}
                -
                {Math.min(currentPage * rowsPerPage, filteredData.length)}
                {" "}of{" "}
                {filteredData.length} records
            </p>

            <div className="flex gap-2">

                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 rounded-xl border"
                >
                    Previous
                </button>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 rounded-xl border"
                >
                    Next
                </button>

            </div>

        </div>
      </div>  

      </div>

    </div>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  color,
}) {
  return (

    <div
      className="bg-white rounded-3xl p-5 shadow-sm border"
      style={{
        borderColor: "#439AD0",
      }}
    >

      <div className="flex justify-between">

        <div>

          <p
            style={{
              color: "#243746",
            }}
          >
            {title}
          </p>

          <h2
            className="text-3xl font-bold mt-3"
            style={{
              color: "#243746",
            }}
          >
            {value}
          </h2>

        </div>

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
          style={{
            background: color,
          }}
        >
          {icon}
        </div>

      </div>

    </div>

  );
}

export default History;