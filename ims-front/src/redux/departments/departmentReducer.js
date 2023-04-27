//import { SET_DEPARTMENT_LIST } from "../constants"
import {
    GET_DEPARTMENTS_REQUEST,
    GET_DEPARTMENTS_FAILURE,
    GET_DEPARTMENT_REQUEST,
    GET_DEPARTMENTS_SUCCESS,
    GET_DEPARTMENT_FAILURE,
    GET_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT,
    UPDATE_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_ERROR,
    DELETE_DEPARTMENT,
    DELETE_DEPARTMENT_ERROR,
    DELETE_DEPARTMENT_SUCCESS,
    CREATE_DEPARTMENT,
  CREATE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_ERROR,
  GET_DEPARTMENTS_COUNT_SUCCESS,
  GET_DEPARTMENTS_COUNT_FAILURE,
  GET_DEPARTMENTS_COUNT
  } from "../constants";
  
  const initialState = {
    departments: [],
    department: null,
    error: null,
    count: {
      monthlyCount: [],
      currentMonth: {
        count: 0,
      },
      total: 0,
    },
  };
  
  // export const departmentData = (data = [], action) => {
  //   switch (action.type) {
  //     case SET_DEPARTMENT_LIST:
  //       return[...action.data]
  //     default:
  //       return data;
  
  //   }
  // };
  
  export const departmentData = (state = initialState, action) => {
    switch (action.type) {
      case GET_DEPARTMENTS_SUCCESS:
        return {
          ...state,
          departments: action.payload.departments,
          error: null,
        };
      case GET_DEPARTMENTS_FAILURE:
        return {
          ...state,
          departments: [],
          error: action.payload.error,
        };
      case GET_DEPARTMENTS_COUNT_SUCCESS:
        return {
          ...state,
          count: action.payload.count,
          error: null,
        };
      case GET_DEPARTMENTS_COUNT_FAILURE:
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
      case GET_DEPARTMENT_SUCCESS:
        return {
          ...state,
          department: action.payload.department,
          error: null,
        };
      case GET_DEPARTMENT_FAILURE:
        return {
          ...state,
          department: null,
          error: action.payload.error,
        };
  
      case UPDATE_DEPARTMENT:
        return { ...state };
  
      case UPDATE_DEPARTMENT_SUCCESS:
        return {
          ...state,
          departments: state.departments.map((department) =>
            department.id === action.payload.department.id
              ? action.payload.department
              : department
          ),
          department: action.payload.department,
        };
      case UPDATE_DEPARTMENT_ERROR:
        return { ...state, error: action.payload.error };
  
      case DELETE_DEPARTMENT:
        return { ...state };
  
      case DELETE_DEPARTMENT_SUCCESS:
        return {
          ...state,
          departments: state.departments.filter(
            (department) => department.id !== action.payload.id
          ),
        };
      case DELETE_DEPARTMENT_ERROR:
        return { ...state, error: action.payload.error };
      case CREATE_DEPARTMENT:
        return { ...state };
      case CREATE_DEPARTMENT_SUCCESS:
        return {
          ...state,
          departments: [...state.departments, action.payload.department],
        };
      case CREATE_DEPARTMENT_ERROR:
        return { ...state, error: action.payload.error };
      default:
        return state;
    }
  };
  