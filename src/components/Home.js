import { React, useState } from 'react';
import Axios from 'axios'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Home.css";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState();

  function timeout(delay){
    return new Promise( res => setTimeout(res, delay) );
  }

  function validateForm(){
    return email.length > 0 && password.length > 0;
  }
  
  const validateLogin = async () => {
    try {
        const response = await Axios.get(`http://localhost:4000/users/login?email=${email}&password=${password}`);
        setCurrentUser(response.data)
    } catch (err){
        console.log(err);
    }
    await timeout(1000)
  };
  console.log(localStorage.currentUser)
  console.log(currentUser)
  if (currentUser != null && localStorage.currentUserID == null){
    localStorage.currentUserID = currentUser.data._id
    alert("Logged In")
  }

  return (
    <div className="home">
      <Form>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
          <Button block="true" size="lg" onClick={() => validateLogin()} disabled={!validateForm()}>
            Login
          </Button>
      </Form>
    </div>
  );
}

export default Home;
