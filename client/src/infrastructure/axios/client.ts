import axios from "axios";

const token = JSON.parse(localStorage.getItem("user") as string);

export const axiosClient = axios.create({
  baseURL: "http://localhost:5001/api/",
  headers: { Authorization: token ? `Bearer ${token}` : "" },
});

// export const axiosClient = axios.create({
//   url
//   headers: { Authorization: token ? `Bearer ${token}` : "" },
// });

// const userData = JSON.parse(localStorage.getItem("user") as string);
// axios.defaults.headers.common["Authorization"] = userData
//   ? `Bearer ${userData.token}`
//   : "";
