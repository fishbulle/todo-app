import axios from "axios";

// TODO: Implement logic with interceptor to set token before each request

const api = axios.create({
    baseURL: '/api',
});

export default api;