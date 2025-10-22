import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [items]);

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
      {items.length === 0 && (
        <div className="mt-20 text-gray-500 text-lg">{emptyMessage}</div>
      )}

      <div className="flex flex-col w-full max-w-md">
        {items.map((item) => (
          <section
            key={item._id}
            className="relative w-full h-[500px] md:h-[600px] mb-6 bg-black rounded-lg overflow-hidden shadow-md"
          >
            <video
              ref={setVideoRef(item._id)}
              src={item.video}
              muted
              playsInline
              loop
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 flex flex-col justify-end">
              <div className="flex justify-between items-end">
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={onLike ? () => onLike(item) : undefined}
                    className="flex items-center space-x-1 text-white hover:text-red-500"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                    <span>{item.likeCount ?? 0}</span>
                  </button>

                  <button
                    onClick={onSave ? () => onSave(item) : undefined}
                    className="flex items-center space-x-1 text-white hover:text-yellow-400"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                    </svg>
                    <span>{item.savesCount ?? 0}</span>
                  </button>

                  <div className="flex items-center space-x-1 text-white">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                    </svg>
                    <span>{item.commentsCount ?? 0}</span>
                  </div>
                </div>

                {item.foodPartner && (
                  <Link
                    to={`/food-partner/${item.foodPartner}`}
                    className="bg-white text-black px-3 py-1 rounded-md font-semibold text-sm hover:bg-gray-200"
                  >
                    Visit store
                  </Link>
                )}
              </div>

              {item.description && (
                <p className="mt-2 text-white text-sm line-clamp-3">{item.description}</p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ReelFeed;
