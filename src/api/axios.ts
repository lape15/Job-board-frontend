import { removeFromStorage, getCredentials } from "@/utils/helper";
import axios from "axios";

const url = process.env.API_END_POINT;
const credentials = getCredentials();

axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

axios.defaults.headers.common["Authorization"] = `Bearer ${credentials?.token}`;

const axiosInstance = axios.create({
  baseURL: url,
});

const call = {
  async get(params: string) {
    return await axiosInstance.get(`${url}${params}`);
  },
  async post(params: string, data: any) {
    return await axiosInstance.post(url + params, data);
  },
  async patch(params: string, body: any) {
    return await axiosInstance.patch(url + params, body);
  },
  async delete(params: string) {
    return await axiosInstance.delete(url + params);
  },
  async postImage(formData: FormData) {
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    return await axios.post(`${url}upload`, formData);
  },
};

axiosInstance.interceptors.request.use(
  (config) => {
    return { ...config, "content-type": "multipart/form-data" };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error", error);
    if (error.response?.status === 401) {
      removeFromStorage();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export { call };
