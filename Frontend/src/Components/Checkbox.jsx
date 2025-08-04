import { useState } from 'react';

export default function CustomCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex justify-between items-center w-full">
      {/* Left: Remember Me */}
      <label
        onClick={() => setChecked(!checked)}
        className="flex items-center space-x-2 cursor-pointer select-none"
      >
        <div className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded bg-white">
          {checked && (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3AC249"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className="text-gray-800 text-base sm:text-sm">Remember me</span>
      </label>

      {/* Right: Forgot Password */}
      <span className="text-gray-800 text-base sm:text-sm cursor-pointer">
        Forgot Password?
      </span>
    </div>
  );
}
