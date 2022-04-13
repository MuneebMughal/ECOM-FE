import React, { useState, useEffect } from "react";
import SideNav from "../../../components/Nav/SideNav";
import Form from "../../../components/form/Form";
import FormField from "../../../components/form/FormField";
import {
  getAllCategories,
  getAllSubs,
} from "../../../actions/category/category";
import { addProduct } from "../../../actions/product/product";
import { toast } from "react-toastify";
import Select from "react-select";
import "../../../components/form/form.css";
const InitialProduct = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  shipping: "",
  brand: "",
  color: "",
  category: "",
  subcategory: [],
};
const InitialErrors = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  shipping: "",
  brand: "",
  color: "",
  category: "",
  subcategory: "",
};

const Product = () => {
  const [product, setProduct] = useState({ ...InitialProduct });
  const [categories, setCategories] = useState([]);
  const [sub, setSubs] = useState([]);
  const [errors, setErrors] = useState({ ...InitialErrors });
  const [subLoad, setSubLoad] = useState(false);
  useEffect(() => {
    let unmounted = false;
    getAllCategories()
      .then((res) => {
        if (!unmounted) {
          if (res && res.status === 200) {
            if (res.data.categories && res.data.categories.length > 0) {
              let _categories = [];
              res.data.categories.map((cat) => {
                let c = {};
                c.label = cat.name;
                c.value = cat._id;
                _categories.push(c);
              });
              setCategories(_categories);
            }
          }
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
    return () => {
      unmounted = true;
    };
  }, []);
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
            });
            setSubs(_subcategories);
            setSubLoad(true);
          } else {
            setSubs([]);
            setProduct({ ...product, subcategory: [] });
          }
        }
      })
      .catch((err) => toast.error(err.message));
  };
  const validate = () => {
    let error = { ...InitialErrors };
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
      setErrors({ ...InitialErrors });
    }
    return valid;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleCategoryChange = async (cat) => {
    setSubLoad(false);
    setProduct({ ...product, category: cat.value });
    await getSubs(cat.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (validate()) {
      addProduct(product)
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
                // defaultValue={product.category}
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
