import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.currentUserID = ""; // set the value to null
      localStorage.userIsLoggedIn = "false";
      localStorage.admin = "false";
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>Successfully logged out</h2>
      <p>Redirecting to login page ...</p>
    </div>
  );
};

export default Logout;
