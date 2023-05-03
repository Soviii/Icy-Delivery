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
import Account from './components/AccountDetails/Account';
import AdminLogin from './components/AdminComponents/AdminLogin';
import TroubleTicketManagement from './components/AdminComponents/TroubleTicketManagement';
import PreviousOrders from './components/AccountDetails/PreviousOrders';

function App() {
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* home page should be accessible regardless of being logged in or not */}
          <Route path='/' exact element={<Home />} />

          <Route path='/admin-IcyDel-login' element={
            <PrivateRoute admin='true' pageToLoad='admin-IcyDel-login'>
              <AdminLogin />
            </PrivateRoute>
          } />

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

          <Route path='/account' element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          } />
          
          <Route path='/create-account' element={
            <PrivateRoute pageToLoad={"create-account"}>
              <CreateAccount />
            </PrivateRoute>
          } />

          <Route path='/my-orders' element={
            <PrivateRoute>
              <PreviousOrders />
            </PrivateRoute>
          } />


          {/* for admin access */}
          <Route path='/shipmenttracking' element={
            <PrivateRoute admin='true'>
              <ShipmentTracking />
            </PrivateRoute>
          } />

          <Route path='/inventorymanagement' element={
            <PrivateRoute admin='true'>
              <InventoryManagement />
            </PrivateRoute>
          } />

          <Route path='/trouble-ticket-management' element={
            <PrivateRoute admin='true'>
              <TroubleTicketManagement />
            </PrivateRoute>
          } />

          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
