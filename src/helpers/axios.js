import axios from "axios";
import store from "../store";
import { authConstants } from "../actions/constants";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";
const url = process.env.REACT_APP_API;
const axiosInstance = axios.create({
  baseURL: url,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("authToken");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    if (error) {
      const { status } = error.response || 0;
      if (status === 500 || error.message === "Network Error") {
        window.localStorage.clear();
        await firebase
          .auth()
          .signOut()
          .then(() => {
            store.dispatch({ type: authConstants.LOGOUT });
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
      return Promise.reject(error);
    }
  }
);
export default axiosInstance;
