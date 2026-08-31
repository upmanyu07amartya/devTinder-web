import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
      console.error(err.response);
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        email,
        password,
      },{withCredentials:true});

      toast.success(res?.data?.message || "Account created successfully");

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create account");
    }
  };

  return (
    <div className="flex justify-center bg-base-400 m-10 p-4">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">
          {isSignup ? "SignUp" : "Login"}
        </legend>
        {isSignup && (
          <>
            <label className="label">First Name</label>

            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>

            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500">{error}</p>
        <button
          className="btn btn-neutral mt-4"
          onClick={isSignup ? handleSignup : handleLogin}
        >
          {isSignup ? "Create Account" : "Login"}
        </button>
        <div className="text-center mt-4">
          {isSignup ? (
            <p>
              Already have an account?{" "}
              <button
                className="link link-primary"
                onClick={() => {
                  setIsSignup(false);
                  setError("");
                }}
              >
                Login
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button
                className="link link-primary"
                onClick={() => {
                  setIsSignup(true);
                  setError("");
                }}
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
