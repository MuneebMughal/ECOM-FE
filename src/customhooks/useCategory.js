import { useEffect } from "react";
import { getAllCategories } from "../actions/category/category";
import { getAllSubCategories } from "../actions/subcategory/subcategory";
import { toast } from "react-toastify";
export const useCategory = (setCategories, product = false) => {
  useEffect(() => {
    let unmounted = false;
    getAllCategories()
      .then((res) => {
        if (!unmounted) {
          if (res && res.status === 200) {
            if (res.data.categories && res.data.categories.length > 0) {
              if (product) {
                let _categories = [];
                res.data.categories.map((cat) => {
                  let c = {};
                  c.label = cat.name;
                  c.value = cat._id;
                  _categories.push(c);
                  return null;
                });
                setCategories(_categories);
              } else {
                setCategories(res.data.categories);
              }
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
};
export const useSubcategory = (setSubcat) => {
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getAllSubCategories()
        .then((res) => {
          if (!unmounted) {
            if (res && res.status === 200) {
              if (res.data.subcategories && res.data.subcategories.length > 0) {
                setSubcat(res.data.subcategories);
              }
            }
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    return () => {
      unmounted = true;
    };
  }, []);
};
