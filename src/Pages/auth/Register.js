import React, { useState } from "react";
import { auth } from "../../Fb";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_BASE_URL;
const Register = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `${url}/register/complete`,
        handleCodeInApp: true,
      };
      await auth.sendSignInLinkToEmail(email, config);
      toast.success(`Register link sent to ${email}.`);
      window.localStorage.setItem("emailForRegistration", email);
      window.localStorage.setItem("registering", true);
      setEmail("");
    } catch (err) {
      toast.error("Something Went Wrong");
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
                placeholder="Enter Email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                autoFocus
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

export default Register;
