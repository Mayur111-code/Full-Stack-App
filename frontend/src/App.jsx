// import React from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import UserRegister from '../src/pages/auth/UserRegister';
// import ChooseRegister from '../src/pages/auth/ChooseRegister';
// import UserLogin from '../src/pages/auth/UserLogin';
// import FoodPartnerRegister from '../src/pages/auth/FoodPartnerRegister';
// import FoodPartnerLogin from '../src/pages/auth/FoodPartnerLogin';
// // import Home from '../pages/general/Home';
// import Home from '../src/pages/auth/general/Home'
// import Saved from '../src/pages/auth/general/Saved';
// import BottomNav from '../src/components/BottomNav';
// import CreateFood from '../src/pages/auth/food-partner/CreateFood';
// import Profile from '../src/pages/auth/food-partner/Profile';

// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/register" element={<ChooseRegister />} />
//                 <Route path="/user/register" element={<UserRegister />} />
//                 <Route path="/user/login" element={<UserLogin />} />
//                 <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
//                 <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
//                 <Route path="/" element={<><Home /><BottomNav /></>} />
//                 <Route path="/saved" element={<><Saved /><BottomNav /></>} />
//                 <Route path="/create-food" element={<CreateFood />} />
//                 <Route path="/food-partner/:id" element={<Profile />} />
//             </Routes>
//         </Router>
//     )
// }

// export default App


import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../src/pages/auth/UserRegister';
import ChooseRegister from '../src/pages/auth/ChooseRegister';
import UserLogin from '../src/pages/auth/UserLogin';
import FoodPartnerRegister from '../src/pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../src/pages/auth/FoodPartnerLogin';
import Home from '../src/pages/auth/general/Home'
import Saved from '../src/pages/auth/general/Saved';
import BottomNav from '../src/components/BottomNav';
import CreateFood from '../src/pages/auth/food-partner/CreateFood';
import Profile from '../src/pages/auth/food-partner/Profile';
import ProtectedRoute from '../src/components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<ChooseRegister />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute><><Home /><BottomNav /></></ProtectedRoute>} />
                <Route path="/saved" element={<ProtectedRoute><><Saved /><BottomNav /></></ProtectedRoute>} />
                <Route path="/create-food" element={<ProtectedRoute><CreateFood /></ProtectedRoute>} />
                <Route path="/food-partner/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
        </Router>
    )
}

export default App;
