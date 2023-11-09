import './App.css';
import Home from './pages/Home.js';
import Login from './pages/Login.tsx';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Signup from './pages/Signup.tsx';
import Profile from './pages/Profile.js';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact element={<Profile />} path="/profile"></Route>
        <Route exact element={<Home />} path="/"></Route>
        <Route exact element={<Signup />} path="/signup"></Route>
        <Route exact element={<Login />} path="/login"></Route>
        <Route exact element={<Profile />} path="/profile"></Route>
      </Routes>
    </div>
  );
}


export default App;