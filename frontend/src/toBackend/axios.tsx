import axios from "axios";
import { response } from "express";

const instance = axios.create({
  baseURL: `http://127.0.0.1:8081/`,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

export default instance;
