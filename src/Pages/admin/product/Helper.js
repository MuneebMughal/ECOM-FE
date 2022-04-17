import { getAllSubs } from "../../../actions/category/category";
import {
  uploadImage,
  removeImage,
} from "../../../actions/fileupload/Fileupload";
import { toast } from "react-toastify";
export const getSubs = (category, product, setProduct, setSubs, setSubLoad) => {
  getAllSubs(category)
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
          setProduct({ ...product, category });
          setSubs(_subcategories);
          setSubLoad(true);
        } else {
          setSubs([]);
          setProduct({ ...product, subcategory: [], category });
        }
      }
    })
    .catch((err) => toast.error(err.message));
};
export const uploadAllImages = async (images) => {
  let uploadedImgs = [];
  for (let i = 0; i < images.length; i++) {
    await uploadImage(images[i])
      .then((res) => uploadedImgs.push(res.data))
      .catch((err) => toast.error("Something Went Wrong"));
  }
  return uploadedImgs;
};
export const removeAllImages = async (images) => {
  for (let i = 0; i < images.length; i++) {
    await removeImage(images[i].public_id);
  }
};
export const validate = (errors) => {
  let validate = true;
  Object.keys(errors).forEach((key) => {
    if (errors[key] !== "") {
      validate = false;
    }
  });
  return validate;
};
