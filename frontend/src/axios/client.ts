import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NESTJS_API,
  // baseURL: "http://localhost:8000",
  withCredentials: true,
});
