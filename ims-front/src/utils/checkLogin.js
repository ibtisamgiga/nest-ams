import React from "react";

function CheckLogin({ children, login }) {
  if (login) {
    return children;
  }
}

export default CheckLogin;
