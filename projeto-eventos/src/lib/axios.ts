import axios from "axios";

//arquivo de configurações do axios
export const api = axios.create({
  baseURL: "http://localhost:3334",
});
