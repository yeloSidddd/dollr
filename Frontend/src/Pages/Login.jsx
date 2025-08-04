import { NavLink } from "react-router-dom"; // Make sure this is 'react-router-dom'
import lImage from "../Resources/Login.png";
import GreenCheckbox from "../Components/Checkbox";

export default function Login() {
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
            />
          </div>

            <GreenCheckbox />
          {/* Signin Button */}
          <NavLink to="/main/dashboard">
            <button
              type="button"
              className="w-full bg-[#3AC249] text-white font-bold py-3 rounded-full hover:bg-[#33b040] transition-colors"
            >
              Signin
            </button>
          </NavLink>
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
