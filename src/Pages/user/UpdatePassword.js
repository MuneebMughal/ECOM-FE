import React, { useState } from "react";
import SideNav from "../../components/Nav/SideNav";
import {auth} from "../../Fb";
import { toast } from "react-toastify";
const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        toast.success("Password Updated Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setPassword("");
    setLoading(false);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <SideNav />
        </div>
        <div className="col-10">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  {loading ? (
                    <h4 className="text-danger">Loading.....</h4>
                  ) : (
                    <h4>Update Password</h4>
                  )}
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  disabled={loading}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading || password.length < 6 || !password}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
