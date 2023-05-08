import { getFromLocalStorage } from "../../utils/localStorageHelper";
import { SET_OTP_ERROR, SET_OTP ,SET_PASSWORD,SET_PASSWORD_ERROR} from "../constants";

export const otpData = (
  data = { otp: null, error: " ", password: null, passwordError: " " },
  action
) => {
  switch (action.type) {
    case SET_OTP:
      return {
        ...data,
        otp: action.payload.response,
        error: null,
      };
    case SET_OTP_ERROR:
      return {
        ...data,
        error: action.payload.error,
        otp: null,
      };
    case SET_PASSWORD:
      return {
        ...data,
        password: action.payload.response,
        error: null,
      };
    case SET_PASSWORD_ERROR:
      return {
        ...data,
        passwordError: action.payload.error,
        password: null,
      };
    default:
      return data;
  }
};
