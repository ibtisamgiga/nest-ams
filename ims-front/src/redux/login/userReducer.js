import { getFromLocalStorage } from "../../utils/localStorageHelper";
import { SIGIN_IN,SET_USER, SET_ERROR } from "../constants";


export const userData = (data ={token:getFromLocalStorage()}, action) => {

  switch (action.type) {
    case SET_USER:
        return {
          ...data, 
          token: action.payload.response,
          error: ""
        }
    case SET_ERROR:
      return {
        ...data,
        error: action.payload.error,
        token: ""
      }
    default:
      return data;
  }
};
