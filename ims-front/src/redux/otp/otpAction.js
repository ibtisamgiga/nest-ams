import { SEND_OTP, SEND_PASSWORD } from "../constants";

export const sendOtp = (data) => {
  //let data='sigin in'

  return {
    type: SEND_OTP,
    data,
  };
};

export const resetPassword = (data) => {
  //let data='sigin in'

  return {
    type: SEND_PASSWORD,
    data,
  };
};
