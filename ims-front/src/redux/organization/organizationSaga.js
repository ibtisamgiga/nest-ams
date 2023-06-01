import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import fetchData from "../../utils/fetchData";
//import { ORGANIZATION_LIST, SET_ORGANIZATION_LIST } from "../constants";
import {
  GET_ORGANIZATIONS_REQUEST,
  GET_ORGANIZATION_REQUEST,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_ERROR,
  GET_ORGANIZATIONS_COUNT,
} from "../constants";

import {
  getOrganizationsSuccess,
  getOrganizationsFailure,
  getOrganizationSuccess,
  getOrganizationFailure,
  updateOrganizationSuccess,
  updateOrganizationError,
  deleteOrganizationSuccess,
  deleteOrganizationError,
  createOrganizationSuccess,
  getOrganizationsCountSuccess,
  getOrganizationsCountFailure,
} from "./organizationAction";
import { endPoint } from "../../constants/api-constants";

// Worker saga for getting all organizations
function* getOrganizations() {
  try {
    const organizations = yield fetchData(
      "GET",
      null,
      `${endPoint}organization`
    ); // call your API method here
    yield put(getOrganizationsSuccess(organizations)); // dispatch action to update Redux store with retrieved organizations
  } catch (error) {
    yield put(getOrganizationsFailure(error)); // dispatch action to update Redux store with error
  }
}
function* getCount() {
  try {
    const count = yield fetchData("GET", null, `${endPoint}organization/count`); // call your API method here

    yield put(getOrganizationsCountSuccess(count)); // dispatch action to update Redux store with retrieved organizations
  } catch (error) {
    yield put(getOrganizationsCountFailure(error)); // dispatch action to update Redux store with error
  }
}

function* getOrganization(action) {
  const { id } = action.payload;

  try {
    const organization = yield fetchData(
      "GET",
      null,
      `${endPoint}organization/${id}`
    ); // call your API method here, passing in the ID as a parameter
    yield put(getOrganizationSuccess(organization)); // dispatch action to update Redux store with retrieved organization
  } catch (error) {
    yield put(getOrganizationFailure(error)); // dispatch action to update Redux store with error
  }
}

function* updateOrganizationSaga(action) {
  const { id, body } = action.payload;
  try {
    const organization = yield fetchData(
      "PATCH",
      body,
      `${endPoint}organization/${id}`
    );
    //yield call("" action.payload.organization);
    yield put(updateOrganizationSuccess(organization));
  } catch (error) {
    yield put(updateOrganizationError(error));
  }
}

function* deleteOrganizationSaga(action) {
  const { id } = action.payload;
  try {
    yield fetchData("DELETE", null, `${endPoint}organization/${id}`);
    yield put(deleteOrganizationSuccess(action.payload.id));
  } catch (error) {
    yield put(deleteOrganizationError(error));
  }
}

function* createOrganizationSaga(action) {
  const { body } = action.payload;
  try {
    const organization = yield fetchData(
      "POST",
      body,
      `${endPoint}organization`
    );
    if (organization.statusCode !== 200) {
      yield put({
        type: CREATE_ORGANIZATION_ERROR,
        payload: organization.message,
      });
    }else{
    yield put(createOrganizationSuccess(organization));
    }
  } catch (error) {
    yield put({ type: CREATE_ORGANIZATION_ERROR, payload: error });
  }
}

function* organizationSaga() {
  yield takeLatest(GET_ORGANIZATIONS_REQUEST, getOrganizations);
  yield takeLatest(GET_ORGANIZATION_REQUEST, getOrganization);
  yield takeLatest(CREATE_ORGANIZATION, createOrganizationSaga);
  yield takeLatest(UPDATE_ORGANIZATION, updateOrganizationSaga);
  yield takeLatest(DELETE_ORGANIZATION, deleteOrganizationSaga);
  yield takeLatest(GET_ORGANIZATIONS_COUNT, getCount);
}
export default organizationSaga;
