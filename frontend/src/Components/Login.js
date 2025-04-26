import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../config';
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/users/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.error || "Login failed";
      setError(message);
      console.error('Login error:', message);
    }
  };

  return (
   
  );
}

export default Login;
