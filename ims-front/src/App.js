import { BrowserRouter as Router, useLocation } from "react-router-dom";
import MyRoutes from "./components/routes/MyRoutes";
import NavBar from "./components/shared/navbar/NavBar";
import CheckLogin from "./utils/checkLogin";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "./utils/localStorageHelper";
import { useSelector } from "react-redux";
function App() {
  const data = useSelector((state) => state.userData); //{ name: "ali", role: "employee" };
  return (
    <Router>
      <CheckLogin login={data.token}>
        <NavBar user={data.token} />
      </CheckLogin>

      <div className="App">
        <MyRoutes user={data.token} />
      </div>
    </Router>
  );
}

export default App;
