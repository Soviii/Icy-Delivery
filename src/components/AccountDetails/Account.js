import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import Axios from "axios";

const Account = () => {
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("none");
    const [passwordMasked, setPasswordMasked] = useState(true);
    const [showPassword, setShowPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [rowsData, setRowsData] = useState([]);
    const [checked, setChecked] = useState(true);
    const [changesMade, setChangesMade] = useState(false);

    let originalEmail = "";
    let originalPassword = "";
    let originalDateOfBirth = "";
    let originalFirstName = "";
    let originalLastName = "";
    let originalStreet = "";
    let originalCity = "";
    let originalState = "";
    let originalZip = "";
    let originalCountry = "";

    useEffect(() => {
        const getUserInfo = async () => {

            try {
                const response = await Axios.get(`http://localhost:4000/users/getUser?id=${localStorage.currentUserID}`);

                console.log(response.data.data);
            } catch (err) {
                console.log(err.message);
            }


            
        }

        getUserInfo();
        // Fetch current user data from backend
        // Set currentUser and setLoading when response received
    }, []);

    const handleShowPassword = () => {
        setPasswordMasked(!passwordMasked);
    };

    const handleUpdateAccount = () => {
        // Send updated user data to backend
        // Update changesMade state when response received
    };

    const handleDeleteAccount = () => {
        // Send delete request to backend
        // Redirect to login page or show success message when response received
    };


    return (
        <div className="account-details-container">
            <h2>Account Details</h2>
            <div className="columns">
                <div className="column">
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formDateOfBirth">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Button variant="outline-secondary" onClick={handleShowPassword}>UpdatePassword</Button>
                                {/* <FormControl type={passwordMasked ? "password" : "text"} value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Button variant="outline-secondary" onClick={handleShowPassword}>{passwordMasked ? "Show" : "Hide"}</Button> */}
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </div>
                <div className="column">
                    <Form>
                        <Form.Group controlId="formStreet">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formState">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" value={state} onChange={(e) => setState(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>
            </div>
            <div className="buttons-container">
                <Button variant="primary" disabled={!changesMade} onClick={handleUpdateAccount}>Update Account</Button>
                <Button variant="danger" onClick={handleDeleteAccount}>Delete Account</Button>
            </div>
        </div>
    );


}

export default Account;