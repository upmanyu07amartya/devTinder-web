import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  // Required signup fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Optional signup fields
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [skills, setSkills] = useState("");

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ================= LOGIN =================

  const handleLogin = async () => {
    try {
      setError("");

      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.response?.data || "Login failed",
      );

      console.error(err?.response?.data);
    }
  };

  // ================= SIGNUP =================

  const handleSignup = async () => {
    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    try {
      setError("");

      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,

          // Optional fields
          age: age || undefined,
          gender: gender || undefined,
          description,
          profileImageUrl: profileImage,
          skills: skillsArray,
        },
        {
          withCredentials: true,
        },
      );

      toast.success(res?.data?.message || "Account created successfully");

      // Signup also logs the user in
      dispatch(addUser(res.data));

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Unable to create account",
      );

      console.error(err?.response?.data);
    }
  };

  // ================= SWITCH =================

  const switchToSignup = () => {
    setIsSignup(true);
    setError("");
  };

  const switchToLogin = () => {
    setIsSignup(false);
    setError("");
    setPassword("");
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-base-200 flex justify-center items-start pb-32 py-8">
      <fieldset
        className={`fieldset bg-base-100 border-base-300 rounded-2xl shadow-xl w-full border p-6 ${
          isSignup ? "max-w-3xl" : "max-w-md"
        }`}
      >
        {/* Heading */}
        <legend className="fieldset-legend text-xl font-semibold px-2">
          {isSignup ? "Create Account" : "Login"}
        </legend>

        {/* ================= LOGIN ================= */}

        {!isSignup && (
          <>
            {/* Email */}
            <label className="label">Email</label>

            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <label className="label">Password</label>

            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {/* ================= SIGNUP ================= */}

        {isSignup && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {/* First Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            {/* Last Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            {/* Email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>

              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>

              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            {/* Age */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Age <span className="text-base-content/50">(Optional)</span>
              </legend>

              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>

            {/* Gender */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Gender <span className="text-base-content/50">(Optional)</span>
              </legend>

              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>
              </select>
            </fieldset>

            {/* Skills */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Skills <span className="text-base-content/50">(Optional)</span>
              </legend>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="React, Node, MongoDB"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <p className="label">Separate skills with commas</p>
            </fieldset>

            {/* Profile Image */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Profile Image URL{" "}
                <span className="text-base-content/50">(Optional)</span>
              </legend>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="https://..."
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              />
            </fieldset>

            {/* About */}
            <fieldset className="fieldset md:col-span-2">
              <legend className="fieldset-legend">
                About <span className="text-base-content/50">(Optional)</span>
              </legend>

              <textarea
                className="textarea textarea-bordered w-full h-20"
                placeholder="Tell us something about yourself..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </fieldset>
          </div>
        )}

        {/* ================= ERROR ================= */}

        {error && <p className="text-error text-sm mt-3">{error}</p>}

        {/* ================= SUBMIT ================= */}

        <button
          className="btn btn-neutral mt-5"
          onClick={isSignup ? handleSignup : handleLogin}
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

        {/* ================= SWITCH ================= */}

        <div className="text-center mt-4">
          {isSignup ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="link link-primary"
                onClick={switchToLogin}
              >
                Login
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                className="link link-primary"
                onClick={switchToSignup}
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
