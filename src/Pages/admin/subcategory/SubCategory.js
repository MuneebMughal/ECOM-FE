import React, { useState, useEffect } from "react";
import { getAllCategories } from "../../../actions/category/category";
import {
  getAllSubCategories,
  addNewSubCategory,
  deleteSubCategory,
  updateSubCategory,
} from "../../../actions/subcategory/subcategory";
import SideNav from "../../../components/Nav/SideNav";
import { toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import moment from "moment";
import "./category.css";
const SubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcat, setSubcat] = useState([]);
  const [name, setName] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateObj, setUpdateObj] = useState({});
  const [parent, setParent] = useState("");
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    await getAllCategories()
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.categories && res.data.categories.length > 0) {
            setCategories(res.data.categories);
          }
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
    await getAllSubCategories()
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.subcategories && res.data.subcategories.length > 0) {
            setSubcat(res.data.subcategories);
          }
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    await addNewSubCategory(name, parent)
      .then(() => {
        setName("");
        setParent("");
        toast.success(`${name} added successfully`);
        fetchdata();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleDelete = async (cat) => {
    let res = window.confirm(`Do you really want to delete ${cat.name}`);
    if (res) {
      await deleteSubCategory(cat.slug)
        .then(() => {
          toast.success(`${cat.name} deleted successfully`);
          fetchdata();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  const handleEdit = (cat) => {
    if (cat !== updateObj) {
      setUpdate(true);
      setUpdateObj(cat);
      setName(cat.name);
      setParent(cat.parent);
    } else {
      setUpdate(false);
      setUpdateObj({});
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateSubCategory(updateObj.slug, name, parent)
      .then(() => {
        toast.success(`${updateObj.name} updated successfully`);
        setUpdateObj({});
        setName("");
        setUpdate(false);
        setParent("");
        fetchdata();
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const renderAddCategory = () => {
    return (
      <>
        <h2 style={{ padding: "1rem" }} className="text-center">
          Add New Sub Category
        </h2>
        <div>
          <form>
            <div className="form-group">
              <label className="form-group" style={{ fontWeight: "500" }}>
                Sub-Category Name
              </label>
              <input
                type="text"
                placeholder="Enter Sub-Category Name"
                className="form-control"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-group" style={{ fontWeight: "500" }}>
                Select Parent Category
              </label>
              <select
                className="form-control"
                onChange={(e) => {
                  setParent(e.target.value);
                }}
                value={parent}
              >
                <option value="">Please Select </option>
                {categories
                  ? categories.map((cat, index) => {
                      return (
                        <option key={index} value={cat._id}>
                          {cat.name}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </div>
            <br></br>
            <button
              className="btn btn-primary"
              disabled={name.length < 2 || !parent}
              onClick={handleClick}
            >
              Add Sub-Category
            </button>
          </form>
        </div>
      </>
    );
  };
  const renderUpdateCategory = () => {
    return (
      <>
        <h2 style={{ padding: "1rem" }} className="text-center">
          Update Sub-Category
        </h2>
        <div>
          <form>
            <div className="form-group">
              <label className="form-group" style={{ fontWeight: "500" }}>
                Select Parent Category
              </label>
              <select
                className="form-control"
                onChange={(e) => {
                  setParent(e.target.value);
                }}
                value={parent}
              >
                <option value="">Please Select </option>
                {categories
                  ? categories.map((cat, index) => {
                      return (
                        <option key={index} value={cat._id}>
                          {cat.name}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </div>
            <div className="form-group">
              <label className="form-group" style={{ fontWeight: "500" }}>
                Sub-Category Name
              </label>
              <input
                type="text"
                className="form-control"
                value={updateObj.name}
                disabled
              />
            </div>
            <div className="form-group">
              <label className="form-group" style={{ fontWeight: "500" }}>
                Update Sub-Category Name
              </label>
              <input
                type="text"
                placeholder="Enter Sub-Category New Name"
                className="form-control"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <br></br>
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update Sub-Category
            </button>
            <button
              className="btn btn-danger"
              style={{ marginLeft: "2rem" }}
              onClick={() => {
                setUpdate(false);
                setName("");
                setUpdateObj({});
                setParent("");
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <SideNav />
        </div>
        <div className="col-10">
          {update ? renderUpdateCategory() : renderAddCategory()}
          <h2 style={{ padding: "1rem" }} className="text-center">
            Sub Categories
          </h2>
          <div className="table-responsive">
            <table className="table table-responsive \">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Parent</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Updates At</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {subcat &&
                  subcat.map((cat, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{cat.name ? cat.name : "–"}</td>
                        <td>{cat.parent.name ? cat.parent.name : "–"}</td>
                        <td>{cat.slug ? cat.slug : "–"}</td>
                        <td>
                          {cat.createdAt
                            ? moment(new Date(cat.createdAt)).format(
                                "DD/MM/YYYY"
                              )
                            : "–"}
                        </td>
                        <td>
                          {cat.updatedAt
                            ? moment(new Date(cat.updatedAt)).format(
                                "DD/MM/YYYY"
                              )
                            : "–"}
                        </td>
                        <td>{cat.createdBy ? cat.createdBy : "–"}</td>
                        <td>
                          <div
                            className="table_action table_action_del"
                            onClick={() => handleDelete(cat)}
                          >
                            <RiDeleteBinLine />
                          </div>
                        </td>
                        <td>
                          <div
                            className="table_action table_action_edit"
                            onClick={() => handleEdit(cat)}
                          >
                            <AiFillEdit />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
