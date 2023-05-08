import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import fetchData from "../../utils/fetchData";
//import { COMPLAINT_LIST, SET_COMPLAINT_LIST } from "../constants";
import {
  GET_COMPLAINTS_REQUEST,
  GET_COMPLAINTS_FAILURE,
  GET_COMPLAINT_REQUEST,
  GET_COMPLAINTS_SUCCESS,
  GET_COMPLAINT_FAILURE,
  GET_COMPLAINT_SUCCESS,
  UPDATE_COMPLAINT,
  UPDATE_COMPLAINT_SUCCESS,
  UPDATE_COMPLAINT_ERROR,
  DELETE_COMPLAINT,
  DELETE_COMPLAINT_ERROR,
  DELETE_COMPLAINT_SUCCESS,
  CREATE_COMPLAINT,
  CREATE_COMPLAINT_SUCCESS,
  CREATE_COMPLAINT_ERROR,
  GET_COMPLAINT_COUNT_SUCCESS,
  GET_COMPLAINT_COUNT_FAILURE,
  GET_COMPLAINT_COUNT,
} from "../constants";

import {
  getComplaintsSuccess,
  getComplaintsFailure,
  getComplaintSuccess,
  getComplaintFailure,
  getComplaintCountFailure,
  getComplaintCountSuccess,
  updateComplaintSuccess,
  updateComplaintError,
  createComplaintError,
  createComplaintSuccess,
} from "./complaintAction";
// Worker saga for getting all organizations
function* getComplaints() {
  try {
    const complaints = yield fetchData(
      "GET",
      null,
      "http://localhost:5000/complaint"
    ); // call your API method here

    yield put(getComplaintsSuccess(complaints)); // dispatch action to update Redux store with retrieved organizations
  } catch (error) {
    yield put(getComplaintsFailure(error)); // dispatch action to update Redux store with error
  }
}
function* getCount() {
  try {
    const count = yield fetchData(
      "GET",
      null,
      "http://localhost:5000/complaint/count"
    ); // call your API method here

    yield put(getComplaintCountSuccess(count)); // dispatch action to update Redux store with retrieved organizations
  } catch (error) {
    yield put(getComplaintCountFailure(error)); // dispatch action to update Redux store with error
  }
}

function* getComplaint(action) {
  const { id } = action.payload;

  try {
    const complaint = yield fetchData(
      "GET",
      null,
      `http://localhost:5000/complaint/${id}`
    ); // call your API method here, passing in the ID as a parameter
    yield put(getComplaintSuccess(complaint)); // dispatch action to update Redux store with retrieved complaint
  } catch (error) {
    yield put(getComplaintFailure(error)); // dispatch action to update Redux store with error
  }
}

function* updateComplaintSaga(action) {
  const { id, body } = action.payload;
  try {
    const complaint = yield fetchData(
      "PUT",
      body,
      `http://localhost:5000/complaint/${id}`
    );
    //yield call("" action.payload.complaint);
    yield put(updateComplaintSuccess(complaint));
  } catch (error) {
    yield put(updateComplaintError(error));
  }
}
function* createComplaintSaga(action) {
  const { body } = action.payload;
  try {
    const complaint = yield fetchData(
      "POST",
      body,
      `http://localhost:5000/complaint`
    );
    if (complaint.error) {
      yield put(createComplaintError(complaint.message));
    }
    yield put(createComplaintSuccess(complaint));
  } catch (error) {
    yield put(createComplaintError(error));
  }
}

function* complainSaga() {
  yield takeLatest(GET_COMPLAINTS_REQUEST, getComplaints);
  //yield takeEvery(COMPLAINT_LIST, getComplaints);

  yield takeLatest(GET_COMPLAINT_REQUEST, getComplaint);
  yield takeLatest(GET_COMPLAINT_COUNT, getCount);
  yield takeLatest(CREATE_COMPLAINT, createComplaintSaga);
  yield takeLatest(UPDATE_COMPLAINT, updateComplaintSaga);
  //   yield takeLatest(DELETE_COMPLAINT, deleteComplaintSaga);
}
export default complainSaga;
