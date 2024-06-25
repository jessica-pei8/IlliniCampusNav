import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
axios.defaults.withCredentials = true;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const logInUser = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/login', {
      email: email,
      password: password
    }).then(response => {
      localStorage.setItem('token', response.data.access_token);
      console.log("User logged in successfully with email:", email);
      setIsLoggedIn(true);
      navigate("/");
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        console.log("User didn't log in:");
        alert("Invalid credentials");
      }
    });
  }

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-white font-julius font-bold">
              Log Into Your Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={logInUser}>
            <input type="hidden" name="remember" value="true" />
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none bg-transparent border-b border-gray-700 text-white font-jura font-thin focus:border-indigo-500 w-full py-2 px-3 focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none bg-transparent border-b border-gray-700 text-white font-jura font-thin focus:border-indigo-500 w-full py-2 px-3 focus:outline-none"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-white text-sm font-jura font-thin text-white bg-none hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center">
            <a href="/register" className="underline text-sm text-white hover:text-gray-300">
              Don't have an account? Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}