import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(null);
  const navigate = useNavigate();

  function timeout(delay){
    return new Promise( res => setTimeout(res, delay) );
  }

  function validateForm(){
    return email.length > 0 && password.length > 0;
  }
  
  /* encodes password for properly passing as query parameter */
  const encodePassword = async () => {
    const encodedPassword = password
      .replace(/ /g, '%20')
      .replace(/"/g, '%22')
      .replace(/'/g, '%27')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
      .replace(/&/g, '%26')
      .replace(/\+/g, '%2B')
      .replace(/,/g, '%2C')
      .replace(/\//g, '%2F')
      .replace(/:/g, '%3A')
      .replace(/;/g, '%3B')
      .replace(/=/g, '%3D')
      .replace(/\?/g, '%3F')
      .replace(/@/g, '%40')
      .replace(/#/g, '%23');
    return encodedPassword;
  }
   
  const validateAdminLogin = async () => {
    try {
        // console.log(email);
        // console.log(password);
        // console.log(`http://localhost:4000/users/login?email=${email}&password=${password}`)
        const response = await Axios.get(`http://localhost:4000/users/login?email=${email}&password=${await encodePassword()}`);

        if(response.data.data.admin !== "true"){
            localStorage.userIsLoggedIn = "false";
            setLoginSuccess(false);
            return;
        }

        setLoginSuccess(true);
        console.log(response);
        localStorage.currentUserID = response.data.data._id;
        localStorage.userIsLoggedIn = "true";
        localStorage.admin = "true";
        
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
          <p>Invalid credentials</p>
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <div className="Login">
        <h2 style={{ textAlign: "center"}}>Secret...</h2>
      <Form>
        <Form.Group style={{ marginBottom: "30px"}} size="lg" controlId="email">
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
        <div className="d-flex justify-content-between align-items-center">
          <Button block="true" onClick={() => {validateAdminLogin()}} disabled={!validateForm()} style={{ margin: "20px" }}>
            Login
          </Button>
        </div>
      </Form>
      {showLoginStatus()}
    </div>
  );
}

export default AdminLogin;