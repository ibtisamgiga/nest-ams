import { BrowserRouter as Router, useLocation } from "react-router-dom";
import MyRoutes from "./components/routes/MyRoutes";
import NavBar from "./components/shared/navbar/NavBar";
import CheckLogin from "./utils/checkLogin";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "./utils/localStorageHelper";
import { useSelector } from "react-redux";
function App() {
  // let beverage = window.location.href.split('/')[3]== '' ? "/" : window.location.href.split('/')[3];
  // let a=window.location.href.split('/')[3]
  // const [value, setValue] = useState('/');

  // const handleChange = (event) => {
   
  //   console.log(event.currentTarget.getAttribute("data-value"));
  //   setValue(event.currentTarget.getAttribute("data-value"))

  //   //setValue(window.location.href.split('/')[3]);
  // };

  const data = useSelector((state)=>state.userData)//{ name: "ali", role: "employee" };
  
  useEffect(()=>{
    //console.log(data.token,'user')
  },[data])
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
