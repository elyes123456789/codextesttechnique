import './App.css'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/login.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

