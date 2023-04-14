import {useState, useEffect} from 'react';
import Axios from 'axios';
import Form from "react-bootstrap/Form";

function Orders() {

  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingFirstName, setShippingFirstName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [checked, setChecked] = useState(true);

  const loggedInUserID = localStorage.currentUserID
  
  useEffect(() => {
    Axios.get(`http://localhost:4000/users/getUser?id=${loggedInUserID}`).then((response) => {
      setCurrentUser(response.data); 
      setLoading(false);
    });
  }, []);

  if (isLoading){
    return <div className='orders'>Please Log In</div>;
  }

  const handleChange = () => {
    setChecked(!checked)
    if(checked){
      setShippingAddress(currentUser.data.address.street);
      setShippingState(currentUser.data.address.state);
      setShippingZip(currentUser.data.address.zip);
      setShippingCity(currentUser.data.city);
      setShippingEmail(currentUser.data.email);
      setShippingFirstName(currentUser.data.firstName);
      setShippingLastName(currentUser.data.lastName);
    }
    else{
      setShippingAddress("");
      setShippingState("");
      setShippingZip("");
      setShippingEmail("");
      setShippingFirstName("");
    }
  }
  return (
  <div className='orders'>
  <Form>
    <Form.Group size="lg" controlId="email">
        <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={shippingEmail}
            onChange={(e) => setShippingEmail(e.target.value)}
          />
    </Form.Group>
    <Form.Group size="lg" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            autoFocus
            type="firstName"
            value={shippingFirstName}
            onChange={(e) => setShippingFirstName(e.target.value)}
          />
    </Form.Group>
    <Form.Group size="lg" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            autoFocus
            type="lastName"
            value={shippingLastName}
            onChange={(e) => setShippingLastName(e.target.value)}
          />
    </Form.Group>
    <Form.Group size="lg" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            autoFocus
            type="address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
    </Form.Group>
    <Form.Group size="lg" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            autoFocus
            type="city"
            value={shippingCity}
            onChange={(e) => setShippingCity(e.target.value)}
          />
    </Form.Group>
    <Form.Group size="lg" controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            autoFocus
            type="state"
            value={shippingState}
            onChange={(e) => setShippingState(e.target.value)}
          />
    </Form.Group>
    <Form.Group size="lg" controlId="zip">
          <Form.Label>Address</Form.Label>
          <Form.Control
            autoFocus
            type="zip"
            value={shippingZip}
            onChange={(e) => setShippingZip(e.target.value)}
          />
    </Form.Group>
    <Form.Check
      type='switch'
      id='custome-switch'
      label='Use Default Information'
      onChange={handleChange}
      />
  <div className="col-12">
    <button type="submit" class="btn btn-primary">Checkout</button>
  </div>
</Form>
</div>
  );
}

export default Orders;
