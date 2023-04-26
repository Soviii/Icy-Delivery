import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';
import Axios from 'axios';
import { Modal, Button } from 'react-bootstrap';


function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevents submit button to reload page (default is to reload page after submit button)
    try {

      const userBody = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: `${dateOfBirth.slice(5, 7)}-${dateOfBirth.slice(8, 10)}-${dateOfBirth.slice(0, 4)}`,
        email: email,
        password: password,
        address: {
          street: street,
          city: city,
          state: state,
          zip: zip,
          country: country
        }
      };

      const response = await Axios.post("http://localhost:4000/users/createUser", userBody);
      console.log(response);
      localStorage.userIsLoggedIn = "true";
      localStorage.currentUserID = response.data.data._id;

      setShowModal(true);
      setError("none");

    } catch (error) {
      console.log(error);
      // console.log(error.response.data.error);
      setError("error present");
      setShowModal(true);
      setErrorMessage(error.response.data.error)
    }
  };

  const handleModalClose = () => {
    if(error === "none"){
      setShowModal(false);
      navigate('/');
    } else {
      setShowModal(false);
    }

  };

  /* for debugging */
  const printToConsole = () => {
    console.log(`first name: ${firstName}\nlast name: ${lastName}\ndate of birth: ${dateOfBirth}\nemail: ${email}\npassword: ${password}\nstreet: ${street}\ncity: ${city}\nstate: ${state}\nzip: ${zip}\ncountry: ${country}`);
  }

  return (
    <div className="create-account-container">
      <h1 style={{ marginBottom: "30px" }}>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="columns">
          <div className="column">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="input-field" value={firstName} onChange={(input) => setFirstName(input.target.value)} required />

            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="input-field" value={lastName} onChange={(textField) => setLastName(textField.target.value)} required />

            <label htmlFor="email">Email</label>
            <input type="email" className="input-field" value={email} onChange={(textField) => setEmail(textField.target.value)} required />

            <label htmlFor="password">Password</label>
            <input type="password" className="input-field" value={password} onChange={(textField) => setPassword(textField.target.value)} required />

            <label htmlFor="dob">Date of Birth</label>
            <input type="date" className="input-field" onChange={(textField) => setDateOfBirth(textField.target.value)} required />
          </div>
          <div className="column">
            <label htmlFor="street">Street</label>
            <input type="text" className="input-field" value={street} onChange={(textField) => setStreet(textField.target.value)} required />

            <label htmlFor="city">City</label>
            <input type="text" className="input-field" value={city} onChange={(textField) => setCity(textField.target.value)} required />

            <label htmlFor="state">State</label>
            <input type="text" className="input-field" value={state} onChange={(textField) => setState(textField.target.value)} required />

            <label htmlFor="zip">Zip</label>
            <input type="text" className="input-field" value={zip} onChange={(textField) => setZip(textField.target.value)} required />

            <label htmlFor="country">Country</label>
            <input type="text" className="input-field" value={country} onChange={(textField) => setCountry(textField.target.value)} required />
          </div>
        </div>
        <button type="submit" onClick={handleSubmit} style={{ borderRadius: "7px"}}>Create Account</button>
      </form>



      <Modal show={showModal} onHide={handleModalClose}>
        {(() => {
          if (error === "none") {
            return (
              <>
                <Modal.Header closeButton>
                  <Modal.Title className="" style={{ textAlign: "center" }}>Account Created!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">Your account has been created successfully.</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleModalClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </>
            );
          } else {
            return (
              <>
              <Modal.Header closeButton>
                <Modal.Title style={{ marginLeft: "202px" }}>Error</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center" style={{ whiteSpace: "pre-wrap" }}>{errorMessage}</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleModalClose}>
                  Close
                </Button>
              </Modal.Footer>
            </>
            );
          }
        })()}
      </Modal>

        

    </div>
  );


}

export default CreateAccount;
