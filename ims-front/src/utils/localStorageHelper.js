import secureLocalStorage from "react-secure-storage";

const setLocalStorage = (response) => {
  if (response) {
    const token = JSON.stringify(response);
    const expirationTime = new Date().getTime() + 3600 * 1000; // 1 hour from now
    const item = { token: token, expiration: expirationTime };
    secureLocalStorage.setItem("token", JSON.stringify(item));
  }
  //window.localStorage.setItem("token", JSON.stringify(response));
};

const getFromLocalStorage = () => {
  try {
    const item =
      window.localStorage && JSON.parse(secureLocalStorage.getItem("token"));
    if (item && item.expiration > new Date().getTime()) {
      return JSON.parse(item.token);
    }
    if (!item) {
      return null;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

const checkLogin = () => {
  const response = JSON.parse(window.localStorage.getItem("token"));
  return response?.token;
};
const getToken = () => {
  return getFromLocalStorage()?.token;
};

export { setLocalStorage, getFromLocalStorage, checkLogin, getToken };
