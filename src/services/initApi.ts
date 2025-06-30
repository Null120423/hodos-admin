import { addToast } from "@heroui/react";
import axios from "axios";
import Cookies from "js-cookie";

import { logOut } from "@/lib/auth-event-emitter";

const initApi = (url?: string, headers = {}) => {
  if (url == null) throw new Error("URL is required");
  const api = axios.create({
    baseURL: url,
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      ...headers,
    },
  });

  api.interceptors.request.use(async (config) => {
    try {
      const token = Cookies.get("token") || null;

      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("AsyncStorage error:", error);
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("\x1b[31m", error.config?.headers?.Authorization);
      console.log(
        "\x1b[31m",
        "ERROR REQUEST URL:",
        error.config?.baseURL + "/" + error.config.url,
      );
      console.log("\x1b[31m", "ERROR REQUEST BODY:", error.config.data);
      console.log("=====>", error?.response?.data);
      console.log(error?.response?.data?.httpCode);
      let message = "";

      switch (error?.response?.data?.statusCode) {
        case 401: {
          message = "Your login session has expired, please log in again!";
          Cookies.remove("user");
          Cookies.remove("token");
          logOut(); // Notify all listeners (e.g., AuthContext) to handle logout
          break;
        }
        case 500: {
          message =
            "We are currently undergoing maintenance to upgrade our system. Please try again in a few minutes!";
          break;
        }
        default: {
          message =
            error?.response?.data?.errors || error?.response?.data?.message;
        }
      }

      addToast({
        title: "Error!",
        description: message,
        color: "danger",
      });

      return Promise.reject(error);
    },
  );

  return api;
};

export default initApi;
