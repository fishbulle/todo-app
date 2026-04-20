import axios from "axios";

//const URL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: '/api',
});

export default api;