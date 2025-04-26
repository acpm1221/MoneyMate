import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../config';
import "./Signup.css";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!agreed) {
      setMessage({ type: 'error', text: "You must agree to the terms and conditions." });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePic) formData.append('profilePic', profilePic);

    try {
      await axios.post(`${BASE_URL}/api/users/signup`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage({ type: 'success', text: 'Signup successful!' });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || "Signup failed" });
    }
  };

  return (
   
  );
}

export default Signup;
