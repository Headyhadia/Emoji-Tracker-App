import axios from "axios";

export const API_BASE = import.meta.url.VITE_API_URL;

const API = axios.create({
  baseURL: API_BASE,
});

export default API;
