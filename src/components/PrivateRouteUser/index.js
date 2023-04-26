import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, pageToLoad }) => {
    
    if(pageToLoad === "login" || pageToLoad === "create-account"){
        return localStorage.userIsLoggedIn === "true" ? <Navigate to="/" /> : children;
    } 

    // ternary operator: condition ? expression_if_true : expression_if_false
    return localStorage.userIsLoggedIn === "true" ? children : <Navigate to="/login" />;
};

export default PrivateRoute;