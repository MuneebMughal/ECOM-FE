import React, { useState} from "react";
import { login } from "../../actions/auth/auth";
import { useSelector, useDispatch } from "react-redux";
import { Oval } from "react-loader-spinner";
import { authConstants } from "../../actions/constants";
import { Redirect } from "react-router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await login({ email, password })
      .then((res) => {
        setLoading(false);
        localStorage.setItem("accessToken", res.data.accessToken);
        dispatch({
          type: authConstants.LOGIN,
          payload: {
            email: res.data.user.email,
            name: res.data.user.name,
            role: res.data.user.role,
            imageUrl: res.data.user.image,
          },
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.Error);
      });
  };
  if (user.isLoggedIn) {
   return <Redirect to="/" />;
  }
  return (
    <div className="w-screen h-screen login-bg">
      <div className="flex justify-center items-center h-full">
        <div className="md:w-[400px] md:h-[450px] h-[330px] w-[300px] bg-mysecondary rounded-lg shadow-lg relative">
          <form onSubmit={handleSubmit}>
            <div className="text-center font-bold md:p-3 p-2 text-myprimary md:text-[30px] text-[20px] font-roboto">
              Log In
            </div>
            <div className="flex flex-col md:!mx-10 md:!my-6 !mx-5 !my-3">
              <label className="block text-myprimary md:text-sm text-xs font-bold mb-2">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-myprimary md:leading-tight leading-4 md:text-base text-xs focus:outline-none focus:shadow-outline"
                type="email"
                required
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:!mx-10 md:!my-6 !mx-5 !my-3">
              <label className="block text-myprimary text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-myprimary md:leading-tight leading-4 md:text-base text-xs focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>
            {error ? (
              <div className="flex flex-col md:!mx-10 md:!my-6 !mx-5 !my-3">
                <label className="block text-red-500 text-sm mb-2">
                  {error}
                </label>
              </div>
            ) : (
              ""
            )}
            <div className="md:!mx-10 md:!my-6 !mx-5 !my-8 flex items-center justify-between">
              <button
                className="bg-myprimary hover:bg-mysecondary text-white hover:!text-myprimary md:text-base text-sm font-bold md:py-2 py-1 md:px-4 px-2 rounded focus:outline-none focus:shadow-outline border hover:!border-myprimary !border-myprimary"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold md:text-sm text-xs text-myprimary hover:text-myprimary hover:scale-105 transition-all duration-75 w-max"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          {loading ? (
            <div className="absolute top-0 left-0 h-full w-full">
              <div className="flex justify-center items-center h-full w-full">
                <Oval
                  color="#1e293b"
                  height={60}
                  width={60}
                  secondaryColor="#1e293b"
                  strokeWidth={4}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
