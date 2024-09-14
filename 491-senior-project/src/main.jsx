import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login.jsx';
import Homepage from './Homepage.jsx';
import Signup from './Signup.jsx'; // Import the new Signup page
import Conjugate from './Conjugate.jsx';
import './index.css';

const App = () => (
  <Router>
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Login</Link></li>
        <li className="nav-item"><Link to="/homepage">Homepage</Link></li>
        <li className="nav-item"><Link to="/signup">Sign Up</Link></li> {/* Added Sign Up link */}
        <li className="nav-item"><Link to="/Conjugate">Conjugate</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} /> {/* Added route for Signup */}
      <Route path="/Conjugate" element={<Conjugate />} />
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
