import React, { useState} from "react";
import SideNav from "../../../components/Nav/SideNav";
import Form from "../../../components/form/Form";
import FormField from "../../../components/form/FormField";
import {
  getAllSubs,
} from "../../../actions/category/category";
import { addProduct } from "../../../actions/product/product";
import { toast } from "react-toastify";
import Select from "react-select";
import "../../../components/form/form.css";
import Fileuploader from "../../../components/fileuploader/Fileuploader";
import { uploadImage } from "../../../actions/fileupload/Fileupload";
import {
  InitialProduct,
  InitialProductErrors,
} from "../../../actions/constants";
import useCategory from "../../../customhooks/useCategory";
const Product = () => {
  const [product, setProduct] = useState({ ...InitialProduct });
  const [categories, setCategories] = useState([]);
  const [sub, setSubs] = useState([]);
  const [errors, setErrors] = useState({ ...InitialProductErrors });
  const [subLoad, setSubLoad] = useState(false);
  const [images, setImages] = useState([]);
  useCategory(setCategories,true);
  const getSubs = (sub) => {
    getAllSubs(sub)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.subs && res.data.subs.length > 0) {
            let _subcategories = [];
            res.data.subs.map((cat) => {
              let c = {};
              c.label = cat.name;
              c.value = cat._id;
              _subcategories.push(c);
              return null;
            });
            setProduct({ ...product, category: sub });
            setSubs(_subcategories);
            setSubLoad(true);
          } else {
            setSubs([]);
            setProduct({ ...product, subcategory: [], category: sub });
          }
        }
      })
      .catch((err) => toast.error(err.message));
  };
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
    getSubs(cat.value);
  };
  const uploadAllImages = async () => {
    let uploadedImgs = [];
    for (let i = 0; i < images.length; i++) {
      await uploadImage(images[i])
        .then((res) => uploadedImgs.push(res.data))
        .catch((err) => toast.error("Something Went Wrong"));
    }
    return uploadedImgs;
  };
  const handleClick = async (e) => {
    e.preventDefault();

    if (validate()) {
      let imgs = [];
      if (images.length > 0) {
        imgs = await uploadAllImages();
      }
      addProduct({ ...product, images: imgs })
        .then((res) => {
          if (res && res.status === 200) {
            toast.success("Product added Successfully.");
          }
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <SideNav />
        </div>
        <div className="col-9">
          <Form title="Add Product">
            <FormField
              label="Title"
              name="title"
              value={product.title}
              handleChange={handleChange}
              error={errors.title}
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
              onClick={handleClick}
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
