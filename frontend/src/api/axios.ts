import axios from "axios";

const api = axios.create({
  baseURL: "http://26.232.142.16:8000/api/",
});

export default api;