import React from "react";
import { Navigate } from "react-router-dom";

export const CheckForAdminAccess = () => {
    const listOfAdmins = ["64483dbe513b06714a7aca44"];
    
    for(let i = 0; i < listOfAdmins.length; i++){
        if(listOfAdmins[i] === localStorage.currentUserID){
            return true;
        }
    }

    return false;
}
const PrivateRoute = ({ children, pageToLoad, admin }) => {

    // console.log(`admin: ${admin}`)
    // console.log(`pageToLoad: ${pageToLoad}`)

    if((pageToLoad === "login" || pageToLoad === "create-account") && admin !== "true"){
        return localStorage.userIsLoggedIn === "true" ? <Navigate to="/" /> : children;
    } 

    if(pageToLoad === "admin-IcyDel-login" && admin === "true"){
        return localStorage.userIsLoggedIn === "true" ? <Navigate to="/" /> : children;
    }

    if(admin === "true"){
        if(localStorage.userIsLoggedIn === "false" && pageToLoad === "admin-IcyDel-login"){
            return children;
        } else {
            return CheckForAdminAccess() ? children : <Navigate to='/' />;
        }
    }

    // ternary operator: condition ? expression_if_true : expression_if_false
    return localStorage.userIsLoggedIn === "true" ? children : <Navigate to="/login" />;
};

export default PrivateRoute;