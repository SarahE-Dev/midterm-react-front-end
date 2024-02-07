import React from "react";
import {Route, Navigate} from 'react-router-dom'
import checkIfUserIsAuth from "../../utils/checkIfUserIsAuth";

const PrivateRoute = ({children, user})=> {
    if(checkIfUserIsAuth()){
      return children
    }else{
      return <Navigate to="/login"></Navigate>
    }
    
  }
  
export default PrivateRoute