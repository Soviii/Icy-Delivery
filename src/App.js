import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TroubleTickets from './components/TroubleTickets';
import Orders from './components/Orders';
import ShipmentTracking from './components//ShipmentTracking'
import InventoryManagement from './components/InventoryManagement'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/troubletickets' element={<TroubleTickets />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/shipmenttracking' element={<ShipmentTracking />} />
          <Route path='/inventorymanagement' element={<InventoryManagement />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
