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
    <p style={{ flex: 1 }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id leo
      quis lorem porttitor bibendum. Nulla id nulla eget felis finibus
      sagittis. Proin sem sapien, dignissim at metus nec, tempus gravida
      lectus. Praesent elementum magna vel ex accumsan, ut lacinia justo
      facilisis. Suspendisse ultrices risus quis libero vulputate feugiat.
    </p>
  </div>

  );
}

export default Home;
