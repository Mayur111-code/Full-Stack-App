import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        { name: businessName, contactName, phone, email, password, address },
        { withCredentials: true }
      );

      console.log(response.data);
      navigate("/create-food"); // Redirect after registration
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Partner Sign Up</h1>
          <p className="text-gray-500">Grow your business with our platform.</p>
          <nav className="mt-2 text-sm text-gray-500">
            <strong className="font-medium">Switch:</strong>{" "}
            <Link to="/user/register" className="text-pink-500 hover:underline">User</Link> •{" "}
            <Link to="/food-partner/register" className="text-pink-500 hover:underline">Food Partner</Link>
          </nav>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="businessName" className="block text-gray-700 font-medium mb-1">Business Name</label>
            <input
              id="businessName"
              name="businessName"
              placeholder="Tasty Bites"
              autoComplete="organization"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactName" className="block text-gray-700 font-medium mb-1">Contact Name</label>
              <input
                id="contactName"
                name="contactName"
                placeholder="Jane Doe"
                autoComplete="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                id="phone"
                name="phone"
                placeholder="+1 555 123 4567"
                autoComplete="tel"
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
              placeholder="business@example.com"
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
              placeholder="Create password"
              autoComplete="new-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              id="address"
              name="address"
              placeholder="123 Market Street"
              autoComplete="street-address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-400 mt-1">Full address helps customers find you faster.</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors"
          >
            Create Partner Account
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          Already a partner?{" "}
          <Link to="/food-partner/login" className="text-pink-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
