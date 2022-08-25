import axios from "axios";

const API_ROOT = "http://localhost:5000";

export const client = axios.create({
  baseURL: API_ROOT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getSidebar = async () => {
  return await client.get("/sidebar");
};
