import axios from "axios";
import {BASE_URL} from "./apiEndPoints.js";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//List of endpoints to exclude from adding the Authorization header
const excludeEndpoints = ["/login", "/register", "/status", "/activate", "/health"];

// Add a request interceptor
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) => {
        config.url?.includes(endpoint)
    });
    if (!shouldSkipToken) {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

// Add a response interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            window.location.href = "/login";
        } else if (error.response.status === 500) {
            console.error("Server error:", error.response.data);
        }
    } else if (error.code === "ECONNABORTED") {
        console.log("Request timeout. Please try again.");
    }
    return Promise.reject(error);
})