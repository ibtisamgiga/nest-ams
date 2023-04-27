//import { SET_REQUEST_LIST } from "../constants"
import {
    GET_REQUESTS_REQUEST,
    GET_REQUESTS_FAILURE,
    GET_REQUEST_REQUEST,
    GET_REQUESTS_SUCCESS,
    GET_REQUEST_FAILURE,
    GET_REQUEST_SUCCESS,
    UPDATE_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_ERROR,
    DELETE_REQUEST,
    DELETE_REQUEST_ERROR,
    DELETE_REQUEST_SUCCESS,
    CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_ERROR,
  GET_REQUESTS_COUNT_SUCCESS,
  GET_REQUESTS_COUNT_FAILURE,
  GET_REQUESTS_COUNT
  } from "../constants";
  
  const initialState = {
    requests: [],
    request: null,
    error: null,
    count: {
      monthlyCount: [],
      currentMonth: {
        count: 0,
      },
      total: 0,
    },
  };
  

  export const requestData = (state = initialState, action) => {
    switch (action.type) {
      case GET_REQUESTS_SUCCESS:
        return {
          ...state,
          requests: action.payload.requests,
          error: null,
        };
      case GET_REQUESTS_FAILURE:
        return {
          ...state,
          requests: [],
          error: action.payload.error,
        };
      case GET_REQUESTS_COUNT_SUCCESS:
        return {
          ...state,
          count: action.payload.count,
          error: null,
        };
      case GET_REQUESTS_COUNT_FAILURE:
        return {
          ...state,
          count: {
            monthCount: [],
            currentMonth: {
              count: "0",
            },
  
            total: "0",
          },
          error: action.payload.error,
        };
      case GET_REQUEST_SUCCESS:
        return {
          ...state,
          request: action.payload.request,
          error: null,
        };
      case GET_REQUEST_FAILURE:
        return {
          ...state,
          request: null,
          error: action.payload.error,
        };
  
      case UPDATE_REQUEST:
        return { ...state };
  
      case UPDATE_REQUEST_SUCCESS:
        return {
          ...state,
          requests: state.requests.map((request) =>
            request.id === action.payload.request.id
              ? action.payload.request
              : request
          ),
          request: action.payload.request,
        };
      case UPDATE_REQUEST_ERROR:
        return { ...state, error: action.payload.error };
  
      case DELETE_REQUEST:
        return { ...state };
  
      case DELETE_REQUEST_SUCCESS:
        return {
          ...state,
          requests: state.requests.filter(
            (request) => request.id !== action.payload.id
          ),
        };
      case DELETE_REQUEST_ERROR:
        return { ...state, error: action.payload.error };
      case CREATE_REQUEST:
        return { ...state };
      case CREATE_REQUEST_SUCCESS:
        return {
          ...state,
          requests: [...state.requests, action.payload.request],
        };
      case CREATE_REQUEST_ERROR:
        return { ...state, error: action.payload.error };
      default:
        return state;
    }
  };
  