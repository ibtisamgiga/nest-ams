import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import fetchData from "../../utils/fetchData";
//import { REQUEST_LIST, SET_REQUEST_LIST } from "../constants";
import {
  GET_REQUESTS_REQUEST,
  GET_REQUEST_REQUEST,
  UPDATE_REQUEST,
  DELETE_REQUEST,
  CREATE_REQUEST,
  GET_REQUESTS_COUNT,
  CREATE_REQUEST_ERROR,
} from "../constants";
import {
  getRequestsSuccess,
  getRequestsFailure,
  getRequestSuccess,
  getRequestFailure,
  updateRequestSuccess,
  updateRequestError,
  deleteRequestSuccess,
  deleteRequestError,
  createRequestSuccess,
  createRequestError,
  getRequestsCountSuccess,
  getRequestsCountFailure,
} from "./requestAction";
import { endPoint } from "../../constants/api-constants";

// Worker saga for getting all requests
function* getRequests(action) {
  const { reqType } = action.payload;

  const url = reqType
    ? `${endPoint}request/?type=${reqType}`
    : `${endPoint}request/`;
  try {
    const requests = yield fetchData(
      "GET",
      null,
      url
      //{ reqType?`http://localhost:5000/request/?type=${reqType}`:}
    ); // call your API method here

    yield put(getRequestsSuccess(requests)); // dispatch action to update Redux store with retrieved requests
  } catch (error) {
    yield put(getRequestsFailure(error)); // dispatch action to update Redux store with error
  }
}
function* getCount() {
  try {
    const count = yield fetchData("GET", null, `${endPoint}request/count`); // call your API method here

    yield put(getRequestsCountSuccess(count)); // dispatch action to update Redux store with retrieved requests
  } catch (error) {
    yield put(getRequestsCountFailure(error)); // dispatch action to update Redux store with error
  }
}

function* getRequest(action) {
  const { id } = action.payload;

  try {
    const request = yield fetchData("GET", null, `${endPoint}request/${id}`); // call your API method here, passing in the ID as a parameter
    yield put(getRequestSuccess(request)); // dispatch action to update Redux store with retrieved request
  } catch (error) {
    yield put(getRequestFailure(error)); // dispatch action to update Redux store with error
  }
}

function* updateRequestSaga(action) {
  const { id, body } = action.payload;
  try {
    const request = yield fetchData("PATCH", body, `${endPoint}request/${id}`);
    //yield call("" action.payload.request);
    yield put(updateRequestSuccess(request));
  } catch (error) {
    yield put(updateRequestError(error));
  }
}

function* deleteRequestSaga(action) {
  const { id } = action.payload;
  try {
    yield fetchData("DELETE", null, `${endPoint}request/${id}`);
    yield put(deleteRequestSuccess(action.payload.id));
  } catch (error) {
    yield put(deleteRequestError(error));
  }
}

function* createRequestSaga(action) {
  const { body } = action.payload;
  try {
    const request = yield fetchData("POST", body, `${endPoint}request`);
console.log(request)
    if (request.statusCode == 400) {
      yield put({
        type: CREATE_REQUEST_ERROR,
        payload: request.message,
      });
    } else {
      yield put(createRequestSuccess(request));
    }
  } catch (error) {
    yield put(createRequestError(error));
  }
}
function* requestSaga() {
  yield takeLatest(GET_REQUESTS_REQUEST, getRequests);
  yield takeLatest(GET_REQUEST_REQUEST, getRequest);
  yield takeLatest(CREATE_REQUEST, createRequestSaga);
  yield takeLatest(UPDATE_REQUEST, updateRequestSaga);
  yield takeLatest(DELETE_REQUEST, deleteRequestSaga);
  yield takeLatest(GET_REQUESTS_COUNT, getCount);
}
export default requestSaga;
