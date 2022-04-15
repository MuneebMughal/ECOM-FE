import axiosInstance from "../../helpers/axios";
export const uploadImage = (image) =>
  axiosInstance.post("/image-upload", { image });
