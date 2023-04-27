import React from "react";

function ProtectedRoutes({ children, role,user }) {
  //const loggedIn = getFromLocalStorage()?.token;
  if ((role.includes(user?.role))) {
    return children;
  }

  return <div className="body">Forbidden</div>;
}

export default ProtectedRoutes;
