import React, { useState } from "react";
import SideNav from "../../../components/Nav/SideNav";
import Form from "../../../components/form/Form";
import FormField from "../../../components/form/FormField";
import { getSubs, uploadAllImages, removeAllImages } from "./Helper";
import { addProduct } from "../../../actions/product/product";
import { toast } from "react-toastify";
import Select from "react-select";
import "../../../components/form/form.css";
import Fileuploader from "../../../components/fileuploader/Fileuploader";

import {
  InitialProduct,
  InitialProductErrors,
} from "../../../actions/constants";
import { useCategory } from "../../../customhooks/useCategory";
const Product = () => {
  const [product, setProduct] = useState({ ...InitialProduct });
  const [categories, setCategories] = useState([]);
  const [sub, setSubs] = useState([]);
  const [errors, setErrors] = useState({ ...InitialProductErrors });
  const [subLoad, setSubLoad] = useState(false);
  const [images, setImages] = useState([]);
  useCategory(setCategories, true);
  const validate = () => {
    let error = { ...InitialProductErrors };
    Object.keys(product).forEach((key) => {
      if (product[key] === "") {
        error[key] = `${key[0].toUpperCase() + key.slice(1)} is required.`;
      } else {
        error[key] = "";
      }
    });
    let valid = true;
    Object.keys(error).forEach((key) => {
      if (error[key] !== "") {
        setErrors({ ...error });
        valid = false;
      }
    });
    if (valid) {
      setErrors({ ...InitialProductErrors });
    }
    return valid;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleCategoryChange = async (cat) => {
    setSubLoad(false);
    getSubs(cat.value, product, setProduct, setSubs, setSubLoad);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (validate()) {
      let imgs = [];
      if (images.length > 0) {
        imgs = await uploadAllImages(images);
      }
      if (imgs.length === images.length) {
        addProduct({ ...product, images: imgs })
          .then((res) => {
            if (res && res.status === 200) {
              toast.success("Product added Successfully.");
            }
          })
          .catch(async (err) => {
            await removeAllImages(imgs);
            toast.error(err.message);
          });
      } else {
        toast.error("Error While Uploading images");
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <SideNav />
        </div>
        <div className="col-9">
          <Form title="Add Product" onSubmit={handleClick}>
            <FormField
              label="Title"
              name="title"
              value={product.title}
              handleChange={handleChange}
              error={errors.title}
              required
            />
            <FormField
              label="Description"
              name="description"
              value={product.description}
              handleChange={handleChange}
              error={errors.description}
              field="textarea"
            />
            <FormField
              label="Price"
              name="price"
              value={product.price}
              handleChange={handleChange}
              error={errors.price}
            />
            <FormField
              label="Quantity"
              name="quantity"
              value={product.quantity}
              handleChange={handleChange}
              error={errors.quantity}
            />
            <FormField
              label="Shipping"
              name="shipping"
              value={product.shipping}
              handleChange={handleChange}
              error={errors.shipping}
              field="select"
              options={[
                { _id: "Yes", name: "Yes" },
                { _id: "No", name: "No" },
              ]}
            />
            <FormField
              label="Brand"
              name="brand"
              value={product.brand}
              handleChange={handleChange}
              error={errors.brand}
            />
            <FormField
              label="Color"
              name="color"
              value={product.color}
              handleChange={handleChange}
              error={errors.color}
            />

            <div className="form-group">
              <label className="formlabel">Category</label>
              <Select
                isSearchable={false}
                isMulti={false}
                onChange={(cat) => {
                  handleCategoryChange(cat);
                }}
                defaultValue={product.category}
                options={categories}
              />
              {errors.category ? (
                <small className="error">{errors.category}</small>
              ) : (
                ""
              )}
            </div>
            {subLoad ? (
              <div className="form-group">
                <label className="formlabel">Sub Category</label>
                <Select
                  isSearchable
                  isMulti
                  onChange={(cat) => {
                    setProduct({ ...product, subcategory: [...cat] });
                  }}
                  options={sub}
                />
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <label className="formlabel">Add Images</label>
              <Fileuploader images={images} setImages={setImages} />
            </div>
            <button
              className="btn btn-primary"
              style={{ marginBottom: "10rem", marginTop: "3rem" }}
              type="submit"
            >
              Add
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Product;
