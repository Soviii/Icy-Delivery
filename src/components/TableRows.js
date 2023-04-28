// import React, { useState, useEffect } from 'react';
// import FlavorDropdown from "./FlavorDropdown";
// import axios from 'axios';

// const TableRows = ({ rowsData, handleUpdateOrder, deleteTableRows, handleChange }) => {

//     const [selectedFlavor, setSelectedFlavor] = useState("");
//     const [currentQuantity, setQuantity] = useState(0);
//     const [order, setOrder] = useState([]);
//     const [flavors, setFlavors] = useState([]);

//     const handleAddToOrder = () => {
//         if (selectedFlavor && currentQuantity > 0) {
//             const newOrder = [...order, {flavor: selectedFlavor, quantity: currentQuantity}];
//             setOrder(newOrder);
//             setSelectedFlavor("");
//             setQuantity(0);
//             handleUpdateOrder(newOrder);
//         } else {
//             window.alert("Please select a flavor and a number of units.")
//         }
//     }
    
//     const handleDeleteFromOrder = (index) => {
//         const newOrder = [...order];
//         newOrder.splice(index, 1);
//         setOrder(newOrder);
//         handleUpdateOrder(newOrder);
//     }

//     const handleSelectChange = (event) => {
//         setSelectedFlavor(event.target.value);
//     };

//     const handleQuantityChange = (event) => {
//         const newQuantity = parseInt(event.target.value);
//         setQuantity(newQuantity)
//     }

//     useEffect(() => {
//         const fetchFlavors = async () => {
//           try {
//             const response = await axios.get('http://localhost:4000/flavors/getFlavors');
//             setFlavors(response.data.data);
//           } catch (error) {
//             console.error('Error fetching flavors:', error);
//           }
//         };
    
//         fetchFlavors();
//       }, []);
    
//     return (
//         rowsData.map((data, index) => {
//             const { flavor, quantity} = data;
//             return (
//                 <tr key={index}>
//                     <td>
//                         <div>
//                         <FlavorDropdown
//                         flavors={flavors}
//                         handleSelectChange={handleSelectChange}
//                         handleAddToOrder={handleAddToOrder}
//                         />
//                         </div>
//                     </td>
//                     <td>
//                         <input
//                             type="number"
//                             placeholder="Enter number of units"
//                             name="quantity"
//                             className="form-control"
//                             onChange={handleQuantityChange}
//                         />
//                     </td>
//                     <td>
//                     {/* <button className="btn btn-outline-danger" onClick={() => {(handleDeleteRow(index))}}>x</button> */}
//                     </td>
//                     <button className="btn btn-outline-primary" onClick={() => handleAddToOrder(selectedFlavor, currentQuantity)}>Add to Order</button>
//                 </tr>
//             )
//         })

//     )

// }

// export default TableRows;




  // return (
  //   <div className='orders'>
  //     <div className='child'>
  //       <p className='shippingaddressheader'>Shipping Address</p>
  //       <Form>
  //         <Form.Group size="lg" controlId="email">
  //           <Form.Label>Email</Form.Label>
  //           <Form.Control
  //             autoFocus
  //             type="email"
  //             value={shippingEmail}
  //             onChange={(e) => setShippingEmail(e.target.value)}
  //           />
  //         </Form.Group>
  //         <Form.Group size="lg" controlId="firstName">
  //           <Form.Label>First Name</Form.Label>
  //           <Form.Control
  //             autoFocus
  //             type="firstName"
  //             value={shippingFirstName}
  //             onChange={(e) => setShippingFirstName(e.target.value)}
  //           />
  //         </Form.Group>
  //         <Form.Group size="lg" controlId="lastName">
  //           <Form.Label>Last Name</Form.Label>
  //           <Form.Control
  //             autoFocus
  //             type="lastName"
  //             value={shippingLastName}
  //             onChange={(e) => setShippingLastName(e.target.value)}
  //           />
  //         </Form.Group>
  //         <Form.Group size="lg" controlId="address">
  //           <Form.Label>Address</Form.Label>
  //           <Form.Control
  //             autoFocus
  //             type="address"
  //             value={shippingAddress}
  //             onChange={(e) => setShippingAddress(e.target.value)}
  //           />
  //         </Form.Group>
  //         <Form.Group size="lg" controlId="city">
  //           <Form.Label>City</Form.Label>
  //           <Form.Control
  //             autoFocus
  //             type="city"
  //             value={shippingCity}
  //             onChange={(e) => setShippingCity(e.target.value)}
  //           />
  //         </Form.Group>
  //         <Form.Group size="lg" controlId="state">
  //           <Form.Label>State</Form.Label>
  //           <Form.Control
  //             autoFocus
  //             type="state"
  //             value={shippingState}
  //             onChange={(e) => setShippingState(e.target.value)}
  //           />
  //         </Form.Group>
  //         <Form.Group size="lg" controlId="zip">
  //           <Form.Label>Address</Form.Label>
  //           <Form.Control
  //             autoFocus
  //             type="zip"
  //             value={shippingZip}
  //             onChange={(e) => setShippingZip(e.target.value)}
  //           />
  //           <Form.Group size="lg" controlId="Country">
  //             <Form.Label>Country</Form.Label>
  //             <Form.Control
  //               autoFocus
  //               type="state"
  //               value={shippingCountry}
  //               onChange={(e) => setShippingCountry(e.target.value)}
  //             />
  //           </Form.Group>
  //         </Form.Group>
  //         <Form.Check
  //           type='switch'
  //           id='custome-switch'
  //           label='Use Default Information'
  //           onChange={handleCheckBoxChange}
  //         />
  //       </Form>
  //       <div className="button">
  //         <button type="submit" className="btn btn-primary">Checkout</button>
  //       </div>
  //     </div>
  // );