import {getToken } from "./localStorageHelper";

const fetchData = (method, body = null, endpoint) => {
  return fetch(`${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getToken()}`,
    },
    body: body && JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("error:", error);
      localStorage.clear();
      window.location.reload();
    });
  //}
};

export default fetchData;
/////debounce concepts
