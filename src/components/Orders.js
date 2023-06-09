import { useState, useEffect } from 'react';
import Axios from 'axios';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./Orders.css"
import FlavorsDisplay from "./FlavorsDisplay";
const Orders = () => {

  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingFirstName, setShippingFirstName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [password, setPassword] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [checked, setChecked] = useState(true);
  const [flavors, setFlavors] = useState([]);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [orders, setOrders] = useState([]);
  const [showShipping, setShowShipping] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderAdded, setOrderAdded] = useState(false);
  const [shippingFilled, setShippingFilled] = useState(false);

  const loggedInUserID = localStorage.currentUserID;

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
      setShippingFilled(true);
      setPassword(currentUser.data.password);
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

  const handleGoToShipping = () => {
    setShowShipping(true);
  };

  const handleReviewOrder = (e) => {
    e.preventDefault();
    setReviewOrder(true);
    setShowShipping(false);
  };

  const calculateShippingDate = () => {
    const today = new Date();
    const shippingDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = shippingDate.toLocaleDateString(undefined, options);
  
    return formattedDate;
  };

  const addToOrder = () => {
    if (quantity > 0 && selectedFlavor !== '') {
      const shippingDate = calculateShippingDate();

      const order = {
        flavor: selectedFlavor,
        quantity: quantity,
        cost: 50,
        shippingDate: shippingDate,
      };

      setOrders([...orders, order]);

      // Reset form values
      setSelectedFlavor('');
      setQuantity(0);
      setOrderAdded(true);
    }
  };

  console.log('orders:', orders);

  const removeOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };

  const calculateShippingCost = () => {
    const totalQuantity = orders.reduce((sum, order) => sum + order.quantity, 0);
    const shippingCosts = Math.floor(totalQuantity / 10) * 5;
    return shippingCosts;
  };
  
  const calculateTotal = () => {
    const totalCost = orders.reduce((sum, order) => sum + order.quantity * 30, 0);
    const shippingCosts = calculateShippingCost();
    const totalAmount = totalCost + shippingCosts;
    return totalAmount;
  };

  const createOrder = async () => {
    const order = {
      customerID: loggedInUserID,
      items: orders.map(order => ({
        name: order.flavor,
        quantity: order.quantity,
        cost: order.quantity * 30
      })),
      shippingStatus: "Pending",
      shippingDate: calculateShippingDate(),
      shippingInfo: {
        firstName: shippingFirstName,
        lastName: shippingLastName,
        street: shippingAddress,
        city: shippingCity,
        state: shippingState,
        zip: shippingZip,
        country: shippingCountry
      }
    };

    try {
      const response = await Axios.post("http://localhost:4000/orders/createOrder", order);
      console.log("Order created:", response.data);
      setReviewOrder(false);
      setShowModal(true);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        const response = await Axios.get('http://localhost:4000/flavors/getFlavors');
        setFlavors(response.data.data);
      } catch (error) {
        console.error('Error fetching flavors:', error);
      }
    };
  
    fetchFlavors();
  
    Axios.get(`http://localhost:4000/users/getUser?id=${loggedInUserID}`).then((response) => {
      setCurrentUser(response.data);
      setLoading(false);
      // const calculatedDate = calculateShippingDate();
      // setShippingDate(calculatedDate);
    });
  }, [loggedInUserID, setCurrentUser]);

  if (isLoading) {
    return (
      <div className='orders'>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>Please Log In</h2>
      </div>
    );
  }

  if (showShipping) {
    return (
      <div className='orders' style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='child'style={{ width: '40%' }}>
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
            <div className="button">
              <button className="btn btn-primary" disabled={!shippingFilled} onClick={handleReviewOrder}>Review Order</button>
            </div>
          </Form>
          <div className="button">
          <button className="btn btn-secondary" onClick={() => setShowShipping(false)}>Go Back</button>
        </div>
        </div>
      </div>
    );
  }

  if (reviewOrder) {
    return (
      <div className='container'>
        <div className='child'>
            <h5 className="confirm-title">Review Order</h5>
            <div className='order-summary'>
            <table className="table">
              <thead>
                <tr>
                  <th>Flavor</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.flavor}</td>
                    <td>{order.quantity}</td>
                    <td>${order.quantity * 30}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className='shipping-details'>
              <h3 className="confirm-title">Shipping Details</h3>
                <p className="shipping">{shippingFirstName} {shippingLastName}</p>
                <p className="shipping">{shippingAddress}</p>
                <p className="shipping">{shippingCity}, {shippingState}, {shippingZip}, {shippingCountry}</p>
                <p className="shipping">Total: ${calculateTotal()}</p>
                <p className="shipping">Estimated Shipping Date: {calculateShippingDate()}</p>
                <p className="shipping">{shippingEmail}</p>
            </div>
            <div className="button">
              <button type="submit" className="btn btn-primary" onClick={createOrder}>Place Order</button>
            </div>
          </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="main-title">Ice Cream Order Form</h2>
      <div className="centered-container">
        <table class="table order-form-table">
          <thead>
            <tr>
              <th scope="col">Flavor</th>
              <th scope="col">Quantity</th>
              <th scope="col">Cost</th>
              <th scope="col">Est. Shipping Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          <tr className="order-selection">
            <td>
              <select className="btn btn-outline-secondary dropdown-toggle" value={selectedFlavor} onChange={(e) => setSelectedFlavor(e.target.value)}>
                <option value="" disabled selected>Select a Flavor</option>
                {flavors.map((flavor) => (
                  <option key={flavor.id} value={flavor.name}>
                    {flavor.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="number"
                min={0}
                value={quantity}
                class="form-control"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </td>
            <td className="auto-cost">${quantity * 30}</td>
            <td className="auto-date"></td>
            <td>
              <button className="btn btn-primary" onClick={addToOrder}>Add to Order</button>
            </td>
          </tr>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>
                <p>{order.flavor}</p>
              </td>
              <td>
                <p>{order.quantity}</p>
              </td>
              <td>
                <p>${order.quantity * 30}</p>
              </td>
              <td>
                <p>{order.shippingDate}</p>
              </td>
              <td>
                <button className="btn btn-outline-danger" onClick={() => removeOrder(index)}>Remove</button>
              </td>
            </tr>
          ))}

          <tr className="no-border">
            <td colSpan="2"></td>
            <td colSpan="2">Shipping Costs:</td>
            <td colSpan="2">${calculateShippingCost()}</td>
          </tr>
          <tr className="no-border">
            <td colSpan="2"></td>
            <td colSpan="2">Total:</td>
            <td colSpan="2">${calculateTotal()}</td>
          </tr>
          </tbody>
          <div className="ship-btn">
              <button className="ship-btn btn btn-primary" disabled={!orderAdded} onClick={handleGoToShipping}>Go to Shipping Details</button>
          </div>
        </table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
          <p className="confirm">Order Confirmation</p>
        <Modal.Body>
          <p>Your order has been placed!</p>
          <h5 className="confirm-title">Order Details</h5>
          <div className='order-summary'>
          <table className="table">
            <thead>
              <tr>
                <th>Flavor</th>
                <th>Quantity</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.flavor}</td>
                  <td>{order.quantity}</td>
                  <td>${order.quantity * 30}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className='shipping-details'>
            <h3 className="confirm-title">Shipping Details</h3>
              <p className="shipping">{shippingFirstName} {shippingLastName}</p>
              <p className="shipping">{shippingAddress}</p>
              <p className="shipping">{shippingCity}, {shippingState}, {shippingZip}, {shippingCountry}</p>
              <p className="shipping">Total: ${calculateTotal()}</p>
              <p className="shipping">Estimated Shipping Date: {calculateShippingDate()}</p>
              <p className="shipping">{shippingEmail}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => {setShowModal(false); window.location.reload();}}>Close</button>
        </Modal.Footer>
      </Modal>
      <FlavorsDisplay />
    </div>
  );
}

export default Orders;
