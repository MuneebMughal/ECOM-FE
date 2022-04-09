import axiosInstance from "../../helpers/axios";
export const getAllSubCategories = () => axiosInstance.get("/subcategory-list");
export const addNewSubCategory = (name, parent) =>
  axiosInstance.post("/add-subcategory", { name, parent });
export const deleteSubCategory = (slug) =>
  axiosInstance.delete(`/subcategory/${slug}`);
export const updateSubCategory = (slug, name, parent) =>
  axiosInstance.post(`/subcategory/${slug}`, { name, parent });
