import './App.css';
import Login from './components/Login.jsx'import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Signup from './pages/Signup.tsx';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact element={<Home />} path="/"></Route>
        <Route exact element={<Signup />} path="/signup"></Route>
        <Route exact element={<Login />} path="/login"></Route>
      </Routes>
    </div>
  );
}


export default App;