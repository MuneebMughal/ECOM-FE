import { getAllSubs } from "../../../actions/category/category";
import { uploadImage,removeImage } from "../../../actions/fileupload/Fileupload";
import { toast } from "react-toastify";
export const getSubs = (sub,product,setProduct,setSubs,setSubLoad) => {
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
  export const uploadAllImages = async (images) => {
    let uploadedImgs = [];
    for (let i = 0; i < images.length; i++) {
      await uploadImage(images[i])
        .then((res) => uploadedImgs.push(res.data))
        .catch((err) => toast.error("Something Went Wrong"));
    }
    return uploadedImgs;
  };
  export const removeAllImages = async (images) =>{
    console.log(images);
      for(let i =0 ; i<images.length ; i++)
      {     console.log(images[i].public_id);
            await removeImage(images[i].public_id);
      }
  }