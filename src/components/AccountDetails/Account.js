import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import Axios from "axios";

const Account = () => {
    // const [isLoading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("none");
    // const [passwordMasked, setPasswordMasked] = useState(true);
    // const [showPassword, setShowPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    // const [rowsData, setRowsData] = useState([]);
    // const [checked, setChecked] = useState(true);
    const [changesMade, setChangesMade] = useState(false);

    const [showPasswordChangeModal, setShowChangePasswordModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);

    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [showSubmitButton, setShowSubmitButton] = useState(true);

    const [credentialsVerified, setCredentialsVerified] = useState("");

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

                const user = response.data.data;

                setEmail(`${user.email}`);
                originalEmail = user.email;

                // setPassword(`${user.password}`)
                originalPassword = user.password;

                originalDateOfBirth = `${user.dateOfBirth.slice(6, 10)}-${user.dateOfBirth.slice(0, 2)}-${user.dateOfBirth.slice(3, 5)}`;
                setDateOfBirth(`${originalDateOfBirth}`);

                setFirstName(`${user.firstName}`);
                originalFirstName = user.firstName;

                setLastName(`${user.lastName}`);
                originalLastName = user.lastName;

                setStreet(`${user.address.street}`);
                originalStreet = user.address.street;

                setCity(`${user.address.city}`);
                originalCity = user.address.city;

                setState(`${user.address.state}`);
                originalState = user.address.state;

                setZip(`${user.address.zip}`);
                originalZip = user.address.zip;

                setCountry(`${user.address.country}`);
                originalCountry = user.address.country;

                // console.log(response.data.data);
            } catch (err) {
                // console.log(err.message);
            }



        }

        getUserInfo();
        // Fetch current user data from backend
        // Set currentUser and setLoading when response received
    }, []);

    const handleUpdateAccount = () => {
        // Send updated user data to backend
        // Update changesMade state when response received
    };

    const handleDeleteAccount = async (event) => {
        // event.preventDefault();
        // try {
        //     const user = await Axios.get(`http://localhost:4000/users/getUser?id=${localStorage.currentUserID}`);

        //     const email = user.data.data.email;

        //     // console.log(email);

        //     const response = await Axios.delete(`http://localhost:4000/users/login?email=${email}&password=${await encodePassword()}`);

        //     const verified = response.data.success;

        //     if (verified === true){
        //         console.log("YAY");
        //     }

        //     setCredentialsVerified("Verified");

        // } catch (err) {
        //     // console.log(err);
        //     setCredentialsVerified("Invalid password");
        // }
    };

    const handleUpdatePassword = async (event) => {

    };

    const checkForCorrectCredentials = async (event) => {
        event.preventDefault();
        try {
            const user = await Axios.get(`http://localhost:4000/users/getUser?id=${localStorage.currentUserID}`);

            const email = user.data.data.email;

            // console.log(email);

            const response = await Axios.get(`http://localhost:4000/users/login?email=${email}&password=${await encodePassword()}`);

            const verified = response.data.success;

            if (verified === true) {
                setCredentialsVerified("Verified");
                return true;
            }

            

        } catch (err) {
            // console.log(err);
            setCredentialsVerified("Invalid password");
            return false;
        }
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
                            <input type="text" className="input-field" value={firstName} onChange={(input) => setFirstName(input.target.value)} required />

                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="input-field" value={lastName} onChange={(textField) => setLastName(textField.target.value)} required />

                            <label htmlFor="email">Email</label>
                            <input type="email" className="input-field" value={email} onChange={(textField) => setEmail(textField.target.value)} required />

                            <label htmlFor="password">Password</label>
                            <button style={{ borderRadius: "7px", margin: "7px auto", width: "50%", backgroundColor: "gray" }} onClick={((event) => {
                                setShowChangePasswordModal(true);
                                event.preventDefault();
                            })}>Change Password</button>

                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" className="input-field" value={dateOfBirth} onChange={(textField) => setDateOfBirth(textField.target.value)} required />
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


            {/* for changing password */}
            <Modal show={showPasswordChangeModal} onHide={(() => {
                setShowChangePasswordModal(false);
                setCredentialsVerified("");
            })}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: "95px" }}>Password Change Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Enter password to start password change</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(inputField) => setPassword(inputField.target.value)} />
                        </Form.Group>
                    </Form>
                    <h4 style={{ textAlign: "center", marginTop: "50px" }}>{credentialsVerified}</h4>

                    <Button variant="primary" className="mx-auto d-block" onClick={checkForCorrectCredentials} disabled={password.length === 0}>
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



            {/* for updating account */}
            <Modal show={showUpdateModal} onHide={(() => {
                setShowChangePasswordModal(false);
                setCredentialsVerified("");
            })}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: "105px" }}>Update Account Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Enter password to finalize account changes</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(inputField) => setPassword(inputField.target.value)} />
                        </Form.Group>
                    </Form>
                    <h4 style={{ textAlign: "center", marginTop: "50px" }}>{credentialsVerified}</h4>

                    <Button variant="primary" className="mx-auto d-block" onClick={checkForCorrectCredentials} disabled={password.length === 0}>
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






            {/* for deleting account */}
            <Modal show={showDeletionModal} onHide={(() => {
                setShowChangePasswordModal(false);
                setCredentialsVerified("");
            })}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: "87px" }}>Delete Account Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Enter password to continue account deletion</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(inputField) => setPassword(inputField.target.value)} />
                        </Form.Group>
                    </Form>
                    <h4 style={{ textAlign: "center", marginTop: "50px" }}>{credentialsVerified}</h4>

                    <Button variant="primary" className="mx-auto d-block" onClick={checkForCorrectCredentials} disabled={password.length === 0}>
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
        </>
    );
}

export default Account;