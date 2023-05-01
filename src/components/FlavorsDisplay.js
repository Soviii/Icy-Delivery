import { React, useState, useEffect } from 'react';
import FlavorsDisplayCards from './FlavorsDisplayCards';
import Axios from "axios";
import { Row, Col } from 'react-bootstrap';
const FlavorsDisplay = () => {
    const [flavors, setFlavors] = useState([]);

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
    }, []);

    return (
        <>

            <Row>
                <h2 style={{ textAlign: 'center', padding: '20px' }}>Available Flavors</h2>
            </Row>
            <Row style={{ marginLeft: "60px", marginRight: "60px" }}>
                {/* immediately invoked function expression (IIFE) */}
                {(() => {
                    if (flavors.length === 0) {
                        return <p>No flavors in stock</p>;
                    } else {
                        return flavors.map((flavor) => (
                            <Col key={flavor.name}>
                                <FlavorsDisplayCards flavor={flavor} image={`.${flavor.imageURL}`}/>
                            </Col>
                        ));
                    }
                })()}
            </Row>
        </>
    )
}

export default FlavorsDisplay;