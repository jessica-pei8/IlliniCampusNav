import React, { useState, useEffect } from 'react';
import './styles/tailwind.css';
import {
    Routes,
    Route,
	BrowserRouter,
} from "react-router-dom";

import Home from './pages/Home';
import Builder from './pages/Builder'
import LoginPage from './pages/LoginPage'
import Routing from './pages/Routing'
import TodoList from './components/TodoList';
import NavBar from './components/NavBar';



function App() {
	
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // fetch('/time').then(res => res.json()).then(data => {
    //   setCurrentTime(data.time);
    // });
  }, []);

  return (

	<BrowserRouter> 
		<NavBar />
		<Routes>
			<Route>
				<Route index element={<Home />} />
				<Route path="build-routes" element={<Builder />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="signup" element={<LoginPage />} />
				<Route path="routing" element={<Routing />} />
				<Route path="todo" element={<TodoList />} />
			</Route>
		</Routes>
	
	</BrowserRouter>
  );
}

export default App;