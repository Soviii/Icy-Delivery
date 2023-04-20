import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import TroubleTickets from './components/TroubleTickets';
import Orders from './components/Orders';
import ShipmentTracking from './components//ShipmentTracking';
import InventoryManagement from './components/InventoryManagement';
import UnknownPage from './components/UnknownPage';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' exact element={<Home />} />
          <Route path='/troubletickets' element={<TroubleTickets />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/shipmenttracking' element={<ShipmentTracking />} />
          <Route path='/inventorymanagement' element={<InventoryManagement />} />
          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
