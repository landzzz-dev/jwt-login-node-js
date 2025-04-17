import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const $axios = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    withCredentials: true,
});

$axios.interceptors.request.use(async (config) => {
    const auth = useAuthStore();

    if (auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

$axios.interceptors.response.use((response) => response, async (error) => {
        const auth = useAuthStore();
        const originalRequest = error.config;
        const errorCode = [403];
        
        if (errorCode.includes(error.status) && auth.user) {
            try {
                //* Request a new access token using refresh token
                const res = await $axios.post("/auth/token/refresh");

                auth.token = res.data.accessToken;

                //* Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`;
                return $axios(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                auth.accessToken = null;
                sessionStorage.removeItem("access_token");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default $axios;
