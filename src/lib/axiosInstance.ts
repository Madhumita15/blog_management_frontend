import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    const secretKey = getCookie("secretKey")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if(secretKey){
        config.headers["x-secret-key"] = secretKey
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const forceLogout = () => {
  deleteCookie("accessToken");
  deleteCookie("user");
  deleteCookie("role");
  deleteCookie("refreshToken")
  deleteCookie("secretKey")
  window.location.href = "/login";
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401  &&
      !originalRequest._retry
    ) {
      console.log("error in interceptor", error.response);
      originalRequest._retry = true;
      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        // console.log("token avaliable...");
        // const formdata = new FormData();
        // formdata.append("refreshToken", refreshToken);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token`,
            {refreshToken}
          );
          console.log("refresh token response", response);
          const newaccessToken = response?.data?.accessToken;
          setCookie("accessToken", newaccessToken);
          originalRequest.headers.Authorization = `Bearer ${newaccessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.log("error", error);
          forceLogout();
          return Promise.reject(error)
        }
      } else {
        forceLogout();
         return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
);
