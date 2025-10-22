import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ReelFeed from '../../components/ReelFeed';
import ReelFeed from '../../../components/ReelFeed';
const Saved = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/food/save', { withCredentials: true })
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }));
        setVideos(savedFoods);
      })
      .catch(() => {});
  }, []);

  const removeSaved = async (item) => {
    try {
      await axios.post(
        'http://localhost:3000/api/food/save',
        { foodId: item._id },
        { withCredentials: true }
      );
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) }
            : v
        )
      );
    } catch {
      // handle error if needed
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Saved Videos
      </h1>

      <div className="w-full max-w-md">
        <ReelFeed
          items={videos}
          onSave={removeSaved}
          emptyMessage="No saved videos yet."
        />
      </div>
    </div>
  );
};

export default Saved;
