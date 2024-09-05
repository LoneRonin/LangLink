import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login.jsx';
import Homepage from './Homepage.jsx';
import './index.css';

const App = () => (
  <Router>
    <nav>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/homepage">Homepage</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
