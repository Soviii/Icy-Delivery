import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.currentUserID = ""; // set the value to null
      localStorage.userIsLoggedIn = "false";
      setCurrentUser(null);
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
