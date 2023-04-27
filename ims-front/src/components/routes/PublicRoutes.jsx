import React from "react";
import SADashboardPage from "../../pages/saDashboard/SADashboardPage";
//mport { getFromLocalStorage } from "../../utils/LocalStorageHelper";

function PublicRoutes({ children }) {
  //const loggedIn = getFromLocalStorage()?.token;
  if (true) {
    return <SADashboardPage/>
  }
  return children;
}

export default PublicRoutes;
