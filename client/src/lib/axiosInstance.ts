// src/api/axios.ts
import axios from "axios";

// const serverUrl = process.env.REACT_APP_SERVER_URL;
// console.log(serverUrl);
const axiosInstance = axios.create({
  baseURL: `http://localhost:8080`,
  withCredentials: true,
});

export default axiosInstance;
