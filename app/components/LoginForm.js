"use client";

import React, { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

const LoginForm = () => {
  const { signIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      window.location.href = "/pages/homepage";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSignIn}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
