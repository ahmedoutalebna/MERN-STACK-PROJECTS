import React, { useState } from 'react';
import '../login/login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const URL = 'http://localhost:5500';

  const goToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const registeredData = {
      userName: userName,
      email: email,
      password: password,
    };

    setLoading(true);

    try {
      const res = await axios.post(`${URL}/user/register`, registeredData);
      if (res.data) {
        toast.success('User registered successfully');
        setUserName('');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to register user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h1 className="title">Register Page</h1>
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="email"
                className="login__input"
                placeholder="User name / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              className="button login__submit"
              onClick={handleRegister}
              disabled={loading}
            >
              <span className="button__text">Register</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <button className="button login__submit" onClick={goToLogin}>
              <span className="button__text">Return to login</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <div className="social-icons">
              <a href="#" className="social-login__icon fab fa-instagram"></a>
              <a href="#" className="social-login__icon fab fa-facebook"></a>
              <a href="#" className="social-login__icon fab fa-twitter"></a>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
