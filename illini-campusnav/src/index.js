import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/tailwind.css';
import SignupPage from './pages/SignupPage'
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Builder from './pages/Builder'
import LoginPage from './pages/LoginPage'
import Routing from './pages/Routing'
import TodoList from './components/TodoList';
import NavBar from './components/NavBar';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
  <Routes>
      <Route index element={<Home />} />
      <Route path="/checklist" element={<TodoList />} />
      <Route path="/schedule" element={<Routing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/builder" element={<Builder />} />
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
