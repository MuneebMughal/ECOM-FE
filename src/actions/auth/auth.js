import axiosInstance from "../../helpers/axios";
export const login = (user) => axiosInstance.post("/login", user);
