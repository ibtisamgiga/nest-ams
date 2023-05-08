import { takeEvery, put, takeLatest, select } from "redux-saga/effects";
import {
  SET_OTP_ERROR,
  SEND_OTP,
  SET_OTP,
  SET_PASSWORD,
  SET_PASSWORD_ERROR,
  SEND_PASSWORD,
} from "../constants";
import fetchData from "../../utils/fetchData";
import { setLocalStorage } from "../../utils/localStorageHelper";

function* sendOtpSaga({ data }) {
  let response = yield fetchData(
    "POST",
    data,
    "http://localhost:5000/users/send-otp"
  );
  if (response.error) {
    yield put({ type: SET_OTP_ERROR, payload: { error: response.message } });
  } else {
    yield put({ type: SET_OTP, payload: { response } });
  }
}

function* setPasswordSaga({ data }) {
  let response = yield fetchData(
    "PUT",
    data,
    "http://localhost:5000/users/reset-password"
  );
  if (response.error) {
    yield put({ type: SET_OTP_ERROR, payload: { error: response.message } });
  } else {
    yield put({ type: SET_OTP, payload: { response } });
  }
}

function* otpSaga() {
  yield takeLatest(SEND_OTP, sendOtpSaga);
  yield takeEvery(SEND_PASSWORD, setPasswordSaga);
  //   yield takeEvery(DELETE_EVENT, delEvents);
}
export default otpSaga;
