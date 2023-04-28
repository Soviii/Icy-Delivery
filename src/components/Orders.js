import { useState, useEffect } from 'react';
import Axios from 'axios';
import Form from "react-bootstrap/Form";
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
  const [checked, setChecked] = useState(true);

  const [flavors, setFlavors] = useState([]);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [orders, setOrders] = useState([]);
  const [showShipping, setShowShipping] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(false);

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
    return shippingDate.toISOString().split('T')[0];
  };

  const addToOrder = () => {
    if (quantity > 0 && selectedFlavor !== '') {
      const shippingDate = new Date();
      shippingDate.setDate(shippingDate.getDate() + 14);

      const order = {
        flavor: selectedFlavor,
        quantity: quantity,
        cost: 50,
        shippingDate: shippingDate.toLocaleDateString(),
      };

      setOrders([...orders, order]);

      // Reset form values
      setSelectedFlavor('');
      setQuantity(0);
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
      <div className='orders'>
        <div className='child'>
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
              <button className="btn btn-primary" onClick={handleReviewOrder}>Review Order</button>
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
      <div className='orders'>
        <div className='child'>
          <div className='order-summary'>
            <h3>Orders:</h3>
            <ul>
              {orders.map((order, index) => (
                <li key={index}>
                  <p>Flavor: {order.flavor}</p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Cost: ${order.quantity * 30}</p>
                  <p>Shipping Date: {order.shippingDate}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className='shipping-details'>
            <h3>Shipping Details:</h3>
            <p>Email: {shippingEmail}</p>
            <p>First Name: {shippingFirstName}</p>
            <p>Last Name: {shippingLastName}</p>
            <p>Address: {shippingAddress}</p>
            <p>City: {shippingCity}</p>
            <p>State: {shippingState}</p>
            <p>Zip: {shippingZip}</p>
            <p>Country: {shippingCountry}</p>
            <p>Total: ${calculateTotal()}</p>
            <p>Estimated Shipping Date: {calculateShippingDate()}</p>
            <div className="button">
              <button type="submit" className="btn btn-primary" onClick={createOrder}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div>
      <h2>Ice Cream Order Form</h2>
      <table>
        <thead>
          <tr>
            <th>Flavor</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Est. Shipping Date</th>
          </tr>
        </thead>
        <tbody>
        <tr className="order-selection">
          <td>
            <select value={selectedFlavor} onChange={(e) => setSelectedFlavor(e.target.value)}>
              <option value="">Select a flavor</option>
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
              placeholder="0"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </td>
          <td className="auto-cost">${quantity * 30}</td>
          <td className="auto-date"></td>
          <td>
            <button onClick={addToOrder}>Add to Order</button>
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
              <button onClick={() => removeOrder(index)}>Remove</button>
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan="2">Shipping Costs:</td>
          <td colSpan="2">${calculateShippingCost()}</td>
        </tr>
        <tr>
          <td colSpan="2">Total:</td>
          <td colSpan="2">${calculateTotal()}</td>
        </tr>
        </tbody>
      </table>
      <div>
        <button className="btn btn-primary" onClick={handleGoToShipping}>Go to Shipping Details</button>
      </div>
    </div>
  );
}

export default Orders;
