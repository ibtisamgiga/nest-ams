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
  // export const fetchOrgaizationList = () => {
  //   return {
  //     type: DEPARTMENT_LIST,
  //   };
  // };
  
  export const getDepartmentsRequest = () => ({
    type: GET_DEPARTMENTS_REQUEST,
  });
  
  export const getDepartmentsSuccess = (departments) => ({
    type: GET_DEPARTMENTS_SUCCESS,
    payload: { departments },
  });
  
  export const getDepartmentsFailure = (error) => ({
    type: GET_DEPARTMENTS_FAILURE,
    payload: { error },
  });
  
  export const getDepartmentRequest = (id) => ({
    type: GET_DEPARTMENT_REQUEST,
    payload: { id },
  });
  
  export const getDepartmentSuccess = (department) => ({
    type: GET_DEPARTMENT_SUCCESS,
    payload: { department },
  });
  
  export const getDepartmentFailure = (error) => ({
    type: GET_DEPARTMENT_FAILURE,
    payload: { error },
  });
  
  
  export const updateDepartment = (Department,id) => ({
    type: UPDATE_DEPARTMENT,
    payload: { body:Department ,id},
  });
  
  export const updateDepartmentSuccess = (Department) => ({
    type: UPDATE_DEPARTMENT_SUCCESS,
    payload: { Department },
  });
  
  export const updateDepartmentError = (error) => ({
    type: UPDATE_DEPARTMENT_ERROR,
    payload: { error },
  });
  
  export const deleteDepartment = (id) => ({
    type: DELETE_DEPARTMENT,
    payload: { id },
  });
  
  export const deleteDepartmentSuccess = (id) => ({
    type: DELETE_DEPARTMENT_SUCCESS,
    payload: { id },
  });
  
  export const deleteDepartmentError = (error) => ({
    type: DELETE_DEPARTMENT_ERROR,
    payload: { error },
  });
  
  export const createDepartment = (Department) => ({
    type: CREATE_DEPARTMENT,
    payload: {body: Department },
  });
  
  export const createDepartmentSuccess = (Department) => ({
    type: CREATE_DEPARTMENT_SUCCESS,
    payload: { body:Department },
  });
  
  export const createDepartmentError = (error) => ({
    type: CREATE_DEPARTMENT_ERROR,
    payload: { error },
  });
  
  
  export const getDepartmentsCount = () => ({
    type: GET_DEPARTMENTS_COUNT,
  });
  
  export const getDepartmentsCountSuccess = (count) => (
    
    {
   
    type: GET_DEPARTMENTS_COUNT_SUCCESS,
    payload: { count },
  });
  
  export const getDepartmentsCountFailure = (error) => ({
    type: GET_DEPARTMENTS_COUNT_FAILURE,
    payload: { error },
  });
  

  