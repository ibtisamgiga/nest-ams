
import { getFromLocalStorage } from "./localStorageHelper";

const fetchData = (method, body, endpoint) => {
  if (!body) {
    return fetch(`${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getFromLocalStorage()?.token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  } else {
    return fetch(`${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getFromLocalStorage()?.token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }
};

export default fetchData;
