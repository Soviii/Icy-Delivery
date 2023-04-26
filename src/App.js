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
import CreateAccount from './components/CreateAccount';
import PrivateRoute from './components/PrivateRouteUser/index';


function App() {
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* home page should be accessible regardless of being logged in or not */}
          <Route path='/' exact element={<Home />} />

          <Route path='/login' element={
            <PrivateRoute pageToLoad={"login"}>
              <Login />
            </PrivateRoute>
          } />

          <Route path='/logout' element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          } />

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


          <Route path='/create-account' element={
            <PrivateRoute pageToLoad={"create-account"}>
              <CreateAccount />
            </PrivateRoute>
          } />


          {/* for admin access */}
          <Route path='/shipmenttracking' element={<ShipmentTracking />} />
          <Route path='/inventorymanagement' element={<InventoryManagement />} />

          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
