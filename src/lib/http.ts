import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

declare module "axios" {
  export interface AxiosInstance {
    $get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  }
}

const token = localStorage.getItem("token");

const $http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : null,
  },
});

$http.$get = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await $http.get<T>(url, config);
  return response.data;
};

$http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

const setBearerToken = (token: string) => {
  localStorage.setItem("token", token);
  $http.defaults.headers.Authorization = `Bearer ${token}`;
};

export { $http, setBearerToken };
