import React, { useState, useEffect } from "react";
import SideNav from "../../../components/Nav/SideNav";
import Form from "../../../components/form/Form";
import FormField from "../../../components/form/FormField";
import { getSubs, uploadAllImages, removeAllImages, validate } from "./Helper";
import { addProduct } from "../../../actions/product/product";
import { toast } from "react-toastify";
import Select from "react-select";
import Fileuploader from "../../../components/fileuploader/Fileuploader";
import {
  InitialProduct,
  InitialProductErrors,
  fieldName,
} from "../../../actions/constants";
import { useCategory } from "../../../customhooks/useCategory";
import Modal from "../../../components/Modal/Modal";
import CardButton from "../../../components/cardbutton/CardButton";
const Product = () => {
  const [product, setProduct] = useState({ ...InitialProduct });
  const [categories, setCategories] = useState([]);
  const [sub, setSubs] = useState([]);
  const [errors, setErrors] = useState({ ...InitialProductErrors });
  const [subLoad, setSubLoad] = useState(false);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useCategory(setCategories, true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "number") {
      if (value < 0) {
        return;
      }
    }
    setProduct({ ...product, [name]: value });
  };
  const handleCategoryChange = async (cat) => {
    setSubLoad(false);
    getSubs(cat.value, product, setProduct, setSubs, setSubLoad);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (validate(errors)) {
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
            if (imgs.length > 0) {
              await removeAllImages(imgs);
            }
            toast.error(err.message);
          });
      } else {
        toast.error("Error While Uploading images");
      }
    }
  };
  const handleShow = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <SideNav />
        </div>
        <div className="col-10">
          <div className="row">
            <div className="col-4">
              <CardButton handleClick={handleShow} />
            </div>
            <div className="col-4">
              <CardButton />
            </div>
            <div className="col-4">
              <CardButton />
            </div>
          </div>

          <Modal show={showModal} setShowModal={handleShow}>
            <Form title="Add Product" onSubmit={handleClick}>
              <FormField
                field={fieldName.input}
                type="text"
                label="Title"
                name="title"
                value={product.title}
                handleChange={handleChange}
                errors={errors}
                setErrors={setErrors}
                required={true}
              />
              <FormField
                label="Description"
                name="description"
                type="text"
                value={product.description}
                handleChange={handleChange}
                errors={errors}
                setErrors={setErrors}
                field="textarea"
                rows="5"
                required={true}
                minlength={10}
              />
              <FormField
                field="input"
                label="Price"
                name="price"
                type="number"
                value={product.price}
                handleChange={handleChange}
                errors={errors}
                setErrors={setErrors}
                required={true}
              />
              <FormField
                field="input"
                label="Quantity"
                name="quantity"
                type="number"
                value={product.quantity}
                handleChange={handleChange}
                errors={errors}
                setErrors={setErrors}
                required={true}
              />
              <FormField
                label="Shipping"
                name="shipping"
                value={product.shipping}
                handleChange={handleChange}
                errors={errors}
                setErrors={setErrors}
                field="select"
                options={[
                  { _id: "Yes", name: "Yes" },
                  { _id: "No", name: "No" },
                ]}
              />
              <FormField
                field="input"
                label="Brand"
                name="brand"
                value={product.brand}
                handleChange={handleChange}
                errors={errors}
                setErrors={setErrors}
              />
              <FormField
                field="input"
                label="Color"
                name="color"
                value={product.color}
                handleChange={handleChange}
                errors={errors}
                setErrors={setErrors}
              />

              <div className="form-group">
                <label className="formlabel">Category</label>
                <Select
                  isSearchable={false}
                  isMulti={false}
                  onChange={(cat) => {
                    handleCategoryChange(cat);
                  }}
                  defaultValue={product.category ? product.category : ""}
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
                style={{ marginBottom: "1rem", marginTop: "3rem" }}
                type="submit"
              >
                Add
              </button>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Product;
