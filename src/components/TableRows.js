import React, { useState, useEffect } from 'react';
import FlavorModal from "./FlavorModal";

const TableRows = ({ rowsData, flavors, handleUpdateOrder, deleteTableRows, handleChange }) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFlavor, setSelectedFlavor] = useState("");
    const [currentQuantity, setQuantity] = useState(0);
    const [order, setOrder] = useState([]);

    const handleFlavorChoice = (flavor) => {
        setSelectedFlavor(flavor);
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const increaseQuantity = () => {
        setQuantity(currentQuantity + 1);
    }

    const decreaseQuantity = () => {
        if (currentQuantity > 0) {
            setQuantity(currentQuantity - 1);
        }
    }

    const handleAddToOrder = () => {
        const newOrder = [...order, {flavor: selectedFlavor, quantity: currentQuantity}];
        setOrder(newOrder);
        setSelectedFlavor("");
        setQuantity(0);
        handleUpdateOrder(newOrder);
    }
    
    const handleDeleteFromOrder = (index) => {
        const newOrder = [...order];
        newOrder.splice(index, 1);
        setOrder(newOrder);
        handleUpdateOrder(newOrder);
    }

    useEffect(() => {
        console.log(order);
    }, [order]);
    
    return (
        rowsData.map((index) => {
            return (
                <tr key={index}>
                    <td>
                        {isModalOpen && (
                        <FlavorModal
                        flavors={flavors}
                        onClose={toggleModal}
                        chooseFlavor={handleFlavorChoice}  />
                        )}
                        <input type="text"
                        value={selectedFlavor}
                        onClick={() => toggleModal()}
                        placeholder='Pick your favorite!'
                        name="flavor" className="form-control flav-submission" />
                    </td>
                    <td>
                        <button onClick={() => decreaseQuantity()} className="btn btn-secondary">
                            -
                        </button>
                        <p className="quantity">
                            {currentQuantity} {/* Quantity of ice creams in cart */}
                        </p>
                        <button onClick={() => increaseQuantity()} className="btn btn-secondary">
                            +
                        </button>
                    </td>
                    <button className="btn btn-outline-danger" onClick={() => {(handleDeleteFromOrder(index))}}>x</button>
                    <button className="btn btn-outline-primary" onClick={() => handleAddToOrder(selectedFlavor, currentQuantity)}>Add to Order</button>
                </tr>
            )
        })

    )

}

export default TableRows;