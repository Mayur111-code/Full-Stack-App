import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/auth/user/register",
        {
          fullName: firstName + " " + lastName,
          email,
          password
        },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/"); // Redirect to home after registration
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Create your account</h1>
          <p className="text-gray-500">Join to explore and enjoy delicious meals.</p>
        </header>

        <nav className="text-sm text-gray-500 text-center mb-4">
          <strong className="font-semibold">Switch:</strong>{" "}
          <Link to="/user/register" className="text-pink-500 hover:underline">User</Link>{" "}
          •{" "}
          <Link to="/food-partner/register" className="text-pink-500 hover:underline">Food partner</Link>
        </nav>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">First Name</label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Jane"
                autoComplete="given-name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                autoComplete="family-name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/user/login" className="text-pink-500 hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
