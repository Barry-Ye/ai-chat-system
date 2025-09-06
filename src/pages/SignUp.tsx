import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-serif">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Sign Up
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <Button
            variant="contained"
            type="submit"
            startIcon={<LoginIcon />}
            className="!bg-gray-900 text-white py-3 rounded hover:!bg-gray-800 transition"
          >
            Sign Up
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="underline hover:text-gray-900">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
