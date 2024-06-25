import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true; // This line should be included if your API expects cookies to be sent.

const NavBar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/logout', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true  // Needed if you're handling sessions or JWT in HTTP-only cookies
      });
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };
  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white px-4 py-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-thin font-julius">
          <a href="/">ILLINAV</a>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="hover:text-gray-300 text-lg font-jura">
                LOGOUT
              </button>
              <div className="h-6 w-px bg-white"></div>
              <a href="/checklist" className="hover:text-gray-300 text-lg font-jura">
                TODO LIST
              </a>
              <div className="h-6 w-px bg-white"></div>
              <a href="/schedule" className="hover:text-gray-300 text-lg font-jura">
                SCHEDULE GENERATE
              </a>
             <div className="h-6 w-px bg-white"></div>
          <a href="/builder" className="hover:text-gray-300 text-lg font-jura">BUILD SCHEDULE</a>
            </>
          ) : (
            <a href="/login" className="hover:text-gray-300 text-lg font-jura">
              SIGN UP/LOGIN
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
