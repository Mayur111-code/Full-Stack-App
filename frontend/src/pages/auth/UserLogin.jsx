// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const UserLogin = () => {
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/auth/user/login",
//         { email, password },
//         { withCredentials: true }
//       );
//       console.log(response.data);
//       navigate("/"); // Redirect to home after login
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
//         <header className="mb-6 text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h1>
//           <p className="text-gray-500">Sign in to continue your food journey.</p>
//         </header>

//         <form onSubmit={handleSubmit} className="space-y-4" noValidate>
//           <div>
//             <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="you@example.com"
//               autoComplete="email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="••••••••"
//               autoComplete="current-password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="text-center text-sm text-gray-500 mt-4">
//           New here?{" "}
//           <a href="/user/register" className="text-pink-500 hover:underline">
//             Create account
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;



import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("✅ Login success:", response.data);
      // Debug check
      console.log("Cookie after login:", document.cookie);

      // small delay to allow cookie storage
      setTimeout(() => navigate("/"), 300);

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h1>
          <p className="text-gray-500">Sign in to continue your food journey.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input id="email" name="email" type="email" required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <input id="password" name="password" type="password" required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500" />
          </div>
          <button type="submit"
            className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors">
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          New here?{" "}
          <a href="/user/register" className="text-pink-500 hover:underline">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

