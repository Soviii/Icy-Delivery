import { useState, useEffect } from 'react';
import Axios from 'axios';
import Form from "react-bootstrap/Form";
import FlavorModal from "./FlavorModal";
import TableRows from "./TableRows";
import "./Orders.css"
import Login from './Login';

const Orders = () => {

  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingFirstName, setShippingFirstName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [rowsData, setRowsData] = useState([]);
  const [checked, setChecked] = useState(true);
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [currentQuantity, setQuantity] = useState(0);
  const [newOrder, setNewOrder] = useState([]);

  const loggedInUserID = localStorage.currentUserID;

  var flavors = [
    {
        name: "Butter Pecan",
        description: "Butter-flavored vanilla ice cream and chopped, toasted pecans.",
        imageURL: "butter pecan"
    },
    {
        name: "Chocolate Chip",
        description: "Classic vanilla with chocolate chips.",
        imageURL: "chocolate chip"
    },
    {
        name: "Chocolate",
        description: "Classic chocolate.",
        imageURL: "chocolate"
    },
    {
        name: "Mint Chocolate Chip",
        description: "Cool and refreshing mint with chocolate chips mixed in.",
        imageURL: "mint chocolate chip"
    },
    {
        name: "Neopolitan",
        description: "A blend of vanilla, chocolate, and strawberry.",
        imageURL: "neopolitan"
    },
    {
        name: "Rocky Road",
        description: "Rich chocolate ice cream with nuts and marshmallows blended in.",
        imageURL: "rocky road"
    },
    {
        name: "Strawberry",
        description: "Classic strawberry.",
        imageURL: "strawberry"
    },
    {
        name: "Ube",
        description: "A sweet, nutty, and slightly floral taste.",
        imageURL: "ube"
    },
    {
        name: "Vanilla",
        description: "Good old classic vanilla.",
        imageURL: "vanilla"
    }
]

  useEffect(() => {
    Axios.get(`http://localhost:4000/users/getUser?id=${loggedInUserID}`).then((response) => {
      setCurrentUser(response.data);
      setLoading(false);
    });
  }, [setCurrentUser]);

  if (isLoading) {
    return (
      <div className='orders'>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>Please Log In</h2>
      </div>
    );
  }

  const handleCheckBoxChange = () => {
    setChecked(!checked)
    if (checked) {
      setShippingAddress(currentUser.data.address.street);
      setShippingState(currentUser.data.address.state);
      setShippingZip(currentUser.data.address.zip);
      setShippingCity(currentUser.data.address.city);
      setShippingEmail(currentUser.data.email);
      setShippingFirstName(currentUser.data.firstName);
      setShippingLastName(currentUser.data.lastName);
      setShippingCountry(currentUser.data.address.country);
    }
    else {
      setShippingAddress("");
      setShippingState("");
      setShippingZip("");
      setShippingEmail("");
      setShippingCity("");
      setShippingFirstName("");
      setShippingLastName("");
      setShippingCountry("");
    }
  }

  const addTableRows = () => {
    setSelectedFlavor("");
    setQuantity(0);

    const rowsInput = {
      flavor: '',
      quantity: ''
    }
    setRowsData([...rowsData, rowsInput])
  }

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  }

  const handleTableSubmit = (index, evnt) => {
    const {name, value} = evnt.target;
    console.log(name);
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  }

  const handleUpdateOrder = (newOrder) => {
    console.log(newOrder);
    setNewOrder(newOrder);
  };

  return (
    <div className='orders'>
      {/* <div className='child'>
        <p className='shippingaddressheader'>Shipping Address</p>
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
            <Form.Group size="lg" controlId="Country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                autoFocus
                type="state"
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
              />
            </Form.Group>
          </Form.Group>
          <Form.Check
            type='switch'
            id='custome-switch'
            label='Use Default Information'
            onChange={handleCheckBoxChange}
          />
        </Form>
        <div className="button">
          <button type="submit" className="btn btn-primary">Checkout</button>
        </div>
      </div> */}

      <div className='child'>
        <p className="orderformheader">Order Form</p>
        <div className="row">
          <div className="col-2"></div>
            <div className="col-8">
              <table className="table">
                <thead>
                  <tr>
                    <th>Flavor</th>
                    <th>Quantity</th>
                    <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                  </tr>
                </thead>
                <tbody>
                  <div className="orders-container">
                  {newOrder.map((item, index) => (
    <div key={index}>
      <h4>{item.flavor}</h4>
      <p>{item.quantity}</p>
    </div>
  ))}
                  </div>
                  <TableRows 
                    handleUpdateOrder={handleUpdateOrder}
                    flavors={flavors}
                    rowsData={rowsData}
                    deleteTableRows={deleteTableRows}
                    handleChange={handleTableSubmit}
                  />
                </tbody>
              </table>
            </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>

  );
}

export default Orders;
