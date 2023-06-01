import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_USER_LIST,
  FETCH_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USERS_COUNT,
  CREATE_USER_ERROR,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
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
  getUsersCountFailure,
  getUsersCountSuccess,
} from "./usersAction";
import fetchData from "../../utils/fetchData";
import { endPoint } from "../../constants/api-constants";

function* fetchUserListSaga() {
  try {
    const users = yield fetchData("GET", null, `${endPoint}users`); //yield call(api.get, '/users');

    yield put(fetchUserListSuccess(users));
  } catch (error) {
    yield put(fetchUserListError(error));
  }
}

function* fetchUserByIdSaga(action) {
  const { id } = action.payload;
  try {
    const user = yield fetchData("GET", null, `${endPoint}users/${id}`);

    yield put(fetchUserByIdSuccess(user));
  } catch (error) {
    yield put(fetchUserByIdError(error));
  }
}
function* getCount() {
  try {
    const count = yield fetchData("GET", null, `${endPoint}users/count`); // call your API method here

    yield put(getUsersCountSuccess(count)); // dispatch action to update Redux store with retrieved organizations
  } catch (error) {
    yield put(getUsersCountFailure(error)); // dispatch action to update Redux store with error
  }
}

function* createUserSaga(action) {
  const { body } = action.payload;

  try {
    const user = yield fetchData("POST", body, `${endPoint}users/signup`);
    if (user.statusCode == 400) {
      yield put({
        type: CREATE_USER_ERROR,
        payload: user.message,
      });
    } else {
      yield put(createUserSuccess(user));
    }
  } catch (error) {
    yield put(createUserError(error));
  }
}

function* updateUserSaga(action) {
  const { body, id } = action.payload;

  const user = yield fetchData("PATCH", body, `${endPoint}users/${id}`);
  console.log(user)
  try {
    if (user.statusCode == 400) {
      yield put({ type: UPDATE_USER_ERROR, payload: user.message });
    } else {
      yield put(updateUserSuccess(user));
    }
  } catch (error) {
    yield put({ type: UPDATE_USER_ERROR, payload: error });
  }
}

function* deleteUserSaga(action) {
  const { id } = action.payload;
  try {
    const response = yield fetchData("DELETE", null, `${endPoint}users/${id}`); //call(api.delete, /users/${id});

    yield put(deleteUserSuccess(id));
  } catch (error) {
    yield put(deleteUserError(error.message));
  }
}

export default function* usersSaga() {
  yield takeLatest(FETCH_USER_LIST, fetchUserListSaga);
  yield takeLatest(FETCH_USER_BY_ID, fetchUserByIdSaga);
  yield takeLatest(CREATE_USER, createUserSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(GET_USERS_COUNT, getCount);
}
