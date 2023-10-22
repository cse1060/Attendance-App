import './App.css';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';
import TakeAttendance from './pages/TakeAttendance';
import Classes from './pages/Classes';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact element={<Home />} path="/"></Route>
        <Route exact element={<Signup />} path="/signup"></Route>
        <Route exact element={<Login />} path="/login"></Route>
        <Route element={<Profile />} path="/profile/:username"></Route>
        <Route element={<CreateProfile />} path="/create_profile"></Route>
        <Route element={<TakeAttendance />} path="/take_attendance"></Route>
        <Route element={<Classes />} path="/:username/classes/:classname"></Route>
      </Routes>
    </div>
  );
}


export default App;
