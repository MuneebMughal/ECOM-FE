import axiosInstance from "../../helpers/axios";
export const uploadImage = (image) =>
  axiosInstance.post("/image-upload", { image });
export const removeImage = (id) => axiosInstance.delete(`/image-remove/${id}`);
