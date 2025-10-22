import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) {
      setVideoURL('');
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setVideoFile(null);
      setFileError('');
      return;
    }
    if (!file.type.startsWith('video/')) {
      setFileError('Please select a valid video file.');
      return;
    }
    setFileError('');
    setVideoFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setFileError('Please drop a valid video file.');
      return;
    }
    setFileError('');
    setVideoFile(file);
  };

  const onDragOver = (e) => e.preventDefault();
  const openFileDialog = () => fileInputRef.current?.click();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('video', videoFile);

    try {
      const response = await axios.post('http://localhost:3000/api/food', formData, {
        withCredentials: true,
      });
      console.log(response.data);
      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-6">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Create Food</h1>
          <p className="text-gray-500 mt-1">Upload a short video, give it a name, and add a description.</p>
        </header>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Video Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Food Video</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              className="hidden"
              onChange={onFileChange}
            />
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-pink-500 transition"
              onClick={openFileDialog}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <svg
                className="mx-auto mb-2 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 0 1 4-4h10a4 4 0 1 1 0 8H7a4 4 0 1 1-4-4z"
                />
              </svg>
              <p className="text-gray-500">
                <strong>Tap to upload</strong> or drag and drop
              </p>
              <p className="text-gray-400 text-sm mt-1">MP4, WebM, MOV • Up to ~100MB</p>
            </div>
            {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}

            {videoFile && (
              <div className="mt-3 flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                <span className="font-medium text-gray-700">{videoFile.name}</span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="text-sm text-pink-500 hover:underline"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null);
                      setFileError('');
                    }}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {videoURL && (
              <div className="mt-4">
                <video src={videoURL} controls className="w-full rounded-lg shadow-sm" />
              </div>
            )}
          </div>

          {/* Food Name */}
          <div>
            <label htmlFor="foodName" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              id="foodName"
              type="text"
              placeholder="e.g., Spicy Paneer Wrap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>

          {/* Food Description */}
          <div>
            <label htmlFor="foodDesc" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="foodDesc"
              rows={4}
              placeholder="Write a short description: ingredients, taste, spice level, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-3 font-semibold rounded-lg text-white ${
              isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'
            } transition`}
          >
            Save Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
