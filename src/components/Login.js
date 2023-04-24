import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [currentUser, setCurrentUser] = useState();
  const [loginSuccess, setLoginSuccess] = useState(null);
  const navigate = useNavigate();
  function timeout(delay){
    return new Promise( res => setTimeout(res, delay) );
  }

  function validateForm(){
    return email.length > 0 && password.length > 0;
  }
  
  const validateLogin = async () => {
    try {
        const response = await Axios.get(`http://localhost:4000/users/login?email=${email}&password=${password}`);
        // setCurrentUser(response.data);
        setLoginSuccess(true);
        console.log(response);
        localStorage.currentUserID = response.data.data._id;
        localStorage.userIsLoggedIn = "true";
        console.log("set to true");
        setTimeout(() => {
          navigate('/');
          }, 1000);
		  
    } catch (err) {
        console.log(err);
        setLoginSuccess(false);
        localStorage.userIsLoggedIn = "false";
    }
    await timeout(1000)
  };

  const showLoginStatus = () => {
    if (loginSuccess === true) {
      return (
        <div className="login-status success">
          <p>Loading...</p>
        </div>
      )
    } else if (loginSuccess === false) {
      return (
        <div className="login-status failure">
          <p>Invalid credentials.</p>
		  <p>{localStorage.userIsLoggedIn}</p>
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <div className="Login">
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
        <Button block="true" onClick={() => {validateLogin()}} disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      {showLoginStatus()}
    </div>
  );
}

export default Login;
