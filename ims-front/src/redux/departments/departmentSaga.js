import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import fetchData from "../../utils/fetchData";
//import { DEPARTMENT_LIST, SET_DEPARTMENT_LIST } from "../constants";
import {
GET_DEPARTMENTS_REQUEST,
GET_DEPARTMENT_REQUEST,
CREATE_DEPARTMENT,
DELETE_DEPARTMENT,
UPDATE_DEPARTMENT
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
  getDepartmentsCountSuccess,
  getDepartmentsCountFailure,
} from "./departmentAction";

// Worker saga for getting all departments
function* getDepartments() {
  try {
    const departments = yield fetchData("GET", null, "http://localhost:5000/department"); // call your API method here
    if(departments.statusCode==401){
      localStorage.clear()
     // window.location.href('http://localhost:3000/')
    }
    yield put(getDepartmentsSuccess(departments)); // dispatch action to update Redux store with retrieved departments
  } catch (error) {
    yield put(getDepartmentsFailure(error)); // dispatch action to update Redux store with error
  }
}
// function* getCount() {
//   try {
//     const count = yield fetchData(
//       "GET",
//       null,
//       "http://localhost:5000/department/count"
//     ); // call your API method here

//     yield put(getDepartmentsCountSuccess(count)); // dispatch action to update Redux store with retrieved departments
//   } catch (error) {
//     yield put(getDepartmentsCountFailure(error)); // dispatch action to update Redux store with error
//   }
// }

function* getDepartment(action) {
   const { id } = action.payload;

   try {
     const department = yield fetchData(
       "GET",
       null,
       `http://localhost:5000/department/${id}`
     ); // call your API method here, passing in the ID as a parameter
   
     if(department.statusCode==401){
      localStorage.clear()
     // window.location.href('http://localhost:3000/')
    }
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
       `http://localhost:5000/department/${id}`
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
     yield fetchData("DELETE", null, `http://localhost:5000/department/${id}`);
     yield put(deleteDepartmentSuccess(action.payload.id));
   } catch (error) {
     yield put(deleteDepartmentError(error));
   }
 }

function* createDepartmentSaga(action) {
   const { body } = action.payload;
   try {     const department = yield fetchData("POST", body, `http://localhost:5000/department`);
    
     if (department.error) {
       yield put(createDepartmentError(department.message));
     }
     yield put(createDepartmentSuccess(department));
   } catch (error) {
     yield put(createDepartmentError(error));
   }
 }
function* departmentSaga() {
  yield takeLatest(GET_DEPARTMENTS_REQUEST, getDepartments);
  //yield takeEvery(DEPARTMENT_LIST, getDepartments);

   yield takeLatest(GET_DEPARTMENT_REQUEST, getDepartment);
   yield takeLatest(CREATE_DEPARTMENT, createDepartmentSaga);
 yield takeLatest(UPDATE_DEPARTMENT, updateDepartmentSaga);
 yield takeLatest(DELETE_DEPARTMENT, deleteDepartmentSaga);
  // yield takeLatest(GET_DEPARTMENT_COUNT, getCount);
}
export default departmentSaga;


