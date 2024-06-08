import React from "react";

const LoginForm = () => {
  return (
    <form className="w-full">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="userId"
        >
          User ID
        </label>
        <input
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
          id="userId"
          type="text"
          placeholder="Enter your User ID"
        />
      </div>
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
          id="password"
          type="password"
          placeholder="Enter your Password"
        />
      </div>
      <div className="flex items-center justify-end mb-6">
        <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">
          Forgot Password?
        </a>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
