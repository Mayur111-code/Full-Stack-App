import React from 'react';
import { Link } from 'react-router-dom';

const ChooseRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Register</h1>
          <p className="text-gray-500">Pick how you want to join the platform.</p>
        </header>

        <div className="flex flex-col gap-4">
          <Link
            to="/user/register"
            className="block text-center py-3 px-4 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors"
          >
            Register as normal user
          </Link>

          <Link
            to="/food-partner/register"
            className="block text-center py-3 px-4 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 font-semibold hover:bg-gray-200 transition-colors"
          >
            Register as food partner
          </Link>
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/user/login" className="text-pink-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;
