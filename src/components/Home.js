import { React, useState } from 'react';
import Axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Home.css";

function Home() {
  const ubeImage = require("../assets/flavors/ube.jpg");
  return (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src={ubeImage} alt="Placeholder" style={{
      width: '50%', 
      marginRight: '1rem', 
      transform: 'scale(0.9)',
      borderRadius: '50%', 
      marginRight: '20px', 
      zIndex: -1
      }} 
    />
    <p style={{ fontFamily: 'Trebuchet MS', fontSize: '3rem', margin: '20px 0' }}>
  Icy Delivery promises to fulfill your choice of ice cream in an efficient manner. Welcome!
</p>

  </div>

  );
}

export default Home;
