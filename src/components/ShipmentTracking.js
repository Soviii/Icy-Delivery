import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios'
import { Table, Button, Row, Col} from 'react-bootstrap';

const ShipmentTracking = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const shipmentResponse = Axios.get("http://localhost:4000/orders/getAllOrders");
        const [ordersData] = await Promise.all([shipmentResponse]);
        const allOrders = [...ordersData.data.data];

        if (allOrders.length > 0) {
          setOrders(allOrders);
        }
      }
      catch (err) {
        console.log("Error recieving orders data", err.message);
      }
    }
    getAllOrders();
  }, []);

  const handleCompleteClicked = (orderID, index) => {
    Axios.patch(`http://localhost:4000/orders/updateOrderStatus?orderID=${orderID}&newStatus=Complete`)
    window.location.reload(false)
  }

  const handleCancelClicked = (orderID, index) => {
    Axios.patch(`http://localhost:4000/orders/updateOrderStatus?orderID=${orderID}&newStatus=Cancelled`)
    window.location.reload(false)
  }

  const handleUndoClick = (orderID) => {
    Axios.patch(`http://localhost:4000/orders/updateOrderStatus?orderID=${orderID}&newStatus=Pending`)
    window.location.reload(false)
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Shipment ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Order Date</th>
          <th>Shipping Date</th>
          <th>Status</th>
          <th colSpan="3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.shippingInfo.firstName}</td>
            <td>{order.shippingInfo.lastName}</td>
            <td>{order.orderDate}</td>
            <td>{order.shippingDate}</td>
            <td>{order.shippingStatus}</td>
            <td>
              <div>
                {
                  order.shippingStatus === 'Pending' && (
                    <Button
                      variant="success"
                      onClick={() =>
                        handleCompleteClicked(order._id, index)
                      }
                    >
                      Complete
                    </Button>
                  )}
              </div>
              <div>
                {
                  order.shippingStatus === 'Pending' && (
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleCancelClicked(order._id, index)
                      }
                    >
                      Cancel
                    </Button>
                  )}
              </div>
              <div>
                {
                  order.shippingStatus !== 'Pending' && (
                    <Button
                      onClick={() =>
                        handleUndoClick(order._id, index)
                      }
                    >
                      Undo
                    </Button>
                  )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ShipmentTracking;
