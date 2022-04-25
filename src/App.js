import "./App.css";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import CompleteRegister from "./Pages/auth/CompleteReg";
import Home from "./Pages/Home";
import Header from "./components/Nav/Header";
import { Switch, Route,BrowserRouter as Router } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { auth } from "./Fb";
import { authConstants, roles } from "./actions/constants";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import axiosInstance from "./helpers/axios";
import ErrorPage from "./Pages/ErrorPage";
import { useHistory } from "react-router";
import UserPrivateRoutes from "./HOC/user/UserPrivateRoutes";
import PrivateRoutes from "./HOC/PrivateRoutes";
import UserDashBoard from "./Pages/user/UserDashBoard";
import Wishlist from "./Pages/user/Wishlist";
import UpdatePassword from "./Pages/user/UpdatePassword";
import AdminDashBoard from "./Pages/admin/dashboard/AdminDashBoard";
import AdminPrivateRoutes from "./HOC/admin/AdminPrivateRoutes";
import Category from "./Pages/admin/category/Category";
import SubCategory from "./Pages/admin/subcategory/SubCategory";
import Product from "./Pages/admin/product/Product";
function App() {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const IsRegistering = window.localStorage.getItem("registering");
          if (IsRegistering) {
            window.localStorage.removeItem("registering");
          } else {
            const token = await user.getIdToken();
            window.localStorage.setItem("authToken", token);
            await axiosInstance
              .get("/get-user")
              .then((res) => {
                dispatch({
                  type: authConstants.LOGIN,
                  payload: {
                    email: res.data.user.email,
                    name: res.data.user.name,
                    token,
                    role: res.data.user.role,
                  },
                });
                if (res.data.user.role === roles.ADMIN) {
                  history.push("/admin/dashboard");
                } else if (res.data.user.role === roles.SUBSCRIBER) {
                  history.push("/user");
                } else {
                  history.push("/error");
                }
              })
              .catch((err) => {
                toast.error(err.message);
              });
          }
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      setLoading(false);
      toast.error("Something Went Wrong");
    }
  }, [dispatch, history]);
  return loading ? (
    <div>Loading.....</div>
  ) : (
    <Router>
      <ToastContainer />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoutes exact path="/login" component={Login} />
        <PrivateRoutes exact path="/register" component={Register} />
        <PrivateRoutes exact path="/password" component={UpdatePassword} />
        <Route exact path="/register/complete" component={CompleteRegister} />
        <PrivateRoutes
          exact
          path="/forgot/password"
          component={ForgotPassword}
        />
        <UserPrivateRoutes exact path="/user" component={UserDashBoard} />
        <UserPrivateRoutes exact path="/wishlist" component={Wishlist} />
        <AdminPrivateRoutes
          exact
          path="/admin/dashboard"
          component={AdminDashBoard}
        />
        <AdminPrivateRoutes exact path="/admin/category" component={Category} />
        <AdminPrivateRoutes
          exact
          path="/admin/sub-category"
          component={SubCategory}
        />
        <AdminPrivateRoutes exact path="/admin/product" component={Product} />
        <Route path="/*" component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
