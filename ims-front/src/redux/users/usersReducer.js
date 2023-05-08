import {
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_ERROR,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_ERROR,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  GET_USERS_COUNT_FAILURE,
  GET_USERS_COUNT_SUCCESS,
  GET_USERS_COUNT,
} from "../constants";

const initialState = {
  userList: [],
  selectedUser: null,
  error: null,
  count: {
    monthlyCount: [],
    currentMonth: {
      count: 0,
    },
    total: 0,
  },
};

export const usersData = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_LIST_SUCCESS:
      return {
        ...state,
        userList: action.payload.users,
        error: null,
      };
    case FETCH_USER_LIST_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case GET_USERS_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload.count,
        error: null,
      };
    case GET_USERS_COUNT_FAILURE:
      return {
        ...state,
        count: {
          monthCount: [],
          currentMonth: {
            count: "0",
          },
          total: 0,
        },
        error: action.payload.error,
      };
    case FETCH_USER_BY_ID_SUCCESS:
      return {
        ...state,
        selectedUser: action.payload.user,
        error: null,
      };
    case FETCH_USER_BY_ID_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        userList: [...state.userList, action.payload.user],
        error: null,
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userList: state.userList.map((user) =>
          user.id === action.payload.user.id ? action.payload.user : user
        ),
        selectedUser: action.payload.user,
        error: null,
      };
    case UPDATE_USER_ERROR:
      state.error = action.payload.error;

      return {
        ...state,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        userList: state.userList.filter(
          (user) => user.id !== action.payload.id
        ),
        selectedUser: null,
        error: null,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
