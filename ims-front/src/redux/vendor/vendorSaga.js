import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import fetchData from "../../utils/fetchData";
//import { VENDOR_LIST, SET_VENDOR_LIST } from "../constants";
import {
  GET_VENDORS_REQUEST,
  GET_VENDOR_REQUEST,
  UPDATE_VENDOR,
  DELETE_VENDOR,
  CREATE_VENDOR,
  GET_VENDORS_COUNT,
} from "../constants";

import {
  getVendorsSuccess,
  getVendorsFailure,
  getVendorSuccess,
  getVendorFailure,
  updateVendorSuccess,
  updateVendorError,
  deleteVendorSuccess,
  deleteVendorError,
  createVendorSuccess,
  createVendorError,
  getVendorsCountSuccess,
  getVendorsCountFailure,
} from "./vendorAction";

// Worker saga for getting all vendors
function* getVendors() {
  try {
    const vendors = yield fetchData(
      "GET",
      null,
      "http://localhost:5000/vendor"
    ); // call your API method here
    yield put(getVendorsSuccess(vendors)); // dispatch action to update Redux store with retrieved vendors
  } catch (error) {
    yield put(getVendorsFailure(error)); // dispatch action to update Redux store with error
  }
}
function* getCount() {
  try {
    const count = yield fetchData(
      "GET",
      null,
      "http://localhost:5000/vendor/count"
    ); // call your API method here
    yield put(getVendorsCountSuccess(count)); // dispatch action to update Redux store with retrieved vendors
  } catch (error) {
    yield put(getVendorsCountFailure(error)); // dispatch action to update Redux store with error
  }
}

function* getVendor(action) {
  const { id } = action.payload;

  try {
    const vendor = yield fetchData(
      "GET",
      null,
      `http://localhost:5000/vendor/${id}`
    ); // call your API method here, passing in the ID as a parameter
    yield put(getVendorSuccess(vendor)); // dispatch action to update Redux store with retrieved vendor
  } catch (error) {
    yield put(getVendorFailure(error)); // dispatch action to update Redux store with error
  }
}

function* updateVendorSaga(action) {
  const { id, body } = action.payload;
  try {
    const vendor = yield fetchData(
      "PATCH",
      body,
      `http://localhost:5000/vendor/${id}`
    );
    //yield call("" action.payload.vendor);
    yield put(updateVendorSuccess(vendor));
  } catch (error) {
    yield put(updateVendorError(error));
  }
}

function* deleteVendorSaga(action) {
  const { id } = action.payload;
  try {
    yield fetchData("DELETE", null, `http://localhost:5000/vendor/${id}`);
    yield put(deleteVendorSuccess(action.payload.id));
  } catch (error) {
    yield put(deleteVendorError(error));
  }
}

function* createVendorSaga(action) {
  const { body } = action.payload;
  try {
    const vendor = yield fetchData(
      "POST",
      body,
      `http://localhost:5000/vendor`
    );
    if (vendor.error) {
      yield put(createVendorError(vendor.message));
    }
    yield put(createVendorSuccess(vendor));
  } catch (error) {
    yield put(createVendorError(error));
  }
}
function* vendorSaga() {
  yield takeLatest(GET_VENDORS_REQUEST, getVendors);
  //yield takeEvery(VENDOR_LIST, getVendors);

  yield takeLatest(GET_VENDOR_REQUEST, getVendor);
  yield takeLatest(CREATE_VENDOR, createVendorSaga);
  yield takeLatest(UPDATE_VENDOR, updateVendorSaga);
  yield takeLatest(DELETE_VENDOR, deleteVendorSaga);
  yield takeLatest(GET_VENDORS_COUNT, getCount);
}
export default vendorSaga;
