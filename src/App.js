import "./App.css";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import CompleteRegister from "./Pages/auth/CompleteReg";
import Home from "./Pages/Home";
import Header from "./components/Nav/Header";
import { Switch, Route, Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth } from "./Fb";
import { authConstants, roles } from "./actions/constants";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import axiosInstance from "./helpers/axios";
import ErrorPage from "./Pages/ErrorPage";
import { useHistory } from "react-router";
import UserPrivateRoutes from "./HOC/user/UserPrivateRoutes";
import PrivateRoutes from './HOC/PrivateRoutes'
import UserDashBoard from "./Pages/user/UserDashBoard";
function App() {
  const user = useSelector((state) => state.user);
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
                // console.log(res);
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
  }, []);
  return loading ? (
    <div>Loading.....</div>
  ) : (
    <>
      <ToastContainer />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoutes exact path="/login" component={Login} />
        <PrivateRoutes exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={CompleteRegister} />
        <Route exact path="/forgot/password">
          {user.isLoggedIn ? <Redirect to="/" /> : <ForgotPassword />}
        </Route>
        <UserPrivateRoutes exact path='/user' component={UserDashBoard} />
        <Route path="/*" component={ErrorPage} />
      </Switch>
    </>
  );
}

export default App;
