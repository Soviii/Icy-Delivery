import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios'
import { Table, Form, Button } from 'react-bootstrap';

const InventoryManagement = () => {
  const [flavors, setFlavors] = useState([]);
  const [initialFlavorsData, setInitialFlavorsData] = useState([]);
  
  useEffect(() => {
    const getAllFlavors = async () => {
      try {
        const flavorsResponse = Axios.get('http://localhost:4000/flavors/getFlavors');
        const [flavorsData] = await Promise.all([flavorsResponse]);
        const allFlavors = [...flavorsData.data.data]
        if (allFlavors.length > 0) {
          setFlavors(allFlavors);
          setInitialFlavorsData(allFlavors);
        }
      }
      catch (err) {
        console.log("Error reciving flavors data", err.message);
      }
    }
    getAllFlavors();
  }, []);

  // Event handler to update inventory quantity
  const handleUpdateQuantity = (flavorName, quantity) => {
    const updatedFlavors = flavors.map((flavor) => {
      if (flavor.name === flavorName) {
        console.log(quantity);
        return { ...flavor, quantity };
      }
      return flavor;
    });
    setFlavors(updatedFlavors);
  };

  const handleUndoAllChanges = () => {
    //response = Axios.patch('http://localhost:4000/flavors/updateFlavorInventory?name=Vanilla&quantity=1000&operation=change')
    setFlavors(initialFlavorsData);
  }
  const handleSubmitAllChanges = () => {
    flavors.forEach(flavor => {
      Axios.patch(`http://localhost:4000/flavors/updateFlavorInventory?name=${flavor.name}&quantity=${flavor.quantity}&operation=change`);
    });
    alert("Changes have been submitted")
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity Available</th>
          </tr>
        </thead>
        <tbody>
          {flavors.map((flavor, name) => (
            <tr key={name}>
              <td>{flavor.name}</td>
              <td>{flavor.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
        <Form.Group controlId="flavorName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control as="select">
            {flavors.map((flavor) => (
              <option key={flavor.name}>{flavor.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="newQuantity">
          <Form.Label>New Quantity</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Button
          variant="primary"
          onClick={() =>
            handleUpdateQuantity(
              document.getElementById('flavorName').value,
              parseInt(document.getElementById('newQuantity').value)
            )
          }
        >
          Update Quantity
        </Button>
      </Form>
      <Button
        variant="warning"
        onClick={() => 
          handleUndoAllChanges()
        }
      >
      Undo All Changes
      </Button>
      <Button
        variant="danger"
        onClick={() => 
          handleSubmitAllChanges()
        }
      >
      Submit All Changes
      </Button>
    </div>
  );
};

export default InventoryManagement;
