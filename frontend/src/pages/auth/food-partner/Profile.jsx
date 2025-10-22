import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Profile Header */}
      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 md:flex md:items-center md:justify-between">
        <div className="flex items-center space-x-4">
          <img
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D"
            alt={profile?.name || 'Profile'}
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{profile?.name}</h1>
            <p className="text-gray-500 mt-1">{profile?.address}</p>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-6 text-center">
          <div>
            <span className="block text-gray-500 text-sm">Total Meals</span>
            <span className="block text-gray-800 font-semibold text-lg">{profile?.totalMeals}</span>
          </div>
          <div>
            <span className="block text-gray-500 text-sm">Customers Served</span>
            <span className="block text-gray-800 font-semibold text-lg">{profile?.customersServed}</span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="my-6 border-gray-300 max-w-4xl mx-auto" />

      {/* Videos Grid */}
      <section className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" aria-label="Videos">
        {videos.map((v) => (
          <div key={v.id} className="relative w-full aspect-square rounded-lg overflow-hidden shadow-sm bg-gray-100">
            <video
              src={v.video}
              muted
              controls
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default Profile;
