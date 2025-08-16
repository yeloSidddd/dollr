import { NavLink, useNavigate } from "react-router-dom"; // Make sure this is 'react-router-dom'
import lImage from "../Resources/Login.png";
import GreenCheckbox from "../Components/Checkbox";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      console.log("Response Text:", res.data);
      if (res.data === "success") {
        await fetchName();
        nav("/main/dashboard");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const fetchName = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/me", {
        withCredentials: true,
      });
      setName(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("Not logged in or error:", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-5 gap-5">
      {/* Left Column */}
      <div className="hidden md:flex flex-1 min-w-[280px] bg-white rounded-lg p-5 justify-center items-center">
        <img
          src={lImage}
          alt="Login Visual"
          className="max-w-full max-h-[700px] object-contain"
        />
      </div>

      {/* Right Column */}
      <div className="flex-1 bg-white rounded-lg p-5 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Hello,
          <br />
          Welcome Back
        </h2>

        <form className="flex flex-col gap-5 w-full max-w-md mx-auto">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <GreenCheckbox />
          {/* Signin Button */}

          <button
            type="button"
            className="w-full bg-[#3AC249] text-white font-bold py-3 rounded-full hover:bg-[#33b040] transition-colors"
            onClick={handleLogin}
          >
            Signin
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-10 text-center font-semibold">
          Don&apos;t have an account?{" "}
          <NavLink to="/Signup" className="text-[#3AC249]">
            Signup
          </NavLink>
        </p>
      </div>
    </div>
  );
}
