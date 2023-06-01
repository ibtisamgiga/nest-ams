import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import fetchData from "../../utils/fetchData";
//import { DEPARTMENT_LIST, SET_DEPARTMENT_LIST } from "../constants";
import {
  GET_DEPARTMENTS_REQUEST,
  GET_DEPARTMENT_REQUEST,
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  UPDATE_DEPARTMENT,
  CREATE_DEPARTMENT_ERROR,
} from "../constants";

import {
  getDepartmentsSuccess,
  getDepartmentsFailure,
  getDepartmentSuccess,
  getDepartmentFailure,
  updateDepartmentSuccess,
  updateDepartmentError,
  deleteDepartmentSuccess,
  deleteDepartmentError,
  createDepartmentSuccess,
  createDepartmentError,
} from "./departmentAction";
import { endPoint } from "../../constants/api-constants";

// Worker saga for getting all departments
function* getDepartments() {
  try {
    const departments = yield fetchData("GET", null, `${endPoint}department`); // call your API method here
    yield put(getDepartmentsSuccess(departments)); // dispatch action to update Redux store with retrieved departments
  } catch (error) {
    yield put(getDepartmentsFailure(error)); // dispatch action to update Redux store with error
  }
}

function* getDepartment(action) {
  const { id } = action.payload;

  try {
    const department = yield fetchData(
      "GET",
      null,
      `${endPoint}department/${id}`
    ); // call your API method here, passing in the ID as a parameter

    yield put(getDepartmentSuccess(department)); // dispatch action to update Redux store with retrieved department
  } catch (error) {
    yield put(getDepartmentFailure(error)); // dispatch action to update Redux store with error
  }
}

function* updateDepartmentSaga(action) {
  const { id, body } = action.payload;
  try {
    const department = yield fetchData(
      "PATCH",
      body,
      `${endPoint}department/${id}`
    );
    //yield call("" action.payload.department);
    yield put(updateDepartmentSuccess(department));
  } catch (error) {
    yield put(updateDepartmentError(error));
  }
}

function* deleteDepartmentSaga(action) {
  const { id } = action.payload;
  try {
    yield fetchData("DELETE", null, `${endPoint}department/${id}`);
    yield put(deleteDepartmentSuccess(action.payload.id));
  } catch (error) {
    yield put(deleteDepartmentError(error));
  }
}

function* createDepartmentSaga(action) {
  const { body } = action.payload;
  try {
    const department = yield fetchData("POST", body, `${endPoint}department`);

    if (department.statusCode != 200) {
      yield put({ type: CREATE_DEPARTMENT_ERROR, payload: department.message });
    } else {
      yield put(createDepartmentSuccess(department));
    }
  } catch (error) {
    yield put(createDepartmentError(error));
  }
}
function* departmentSaga() {
  yield takeLatest(GET_DEPARTMENTS_REQUEST, getDepartments);

  yield takeLatest(GET_DEPARTMENT_REQUEST, getDepartment);
  yield takeLatest(CREATE_DEPARTMENT, createDepartmentSaga);
  yield takeLatest(UPDATE_DEPARTMENT, updateDepartmentSaga);
  yield takeLatest(DELETE_DEPARTMENT, deleteDepartmentSaga);
}
export default departmentSaga;
