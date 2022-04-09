import axiosInstance from "../../helpers/axios";
export const getAllCategories = () => axiosInstance.get("/category-list");
export const addNewCategory = (name) =>
  axiosInstance.post("/add-category", { name });
export const deleteCategory = (slug) =>
  axiosInstance.delete(`/category/${slug}`);
export const updateCategory = (slug, name) =>
  axiosInstance.post(`/category/${slug}`, { name });
