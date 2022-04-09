import React, { useState } from "react";
import { auth, googleAuthProvider } from "../../Fb";
import { toast } from "react-toastify";
import { Button } from "antd/lib/";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      const { user } = res;
      if (user) {
        const token = await user.getIdToken();
        window.localStorage.setItem("authToken", token);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (res) => {
        const { user } = res;
        const token = await user.getIdToken();
        window.localStorage.setItem("authToken", token);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Sign In </h4>
          <form>
            <div className="form-group">
              <label className="form-group">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                autoFocus
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
                value={password}
              />
            </div>
            <br></br>
            <Button
              type="primary"
              onClick={handleSubmit}
              shape="round"
              block
              className="mb-3"
              disabled={!email || password.length < 6}
              icon={<MailOutlined />}
            >
              Login with email and password
            </Button>
            <Button
              type="danger"
              onClick={googleLogin}
              shape="round"
              block
              className="mb-3"
              icon={<GoogleOutlined />}
            >
              Login with Google
            </Button>
            <Link to="/forgot/password" className="float-end text-danger">
              Forgot Password
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
