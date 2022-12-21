import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://pie3bot.azurewebsites.net'
});

export default axiosInstance;