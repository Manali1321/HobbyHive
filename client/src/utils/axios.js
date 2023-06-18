import { default as axios } from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:8888/',
})