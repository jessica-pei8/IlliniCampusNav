import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
axios.defaults.withCredentials = true;

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/signup', {
      email: email,
      password: password
    }).then(response => {
      localStorage.setItem('token', response.data.access_token);
      navigate("/");
    }).catch(error => {
      if (error.response && error.response.status === 409) {
        alert("Email already in use");
      } else {
        alert("An error occurred during registration");
      }
    });
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <p className="text-center text-3xl font-extrabold text-white">Create Your Account</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={registerUser}>
            <input type="hidden" name="remember" value="true" />
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none bg-transparent border-b border-gray-700 text-white w-full py-2 px-3 focus:outline-none" placeholder="Email" />
            </div>
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none bg-transparent border-b border-gray-700 text-white w-full py-2 px-3 focus:outline-none" placeholder="Password" />
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700">Sign Up</button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-white">Already have an account? <a href="/login" className="underline text-white">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
