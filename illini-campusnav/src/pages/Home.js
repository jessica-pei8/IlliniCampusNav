import React, { useState, useEffect } from 'react';
import EmbeddedMap from '../components/EmbeddedMap';
import NavBar from '../components/NavBar';
import axios from 'axios';
axios.defaults.withCredentials = true; // This line should be included if your API expects cookies to be sent.

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication status

    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/check_login', {
          withCredentials: true
        });
        setIsLoggedIn(response.data.logged_in);
      } catch (error) {
        console.error('Failed to check login status:', error.message);
        setIsLoggedIn(false);  // Assume not logged in if there's an error
      }
    };
    
    useEffect(() => {
      checkLoginStatus();
    }, []);

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} />

            <div className="pl-20 flex flex-col items-center justify-center h-screen bg-black text-white">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <h1 className="text-6xl font-jura font-thin">
                                FIND.
                            </h1>
                        </div>
                        <div className="mb-2 ml-64"> {/* Margin-left to "YOUR." */}
                            <h1 className="text-6xl font-jura font-thin">
                                YOUR.
                            </h1>
                        </div>
                        <div className="mb-2 flex justify-center"> {/* Centering "WAY." */}
                            <h1 className="text-6xl font-jura font-thin">
                                WAY.
                            </h1>
                        </div>
                        <h1 className="text-6xl font-jura font-thin mb-2 text-left">
                            CAMPUS NAVIGATION HAS NEVER BEEN EASIER
                        </h1>
                        <div className="flex flex-col items-left mt-16 text-sm font-jura font-light text-gray-500">
                            <span>ILLINI FOUNDED</span>
                            <span>ILLINI CENTRIC</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-96 bg-gray-700"> {/* Simulated additional content */}</div>
            <div className="h-screen bg-gray-900"> {/* Simulated additional content */}</div>
            <div className="h-96 bg-gray-700"> {/* Simulated additional content */}</div>
            <EmbeddedMap />
        </div>
    );
};

export default Home;
