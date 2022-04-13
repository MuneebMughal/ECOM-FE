import axiosInstance from "../../helpers/axios";
export const addProduct = (product) =>
  axiosInstance.post("/product", product);