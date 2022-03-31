import React, {  useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../Fb";

const url = process.env.REACT_APP_BASE_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: `${url}/login`,
      handleCodeInApp: true,
    };
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        toast.success(
          "We have sent you reset password link. Kindly check your email."
        );
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Forgot Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoFocus
              />
            </div>
            <div className="form-group float-end">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={!email}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
