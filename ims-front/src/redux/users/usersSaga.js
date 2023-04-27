import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_USER_LIST,
  FETCH_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USERS_COUNT_FAILURE,
  GET_USERS_COUNT_SUCCESS,
  GET_USERS_COUNT
} from "../constants";
import {
  fetchUserListSuccess,
  fetchUserListError,
  fetchUserByIdSuccess,
  fetchUserByIdError,
  createUserSuccess,
  createUserError,
  updateUserSuccess,
  updateUserError,
  deleteUserSuccess,
  deleteUserError,
  getUsersCountFailure,getUsersCountSuccess
} from "./usersAction";
import fetchData from "../../utils/fetchData";

function* fetchUserListSaga() {
  try {
    const users=yield fetchData("GET",null,"http://localhost:5000/users") //yield call(api.get, '/users');
    //console.log(response)
      yield put(fetchUserListSuccess(users));
  } catch (error) {
    yield put(fetchUserListError(error));
  }
}

function* fetchUserByIdSaga(action) {
  const { id } = action.payload;
  try {
    const user=yield fetchData("GET",null,`http://localhost:5000/users/${id}`) 
    yield put(fetchUserByIdSuccess(user));
  } catch (error) {
    yield put(fetchUserByIdError(error));
  }
}
function* getCount() {
  try {
    const count= yield fetchData(
      "GET",
      null,
      "http://localhost:5000/users/count"
    ); // call your API method here
    console.log(count,'saga')
    yield put(getUsersCountSuccess(count)); // dispatch action to update Redux store with retrieved organizations
  } catch (error) {
    yield put(getUsersCountFailure(error)); // dispatch action to update Redux store with error
  }
}

function* createUserSaga(action) {
  const { body } = action.payload;
  try {
    const user = yield fetchData(
      "POST",
      body,
      `http://localhost:5000/users/signup`
    );//call(api.post, '/users', user);
    console.log(user)
    yield put(createUserSuccess(user));
  } catch (error) {
    yield put(createUserError(error));
  }
}

function* updateUserSaga(action) {
  const { body,id} = action.payload;
  console.log(body)
  try {
    const user = yield fetchData(
      "PATCH",
      body,
      `http://localhost:5000/users/${id}`
    );
    console.log(user)
    yield put(updateUserSuccess(user));
  } catch (error) {
    yield put(updateUserError(error));
  }
}

function* deleteUserSaga(action) {
  const { id } = action.payload;
  try {
   const response= yield fetchData("DELETE", null, `http://localhost:5000/users/${id}`); //call(api.delete, /users/${id});

    yield put(deleteUserSuccess(id));
    console.log(response)
  } catch (error) {
    console.log(error,'erroe')
    yield put(deleteUserError(error.message));
  }
}

export default function* usersSaga() {
  yield takeLatest(FETCH_USER_LIST, fetchUserListSaga);
  yield takeLatest(FETCH_USER_BY_ID, fetchUserByIdSaga);
  yield takeLatest(CREATE_USER, createUserSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(GET_USERS_COUNT,getCount)
}
