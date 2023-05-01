import React from "react";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import images from "../assets/flavors/flavorImages";
import { Modal } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";


const FlavorsDisplayCards = ({ flavor, image }) => {
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    return (
        <>
            <Card style={{ width: "20rem", marginBottom: "60px" }}>
                <Card.Title className="mx-auto" style={{ marginTop: "20px" }}>{flavor.name}</Card.Title>
                <Card.Body>
                    <Card.Img style={{ borderRadius: "10px" }}src={images[flavor.name]} alt={image} />
                    {/* <p>{img}</p> */}
                </Card.Body>
                <Card.Footer>
                    <Button className="mx-auto d-block" variant="primary" onClick={() => setShowDetailsModal(true)}>View Details</Button>

                </Card.Footer>
            </Card>


            <Modal size="xl" show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                <Modal.Header>
                    <h2 style={{ textAlign: "center", margin: "0 auto" }}>{flavor.name}</h2>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontFamily: "Tahoma", fontSize: "24px" }}>{flavor.description}</p>
                    <img  src={images[flavor.name]} alt={flavor.name} style={{ width: "100%", borderRadius: "20px" }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FlavorsDisplayCards;
