import React, { useState, useEffect } from "react";
import { auth } from "../../Fb";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { authConstants } from "../../actions/constants";
import axiosInstance from "../../helpers/axios";
import { useDispatch } from "react-redux";
import { roles } from "../../actions/constants";
const CompleteRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and Password is Required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password Must be 6 digit long");
    }
    try {
      const res = await auth.signInWithEmailLink(email, window.location.href);
      if (res.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idToken = await user.getIdToken();
        window.localStorage.setItem("authToken", idToken);
        await axiosInstance
          .post("/create-update-user")
          .then((res) => {
            dispatch({
              type: authConstants.LOGIN,
              payload: {
                email: res.data.user.email,
                name: res.data.user.name,
                token: idToken,
                role: res.data.user.role,
              },
            });
            toast.success("Registration Completed");
            history.push("/");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register With Us </h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-group">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-control"
                disabled
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="form-group">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoFocus
                value={password}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-raised" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteRegister;
