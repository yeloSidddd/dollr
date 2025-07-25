import { NavLink } from 'react-router-dom'
import lImage from '../Resources/Login.png'

export default function Signup() {
  return (
    <div className="flex flex-wrap gap-5 p-5 min-h-screen box-border">
      {/* Left Column */}
      <div className="flex-1 min-w-[280px] bg-white rounded-lg p-5 flex justify-center items-center">
        <img
          src={lImage}
          alt="Login Visual"
          className="max-w-full max-h-[700px] object-contain"
        />
      </div>

      {/* Right Column */}
      <div className="flex-1 min-w-[280px] bg-white rounded-lg p-5 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Create an Account
        </h2>

        <form className="flex flex-col gap-5 w-full max-w-md mx-auto">
          {/* Full Name */}
          <div>
            <label htmlFor="fullname" className="block font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500"
            />
          </div>

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
          <div>
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-password" className="block font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="w-full mb-8 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Continue Button */}
          <NavLink to="/">
            <button
              type="submit"
              className="w-full bg-[#3AC249] text-white font-bold py-3 rounded-full hover:bg-[#33b040] transition-colors"
            >
              Continue
            </button>
          </NavLink>
        </form>

        {/* Login Link */}
        <p className="mt-10 text-center font-semibold">
          Already have an account?{' '}
          <NavLink to="/" className="text-[#3AC249]">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  )
}
