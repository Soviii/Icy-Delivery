import React, { useState } from 'react';
import "./FlavorModal.css";

const FlavorModal = ({ onClose, chooseFlavor, flavors }) => {

    const [selectedFlavor, setSelectedFlavor] = useState("");

    const handleSelectedFlav = (flavor) => {
        setSelectedFlavor(flavor);
    }

    const handleSubmit = () => {
        chooseFlavor(selectedFlavor);
        onClose();
    }

    return (
        <div className="modalBackdrop">
            <div className="modalContainer">
                <h3 className="modalTitle">Choose Your Flavor</h3>
                <ul className="flavors row">
                    {flavors.map((flavor, index) => (
                        <li key={index} className="flavor col-4">
                            <button onClick={() => handleSelectedFlav(flavor.name)} className="flav-container row">
                                <h4 className="flavor-title row">{flavor.name}</h4>
                                    <img
                                        className="images"
                                        src={require(`../assets/flavors/${flavor.imageURL}.jpg`)}
                                        alt={flavor.name}
                                    />
                                <p className="description row">
                                    {flavor.description}
                                </p>
                            </button>
                        </li>
                    ))}
                </ul>
                <button className="cancel btn btn-danger" onClick={onClose}>Cancel</button>
                <button className="submit btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>

    )

}

export default FlavorModal;