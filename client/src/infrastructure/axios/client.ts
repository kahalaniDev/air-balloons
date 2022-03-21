import axios from "axios";

const token = JSON.parse(localStorage.getItem("user") as string);

axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";

export const axiosClient = axios.create({
  baseURL: "http://localhost:5001/api/",
});
