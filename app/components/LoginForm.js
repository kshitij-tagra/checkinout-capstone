"use client";

import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

const LoginForm = () => {
  const { signIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    try {
      await signIn(email, password);
      window.location.href = "/pages/homepage";
    } catch (error) {
      setError("Incorrect Email or Password.");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="w-full" onSubmit={handleSignIn}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
          id="email"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-2">
          <input type="checkbox" id="show-password" checked={showPassword} onChange={togglePasswordVisibility} />
          <label htmlFor="show-password" className="ml-2 text-sm text-gray-600">Show Password</label>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="flex items-center justify-end mb-6">
        <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">Forgot Password?</a>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;