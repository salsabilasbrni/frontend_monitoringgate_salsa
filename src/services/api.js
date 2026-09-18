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

export const resetRelay = async (relay) => {

    const res = await API.post("/reset", {

        relay

    });

    return res.data;

};

export const getExportCSV = async () => {
  const res = await API.get("/export/csv");
  return res.data;
};