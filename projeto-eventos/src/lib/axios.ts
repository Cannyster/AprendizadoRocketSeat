import axios from "axios";

//arquivo de configurações do axios
export const api = axios.create({
  baseURL: "http://localhost:3334",
});


// Ativar esta configuração abaixo coloca delay conforme definido, em todas as requisições que passarem pelo axios
// api.interceptors.request.use(async (config) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 segundo de delay
//   return config;
// });