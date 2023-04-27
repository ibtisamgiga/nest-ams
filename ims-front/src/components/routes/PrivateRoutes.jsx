import React, { useEffect } from "react";
import LoginPage from "../../pages/LoginPage";
import { getFromLocalStorage } from "../../utils/localStorageHelper";
import { useNavigate } from "react-router-dom";
//import { getFromLocalStorage } from "../../utils/LocalStorageHelper";
function PrivateRoutes({ children ,user}) {
  const loggedIn = user//getFromLocalStorage()?.token;
const navigate=  useNavigate()
  if (!loggedIn) {
  // navigate('/login')
  return <LoginPage/>
  }
  return children;
}

export default PrivateRoutes;
