// import  secureLocalStorage  from  "react-secure-storage";

//import { useNavigate } from "react-router-dom";

const setLocalStorage = (response) => {
 if(response){
     window.localStorage.setItem("token", JSON.stringify(response));
  }
 
  // if(response){
  //   const token = JSON.stringify(response);
  //   const expirationTime = new Date().getTime() + 3600 * 1000; // 1 hour from now
  //   const item = { token: token, expiration: expirationTime };
  //   window.localStorage.setItem("token", JSON.stringify(item));
  // }
  //window.localStorage.setItem("token", JSON.stringify(response));
};

 const getFromLocalStorage = () => {
   const response = JSON.parse( window.localStorage ?.getItem("token"));
   return response;
 };

// const getFromLocalStorage = () => {
//   try {
//     const item = window.localStorage && JSON.parse(window.localStorage?.getItem("token"));
//     if (item && item.expiration > new Date().getTime()) {
//       return JSON.parse(item.token);
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   //window.location.href='http://localhost:3000/'

//   localStorage.clear();
//   return null;
// };

const checkLogin = () => {
  const response = JSON.parse( window.localStorage.getItem("token"));
  return response?.token;
};
export { setLocalStorage, getFromLocalStorage, checkLogin };
