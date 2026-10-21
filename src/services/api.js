import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getLatestSensor = async () => {
  const res = await API.get("/sensor/latest");
  return res.data;
};

export const getHistory = async () => {
  const res = await API.get("/sensor/history");
  return res.data;
};

export const getAllSensor = async () => {
  const res = await API.get("/sensor/all");
  return res.data;
};

export const getReport = async () => {
    const res = await API.get("/report");
    return res.data;
};

export const getDevice = async () => {
    const res = await API.get("/device");
    return res.data;
};

export const getHealth = async () => {
    const res = await API.get("/health", {
        timeout: 5000,
    });

    return res.data;
};


export const getSensorCount = async () => {
  const res = await API.get("/sensor/count");
  return res.data.totalRecords;
};


// export const resetRelay = async (relay) => {
//     const ESP32_IP = "192.168.208.159";

//     const res = await axios.get(
//         `http://${ESP32_IP}/reset`,
//         {
//             params: { relay },
//             timeout: 15000,
//         }
//     );

//     return {
//         success: true,
//         message: res.data
//     };
// };


export const resetRelay = async (relay) => {
    const res = await API.post("/reset", { relay });
    return res.data;
};

export const getExportCSV = async () => {
  const res = await API.get("/export/csv");
  return res.data;
};