import { default as axios } from "axios";

export const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ?
    'http://localhost:8888/' :
    "https://http-nodejs-production-66a0.up.railway.app/"

})