import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_ERROR,
  FETCH_USER_BY_ID,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_ERROR,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  GET_USERS_COUNT_FAILURE,
  GET_USERS_COUNT_SUCCESS,
  GET_USERS_COUNT
} from "../constants";

export const fetchUserList = () => ({
  type: FETCH_USER_LIST,
});

export const fetchUserListSuccess = (users) => ({
  type: FETCH_USER_LIST_SUCCESS,
  payload: { users },
});

export const fetchUserListError = (error) => ({
  type: FETCH_USER_LIST_ERROR,
  payload: { error },
});

export const fetchUserById = (id) => ({
  type: FETCH_USER_BY_ID,
  payload: { id },
});

export const fetchUserByIdSuccess = (user) => ({
  type: FETCH_USER_BY_ID_SUCCESS,
  payload: { user },
});

export const fetchUserByIdError = (error) => ({
  type: FETCH_USER_BY_ID_ERROR,
  payload: { error },
});

export const createUser = (user) => ({
  type: CREATE_USER,
  payload: { body: user },
});

export const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  payload: { body: user },
});

export const createUserError = (error) => ({
  type: CREATE_USER_ERROR,
  payload: { error },
});

export const updateUser = (user, id) => ({
  type: UPDATE_USER,
  payload: { body: user, id },
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user },
});

export const updateUserError = (error) => ({
  type: UPDATE_USER_ERROR,
  payload: { error },
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: { id },
});

export const deleteUserSuccess = (id) => ({
  type: DELETE_USER_SUCCESS,
  payload: { id },
});

export const deleteUserError = (error) => ({
  type: DELETE_USER_ERROR,
  payload: { error },
});
export const getUsersCount = () => ({
  type: GET_USERS_COUNT,
});

export const getUsersCountSuccess = (count) => ({
  type: GET_USERS_COUNT_SUCCESS,
  payload: { count },
});

export const getUsersCountFailure = (error) => ({
  type: GET_USERS_COUNT_FAILURE,
  payload: { error },
});
