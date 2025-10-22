import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id)
      return
    }
    videoRefs.current.set(id, el)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {items.length === 0 && (
        <div className="text-white text-center text-lg">{emptyMessage}</div>
      )}

      {items.map((item) => (
        <section
          key={item._id}
          className="relative w-full max-w-md mb-8 rounded-xl overflow-hidden shadow-lg"
        >
          <video
            ref={setVideoRef(item._id)}
            src={item.video}
            muted
            playsInline
            loop
            preload="metadata"
            className="w-full h-auto object-cover rounded-xl"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
            {/* Actions */}
            <div className="absolute top-4 right-4 flex flex-col space-y-4">
              {/* Like */}
              <div className="flex flex-col items-center text-white">
                <button
                  onClick={onLike ? () => onLike(item) : undefined}
                  className="p-2 bg-black/50 rounded-full hover:bg-pink-600 transition"
                  aria-label="Like"
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
                </button>
                <span className="text-sm mt-1">{item.likeCount ?? 0}</span>
              </div>

              {/* Save */}
              <div className="flex flex-col items-center text-white">
                <button
                  onClick={onSave ? () => onSave(item) : undefined}
                  className="p-2 bg-black/50 rounded-full hover:bg-blue-600 transition"
                  aria-label="Save"
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
                </button>
                <span className="text-sm mt-1">{item.savesCount ?? 0}</span>
              </div>

              {/* Comments */}
              <div className="flex flex-col items-center text-white">
                <button className="p-2 bg-black/50 rounded-full" aria-label="Comments">
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
                </button>
                <span className="text-sm mt-1">
                  {item.commentsCount ?? (Array.isArray(item.comments) ? item.comments.length : 0)}
                </span>
              </div>
            </div>

            {/* Description & Link */}
            <div className="text-white mt-4">
              <p className="text-sm line-clamp-2">{item.description}</p>
              {item.foodPartner && (
                <Link
                  to={`/food-partner/${item.foodPartner}`}
                  className="inline-block mt-2 px-4 py-1 bg-pink-500 rounded-lg text-white text-sm hover:bg-pink-600 transition"
                >
                  Visit store
                </Link>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default ReelFeed
