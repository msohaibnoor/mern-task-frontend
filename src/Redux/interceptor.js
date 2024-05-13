import axios from "axios";
import { customLogout } from "./features/User/userSlice";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`
});

var storeModule;
var store;

const initializeAxiosInterceptors = async () => {
  if (!storeModule) {
    storeModule = await import("./configureStore");
  }

  store = storeModule.store;

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
      const user = store.getState("user").user?.user;
      if (user && user !== undefined) {
        config.headers["Authorization"] = `Bearer ${user?.tokens?.access?.token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

initializeAxiosInterceptors();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    toast.error(response?.data?.message);

    if (response && response.status === 401) {
      store.dispatch(customLogout());
      toast.error(response?.data?.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
