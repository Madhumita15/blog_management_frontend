import { ENDPOINT } from "@/app/services/helper/endPoint";
import { getErrorMessage } from "@/app/services/helper/global.helper";
import { axiosInstance } from "@/lib/axiosInstance";
import { create } from "zustand";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { AuthStoreType } from "@/typescript/type/auth.type";

export const useAuthStore = create<AuthStoreType>((set) => ({
  loading: false,
  error: null,
  user: getCookie("user") ? JSON.parse(getCookie("user") as string) : null,
  role: (getCookie("role") as string) ?? null,
  secretKey: (getCookie("secretKey") as string) ?? null,
  accessToken: (getCookie("accessToken") as string) ?? null,
  refreshToken: (getCookie("refreshToken") as string) ?? null,
  registerUser: async ({ data }) => {
    console.log("register from user", data);
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `${ENDPOINT.user.signup}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      set({ loading: false, error: null });
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ loading: false, error: message });
      return {
        status: false,
        message: message,
      };
    }
  },
  loginUser: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(`${ENDPOINT.user.login}`, data);
      // console.log("response from loginUser", response);
      if (response.data.status === true) {
        setCookie("user", JSON.stringify(response.data.data), {
          maxAge: 30 * 24 * 60 * 60,
        });
        setCookie("role", response.data.data.role, {
          maxAge: 30 * 24 * 60 * 60,
        });
        setCookie("accessToken", response.data.accessToken, {
          maxAge: 1 * 24 * 60 * 60,
        });
        setCookie("refreshToken", response.data.refreshToken, {
          maxAge: 30 * 24 * 60 * 60,
        });
        if (response.data.secretKey) {
          setCookie("secretKey", response.data.secretKey, {
            maxAge: 30 * 24 * 60 * 60,
          });
        }
        set({
          user: response.data.data,
          role: response.data.data.role,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          loading: false,
          error: null,
        });
        if (response.data.secretKey) {
          set({ secretKey: response.data.secretKey });
        }
      }
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ loading: false, error: message });
      return {
        status: false,
        message: message,
      };
    }
  },
  verifyUserEmail: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `${ENDPOINT.user.emailVerify}`,
        data,
      );
      set({ loading: false, error: null });
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ loading: false, error: message });
      return {
        status: false,
        message: message,
      };
    }
  },

  forgotUserPasswordLink: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `${ENDPOINT.user.forgotpasswordlink}`,
        data,
      );
      set({ loading: false, error: null });
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ loading: false, error: message });
      return {
        status: false,
        message: message,
      };
    }
  },

  forgotPassword: async ({ data, id, token }) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `${ENDPOINT.user.forgotPassword}/${id}/${token}`,
        data,
      );
      set({ loading: false, error: null });
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ loading: false, error: message });
      return {
        status: false,
        message: message,
      };
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(`${ENDPOINT.user.logout}`);
      deleteCookie("user");
      deleteCookie("role");
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("secretKey");
      set({
        loading: false,
        error: null,
        user: null,
        role: null,
        accessToken: null,
        refreshToken: null,
        secretKey: null,
      });
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ loading: false, error: message });
      return {
        status: false,
        message: message,
      };
    }
  },
}));
