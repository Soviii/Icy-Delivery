import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import TroubleTickets from './components/TroubleTickets/TroubleTickets';
import Orders from './components/Orders';
import ShipmentTracking from './components//ShipmentTracking';
import InventoryManagement from './components/InventoryManagement';
import UnknownPage from './components/UnknownPage';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRouteUser/index';
import TicketConfirmation from './components/TroubleTickets/TicketConfirmation';
import TroubleTicketDetails from './components/TroubleTickets/TroubleTicketDetails';

function App() {
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
          } 
          />
          <Route path='/troubletickets' element={
          <PrivateRoute>
            <TroubleTickets />
          </PrivateRoute>
          } />
          <Route path='/orders' element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
          } />

          <Route path='/trouble-ticket-details' element={<TroubleTicketDetails />} />
          <Route path='/shipmenttracking' element={<ShipmentTracking />} />
          <Route path='/inventorymanagement' element={<InventoryManagement />} />
          <Route path='/ticket-confirmation' element={<TicketConfirmation />} />
          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
