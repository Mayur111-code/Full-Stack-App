import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-md z-50" role="navigation" aria-label="Bottom">
      <div className="flex justify-around items-center h-16">
        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-gray-500 hover:text-pink-500 transition-colors ${
              isActive ? 'text-pink-500' : ''
            }`
          }
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
            <path d="M3 10.5L12 3l9 7.5" />
            <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </NavLink>

        {/* Saved */}
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-gray-500 hover:text-pink-500 transition-colors ${
              isActive ? 'text-pink-500' : ''
            }`
          }
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
          <span className="text-xs mt-1">Saved</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default BottomNav
