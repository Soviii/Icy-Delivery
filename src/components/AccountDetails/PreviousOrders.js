import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";

const PreviousOrders = () => {
    const [previousOrders, setPreviousOrders] = useState([]);
    const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);

    const [selectedOrderID, setSelectedOrderID] = useState("");
    const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
    const [selectedOrderDate, setSelectedOrderDate] = useState("");
    const [selectedOrderExpectedDate, setSelectedOrderExpectedDate] = useState("");
    const [selectedOrderItems, setSelectedOrderItems] = useState([]);
    const [selectedOrderTotalPrice, setSelectedOrderTotalPrice] = useState(0);
    const [selectedOrderShippingInfo, setSelectedOrderShippingInfo] = useState({});

    const [cancellationSuccessful, setCancellationSuccessful] = useState(false);

    useEffect(() => {
        const getUserPreviousOrders = async () => {
            try {
                await setPreviousOrders([]);
                const response = await Axios.get(`http://localhost:4000/orders/getOrdersByCustomerID?customerID=${localStorage.currentUserID}`);

                // console.log(response.data.data);
                setPreviousOrders([...previousOrders, ...response.data.data]);
                console.log(previousOrders);

            } catch (err) {
                console.log(err.message);
            }
        }

        getUserPreviousOrders();
    }, []);

    const handleCloseViewOptions = () => {
        setShowOrderDetailsModal(false);
    }

    const handleOpenViewOptionsModal = (order) => {
        setShowOrderDetailsModal(true);
        setSelectedOrderID(order._id);
        setSelectedOrderDate(order.orderDate);
        setSelectedOrderStatus(order.shippingStatus);
        setSelectedOrderExpectedDate(order.shippingDate);
        setSelectedOrderItems([...order.items]);
        setSelectedOrderTotalPrice(calculateTotalPrice(order));
        setSelectedOrderShippingInfo(order.shippingInfo);

    }


    const calculateTotalPrice = (order) => {
        let total = 0;
        for (let i = 0; i < order.items.length; i++) {
            total += order.items[i].cost;
        }
        return total;
    }

    const handleCancelOrder = async () => {
        try {
            const newInfo = {
                customerID: `${localStorage.currentUserID}`,
                items: selectedOrderItems,
                shippingStatus: "Cancelled",
                shippingDate: selectedOrderExpectedDate,
                orderDate: selectedOrderDate,
                shippingInfo: selectedOrderShippingInfo
            }
            const response = await Axios.patch(`http://localhost:4000/orders/updateOrder?orderID=${selectedOrderID}`, newInfo);
            setCancellationSuccessful(true);
            setSelectedOrderID("");
            setSelectedOrderStatus("");
            setSelectedOrderDate("");
            setSelectedOrderExpectedDate("");
            setSelectedOrderItems([]);
            setSelectedOrderTotalPrice("");
            setSelectedOrderShippingInfo("");


            setTimeout(() => {
                window.location.reload();
            }, 1400);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <h2 style={{ textAlign: "center", marginTop: "100px" }}>Previous Orders</h2>
            <div>
                <Table striped bordered hover style={{ tableLayout: 'fixed' }}>
                    <colgroup>
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Status</th>
                            <th>Order Expected Date</th>
                            <th>Items</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {previousOrders.map((order, _) => (
                            <tr key={_}>
                                <td>{order._id}</td>
                                <td>{order.shippingStatus}</td>
                                <td>{order.shippingDate}</td>
                                <td style={{ whiteSpace: "pre-wrap" }}>
                                    {order.items.map((item) => (
                                        `${item.name}: ${item.quantity}, \$${item.cost}\n`
                                    )).join('')}
                                    {"\n"}Total Cost: ${calculateTotalPrice(order)}
                                </td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleOpenViewOptionsModal(order)}>
                                        View Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>


            <Modal show={showOrderDetailsModal} onHide={handleCloseViewOptions}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: "168px" }}>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!cancellationSuccessful && (
                        <>
                            <p style={{ whiteSpace: "pre-wrap" }}>ID: {selectedOrderID} {"\n\n"}</p>
                            <p>{selectedOrderStatus}</p>
                            <p>Order Date: {selectedOrderDate.slice(0, 10)}</p>
                            <p>Expected Shipping Date: {selectedOrderExpectedDate}</p>
                            <p style={{ whiteSpace: "pre-wrap" }}>{"\n\n"}Shipping Info</p>
                            <p>{selectedOrderShippingInfo.firstName} {selectedOrderShippingInfo.lastName}</p>
                            <p>{selectedOrderShippingInfo.street}, {selectedOrderShippingInfo.city}, {selectedOrderShippingInfo.state}, {selectedOrderShippingInfo.zip} {selectedOrderShippingInfo.country} </p>
                            <p style={{ whiteSpace: "pre-wrap" }}>{"\n\n"}{selectedOrderItems.map((item) => (
                                `${item.name}: ${item.quantity}, \$${item.cost}\n`
                            )).join('')}</p>
                            <p>Total Cost: {selectedOrderTotalPrice}</p>
                        </>
                    )}
                    {cancellationSuccessful && (
                        <p>Cancelled order, refreshing page...</p>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewOptions}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleCancelOrder} disabled={selectedOrderStatus === "Cancelled" ? true : false}>
                        Cancel Order
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default PreviousOrders;