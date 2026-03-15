import { authSerVices } from "@/services/auth.services";
import useAuthStore from "@/stores/useAuthStore";
import axios, { AxiosError } from "axios"
import type { InternalAxiosRequestConfig } from "axios";



interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retryCount?: number
}
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})
api.interceptors.request.use(
    (config) => {
        const { accessToken } = useAuthStore.getState()
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use((res) => res, async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig

    if (!originalRequest || !originalRequest.url) {
        return Promise.reject(error)
    }
    if (originalRequest.url.includes("/auth/signin") ||
        originalRequest.url.includes("/auth/signup") ||
        originalRequest.url.includes("/auth/refresh")) {
        return Promise.reject(error)
    }
    originalRequest._retryCount = originalRequest._retryCount || 0
    if (error.response?.status === 401 && originalRequest._retryCount < 4) {
        originalRequest._retryCount += 1
        try {
            const res = await authSerVices.refresh()
            const newToken = res.data.data
            useAuthStore.getState().setAccessToken(newToken)
            console.log(res.data)
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return api(originalRequest);
        } catch (refreshError) {
            useAuthStore.getState().clearState()
            return Promise.reject(refreshError)
        }

    }
    return Promise.reject(error)
})
export default api