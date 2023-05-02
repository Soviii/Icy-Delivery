import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import PreviousOrders from "./PreviousOrders.js";

const Account = () => {
    // const [isLoading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("none");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");

    const [showPasswordChangeModal, setShowChangePasswordModal] = useState(false);
    const [showEnterNewPasswordModal, setShowEnterNewPasswordModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);

    const [credentialsVerified, setCredentialsVerified] = useState("");

    const [originalEmail, setOriginalEmail] = useState("");
    const [originalPassword, setOriginalPassword] = useState("");
    const [originalDateOfBirth, setOriginalDateOfBirth] = useState("");
    const [originalFirstName, setOriginalFirstName] = useState("");
    const [originalLastName, setOriginalLastName] = useState("");
    const [originalStreet, setOriginalStreet] = useState("");
    const [originalCity, setOriginalCity] = useState("");
    const [originalState, setOriginalState] = useState("");
    const [originalZip, setOriginalZip] = useState("");
    const [originalCountry, setOriginalCountry] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        const getUserInfo = async () => {

            try {
                const response = await Axios.get(`http://localhost:4000/users/getUser?id=${localStorage.currentUserID}`);

                const user = response.data.data;

                setEmail(`${user.email}`);
                setOriginalEmail(`${user.email}`)

                // setPassword(`${user.password}`)
                setOriginalPassword(`${user.password}`);

                let dob = `${user.dateOfBirth.slice(6, 10)}-${user.dateOfBirth.slice(0, 2)}-${user.dateOfBirth.slice(3, 5)}`;
                setOriginalDateOfBirth(dob);
                setDateOfBirth(dob);

                setOriginalFirstName(`${user.firstName}`);
                setFirstName(`${user.firstName}`);

                setOriginalLastName(`${user.lastName}`)
                setLastName(`${user.lastName}`);

                setOriginalStreet(`${user.address.street}`);
                setStreet(`${user.address.street}`);

                setOriginalCity(`${user.address.city}`);
                setCity(`${user.address.city}`);

                setOriginalState(`${user.address.state}`);
                setState(`${user.address.state}`);

                setOriginalZip(`${user.address.zip}`)
                setZip(`${user.address.zip}`);

                setOriginalCountry(`${user.address.country}`);
                setCountry(`${user.address.country}`);

            } catch (err) {
                console.log(err.message);
            }
        }

        getUserInfo();
    }, []);

    const handleUpdateAccount = async (event) => {
        event.preventDefault();
        try {
            console.log(`original email is: ${originalEmail}`);
            console.log(`${originalEmail} - ${originalPassword} - ${originalDateOfBirth}`);


            console.log(`http://localhost:4000/users/login?email=${originalEmail}&password=${await encodePassword()}`);

            const verifyPassword = await Axios.get(`http://localhost:4000/users/login?email=${originalEmail}&password=${await encodePassword()}`);


            const newAccountInfo = {
                "firstName": firstName,
                "lastName": lastName,
                "dateOfBirth": `${dateOfBirth.slice(5,7)}-${dateOfBirth.slice(8,10)}-${dateOfBirth.slice(0,4)}`,
                "email": email,
                "password": password,
                "address": {
                    "street": street,
                    "city": city,
                    "state": state,
                    "zip": zip,
                    "country": country
                }
            }


            const updatedUser = await Axios.patch(`http://localhost:4000/users/updateUserInfo?id=${localStorage.currentUserID}`, newAccountInfo);

            setCredentialsVerified("Updated account information! Reloading page...");

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (err) {
            setCredentialsVerified("Loading");

            setTimeout(() => {
                //TODO: check if error message for both invalid password and invalid formatting of each word is the same source in the response data ORRRRR check formatting via regex when you click the update account button
                console.log(`${originalEmail}`);
                console.log(`${password}`);
                console.log(err.response.data.message);
                const errorMessage = err.response.data.message;

                if(errorMessage === "Invalid email or password"){
                    setCredentialsVerified("Invalid password");
                } else {
                    setCredentialsVerified(`${errorMessage}`)
                }}, 500)
                // setCredentialsVerified(`${err.response.data.message}`);
        }
    };


    const handleDeleteAccount = async (event) => {
        event.preventDefault();
        try {

            const verifyLogin = await Axios.get(`http://localhost:4000/users/login?email=${originalEmail}&password=${await encodePassword()}`);

            const response = await Axios.delete(`http://localhost:4000/users/deleteUser?id=${localStorage.currentUserID}`);

            // const verified = response.data.success;

            setCredentialsVerified("Successfully deleted account, redirecting to home page...");

            localStorage.currentUserID = "";
            localStorage.userIsLoggedIn = "false"

            setTimeout(() => {
                navigate("/");
            }, 1500);
        
        } catch (err) {
            // console.log(err);
            setCredentialsVerified("Invalid password");
            console.log(err);
        }
    };


    const handleUpdatePasswordPhaseOne = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.get(`http://localhost:4000/users/login?email=${originalEmail}&password=${await encodePassword()}`);

            console.log(`http://localhost:4000/users/login?email=${originalEmail}&password=${await encodePassword()}`)
            const verified = response.data.success;

            if (verified === true) {
                setCredentialsVerified("Verified, loading...");
                
            setTimeout(() => {
                setCredentialsVerified("");
                setShowChangePasswordModal(false);
                setShowEnterNewPasswordModal(true);
            }, 2000);
                
            }


        } catch (err) {
            // console.log(err);
            setCredentialsVerified("Loading");

            setTimeout(() => {
                //TODO: check if error message for both invalid password and invalid formatting of each word is the same source in the response data ORRRRR check formatting via regex when you click the update account button
                setCredentialsVerified("Invalid Password")
            }, 500);

            // return false;
        }
    };


    const handleUpdatePasswordPhaseTwo = async (event) => {
        event.preventDefault();
        try {
            const newAccountInfo = {
                "firstName": originalFirstName,
                "lastName": originalLastName,
                "dateOfBirth": `${originalDateOfBirth.slice(5,7)}-${originalDateOfBirth.slice(8,10)}-${originalDateOfBirth.slice(0,4)}`,
                "email": originalEmail,
                "password": newPassword,
                "address": {
                    "street": originalStreet,
                    "city": originalCity,
                    "state": originalState,
                    "zip": originalZip,
                    "country": originalCountry
                }
            }
            console.log(`${newPassword}`);

            const updatedUser = await Axios.patch(`http://localhost:4000/users/updateUserInfo?id=${localStorage.currentUserID}`, newAccountInfo);

            setCredentialsVerified("Updated password! Reloading page...");

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (err) {
            console.log(err);
            setCredentialsVerified(`${err.response.data.message}`);
        }
    };

    const preventReload = (event) => {
        event.preventDefault();
    };

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
    };


    return (
        <>
            <div className="create-account-container">
                <h1 style={{ marginBottom: "30px" }}>Account Information</h1>
                <form>
                    <div className="columns">
                        <div className="column">
                            <label htmlFor="firstName">First Name</label>
                            <input onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="text" className="input-field" value={firstName} onChange={(input) => setFirstName(input.target.value)} required />

                            <label htmlFor="lastName">Last Name</label>
                            <input onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="text" className="input-field" value={lastName} onChange={(textField) => setLastName(textField.target.value)} required />

                            <label htmlFor="email">Email</label>
                            <input onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="email" className="input-field" value={email} onChange={(textField) => setEmail(textField.target.value)} required />

                            <label htmlFor="password">Password</label>
                            <button style={{ borderRadius: "7px", margin: "7px auto", width: "50%", backgroundColor: "gray" }} onClick={((event) => {
                                setShowChangePasswordModal(true);
                                event.preventDefault();
                            })}>Change Password</button>

                            <label htmlFor="dob">Date of Birth</label>
                            <input onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="date" className="input-field" value={dateOfBirth} onChange={(textField) => setDateOfBirth(textField.target.value)} required />
                        </div>
                        <div className="column">
                            <label htmlFor="street">Street</label>
                            <input onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="text" className="input-field" value={street} onChange={(textField) => setStreet(textField.target.value)} required />

                            <label htmlFor="city">City</label>
                            <input onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="text" className="input-field" value={city} onChange={(textField) => setCity(textField.target.value)} required />

                            <label htmlFor="state">State</label>
                            <input onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="text" className="input-field" value={state} onChange={(textField) => setState(textField.target.value)} required />

                            <label htmlFor="zip">Zip</label>
                            <input onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="text" className="input-field" value={zip} onChange={(textField) => setZip(textField.target.value)} required />

                            <label htmlFor="country">Country</label>
                            <input onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="text" className="input-field" value={country} onChange={(textField) => setCountry(textField.target.value)} required />
                        </div>
                    </div>
                    <div style={{ style: "flex", justifyContent: "space-between" }}>
                        <button style={{ borderRadius: "7px", margin: "30px 30px" }} onClick={((event) => {
                            setShowUpdateModal(true);
                            event.preventDefault();
                        })}>Update Account</button>
                        <button style={{ borderRadius: "7px", margin: "30px 30px", backgroundColor: "#B80F0A" }} onClick={((event) => {
                            setShowDeletionModal(true);
                            event.preventDefault();
                        })}>Delete Account</button>

                        {/* <button style={{ borderRadius: "7px" }}>Restore Information Values</button> */}

                    </div>
                </form>
            </div>



            {/* for changing password; phase 1*/}
            <Modal show={showPasswordChangeModal} onHide={(() => {
                setShowChangePasswordModal(false);
                setCredentialsVerified("");
            })}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: "95px" }}>Password Change Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicPassword1">
                            <Form.Label>Enter original password to update password</Form.Label>
                            <Form.Control onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="password" placeholder="Password" onChange={(inputField) => setPassword(inputField.target.value)} />
                        </Form.Group>
                    </Form>
                    <h4 style={{ textAlign: "center", marginTop: "50px" }}>{credentialsVerified}</h4>

                    <Button variant="primary" className="mx-auto d-block" onClick={handleUpdatePasswordPhaseOne} disabled={password.length === 0}>
                        Submit
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(() => {
                        setShowChangePasswordModal(false);
                        setCredentialsVerified("");
                    })}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* for updating password; phase 2 */}
            <Modal show={showEnterNewPasswordModal} onHide={(() => {
                setShowEnterNewPasswordModal(false);
                setCredentialsVerified("");
            })}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: "95px" }}>Password Change Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicPassword2">
                            <Form.Label>Enter new password</Form.Label>
                            <Form.Control onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="password" placeholder="Password" onChange={(inputField) => setNewPassword(inputField.target.value)} />
                        </Form.Group>
                    </Form>
                    <h4 style={{ textAlign: "center", marginTop: "50px", whiteSpace: "pre-wrap" }}>{credentialsVerified}</h4>

                    <Button variant="primary" className="mx-auto d-block" onClick={handleUpdatePasswordPhaseTwo} disabled={password.length === 0}>
                        Submit
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(() => {
                        setShowEnterNewPasswordModal(false);
                        setCredentialsVerified("");
                    })}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* for updating account information */}
            <Modal show={showUpdateModal} onHide={(() => {
                setShowUpdateModal(false);
                setCredentialsVerified("");
            })}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: "105px" }}>Update Account Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Enter password to finalize account changes</Form.Label>
                            <Form.Control  type="password" placeholder="Password" onChange={(inputField) => setPassword(inputField.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} />
                        </Form.Group>
                    </Form>
                    <h4 style={{ textAlign: "center", marginTop: "50px" }}>{credentialsVerified}</h4>

                    <Button className="mx-auto d-block" onClick={handleUpdateAccount} disabled={password.length === 0}>
                        Submit
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(() => {
                        setShowUpdateModal(false);
                        setCredentialsVerified("");
                    })}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>






            {/* for deleting account */}
            <Modal show={showDeletionModal} onHide={(() => {
                setShowDeletionModal(false);
                setCredentialsVerified("");
            })}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: "82px" }}>Delete Account Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Enter password to continue account deletion</Form.Label>
                            <Form.Control onKeyDown={(e) => {if(e.key === 'Enter') preventReload(e)}} type="password" placeholder="Password" onChange={(inputField) => setPassword(inputField.target.value)} />
                        </Form.Group>
                    </Form>
                    <h4 style={{ textAlign: "center", marginTop: "50px",  }}>{credentialsVerified}</h4>

                    <Button variant="primary" className="mx-auto d-block" onClick={handleDeleteAccount} disabled={password.length === 0}>
                        Submit
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(() => {
                        setShowDeletionModal(false);
                        setCredentialsVerified("");
                    })}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <PreviousOrders  />
        </>
    );
}

export default Account;