import { useEffect, useState } from "react";
import {
  Database,
  ScanLine,
  Cog,
  Activity,
  ArrowRightLeft,
  ArrowLeftRight,
  Hash,
  Clock,
  Download,
} from "lucide-react";

import Papa from "papaparse";
import { saveAs } from "file-saver";
import { getExportCSV } from "../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { getReport, getHistory } from "../services/api";
import SensorChart from "../components/SensorChart";

function Reports() {
  const [report, setReport] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {

      const reportData = await getReport();
      const historyData = await getHistory();

      setReport(reportData);
      setHistory(historyData);

  }
  const handleExportCSV = async () => {

    const data = await getExportCSV();

    const csv = Papa.unparse(data);

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    saveAs(blob, "Sensor_Report.csv");

  };
  const handleExportPDF = async () => {

      const data = await getExportCSV();

      const doc = new jsPDF();

      doc.text("IoT Monitoring Report", 14, 15);

      autoTable(doc, {

          head: [[
              "Time",
              "Reader IN",
              "Scanner IN",
              "Reader OUT",
              "Scanner OUT",
              "Motor",
              "Current",
              "Counter"
          ]],

          body: data.map(item => [

              item.created_at,

              item.reader_in_voltage,

              item.scanner_in_voltage,

              item.reader_out_voltage,

              item.scanner_out_voltage,

              item.motor_voltage,

              item.motor_current,

              item.motor_counter

          ])

      });

      doc.save("IoT_Report.pdf");

  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">

      {/* Header */}

      <div className="mb-10">

        <h1
          className="text-5xl font-bold"
          style={{ color: "#243746" }}
        >
          Reports
        </h1>

        <p
          className="text-lg mt-2"
          style={{ color: "#243746" }}
        >
          Analytics & Statistics
        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <ReportCard
            title="Total Records"
            value={report.totalRecords}
            icon={<Database size={24} />}
            color="#FB8CAC"
        />

        <ReportCard
            title="Average Reader IN"
            value={`${Number(report.avgReaderIn || 0).toFixed(2)} V`}
            icon={<ScanLine size={24} />}
            color="#EC4899"
        />
        <ReportCard
            title="Average Scanner IN"
            value={`${Number(report.avgScannerIn || 0).toFixed(2)} V`}
            icon={<ScanLine size={24} />}
            color="#3B82F6"
        />

        <ReportCard
            title="Average Reader OUT"
            value={`${Number(report.avgReaderOut || 0).toFixed(2)} V`}
            icon={<ArrowRightLeft size={24} />}
            color="#8B5CF6"
        />

        <ReportCard
            title="Average Scanner OUT"
            value={`${Number(report.avgScannerOut || 0).toFixed(2)} V`}
            icon={<ArrowLeftRight size={24} />}
            color="#F59E0B"
        />

        <ReportCard
            title="Average Motor"
            value={`${Number(report.avgMotorVoltage || 0).toFixed(2)} V`}
            icon={<Cog size={24} />}
            color="#10B981"
        />

        <ReportCard
            title="Max Motor Current"
            value={`${Number(report.maxMotorCurrent || 0).toFixed(2)} A`}
            icon={<Activity size={24} />}
            color="#3B82F6"
        />

        <ReportCard
            title="Motor Counter"
            value={report.motorCounter}
            icon={<Hash size={24} />}
            color="#F59E0B"
        />
        <div className="xl:col-span-2">
            <ReportCard
                title="Last Update"
                value={
                    report.lastUpdate
                        ? new Date(report.lastUpdate).toLocaleString()
                        : "-"
                }
                icon={<Clock size={24} />}
                color="#8B5CF6"
            />
        </div>

      </div>
      {/* Analytics */}
      <div
          className="bg-white rounded-3xl border shadow-sm p-8 mt-8"
          style={{ borderColor:"#439AD0" }}
      >

      <h2
      className="text-2xl font-bold mb-8"
      style={{color:"#243746"}}
      >
      Sensor Analytics
      </h2>

      <div className="grid xl:grid-cols-2 gap-6">

          <SensorChart
              title="Reader IN Voltage"
              history={history}
              dataKey="reader_in_voltage"
              color="#EC4899"
          />

          <SensorChart
              title="Scanner IN Voltage"
              history={history}
              dataKey="scanner_in_voltage"
              color="#0EA5E9"
          />

          <SensorChart
              title="Reader OUT Voltage"
              history={history}
              dataKey="reader_out_voltage"
              color="#8B5CF6"
          />

          <SensorChart
              title="Scanner OUT Voltage"
              history={history}
              dataKey="scanner_out_voltage"
              color="#F59E0B"
          />

      </div>

      </div>

      {/* Export */}

      <div
        className="bg-white rounded-3xl p-8 border shadow-sm mt-8"
        style={{
          borderColor: "#439AD0",
        }}
      >

        <h2
          className="text-2xl font-bold mb-6"
          style={{
            color: "#243746",
          }}
        >
          Export Report
        </h2>

        <div className="flex gap-5">

            <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-pink-500 hover:bg-pink-600"
            >
                <Download size={20} />
                Export CSV
            </button>

            <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-violet-500 hover:bg-violet-600"
            >
                <Download size={20} />
                Export PDF
            </button>

        </div>
      </div>

    </div>
  );
}

function ReportCard({
  title,
  value,
  icon,
  color,
}) {
  return (

    <div
      className="bg-white rounded-3xl border shadow-sm p-6 hover:-translate-y-1 transition"
      style={{
        borderColor: "#439AD0",
      }}
    >

      <div className="flex justify-between items-center">

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

export default Reports;