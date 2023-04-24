import React from 'react';
import "./FlavorModal.css";

function displayFlavors() {
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

    return (
        <div className="modalBackdrop">
            <div className="modalContainer">
                <h3 className="modalTitle">Flavors</h3>
                <ul className="flavors row">
                    {flavors.map((flavor, i) => (
                        <li key={i} className="flavor col-4">
                            <div className="flav-container row">
                                <h4 className="flavor-title row">{flavor.name}</h4>
                                <img
                                    src={require(`../assets/flavors/${flavor.imageURL}.jpg`)}
                                    alt={flavor.name}
                                    className="images row"
                                />
                                <p className="description row">
                                    {flavor.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )

}

export default displayFlavors;