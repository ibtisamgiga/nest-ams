import {
    GET_COMPLAINTS_REQUEST,
    GET_COMPLAINTS_FAILURE,
    GET_COMPLAINT_REQUEST,
    GET_COMPLAINTS_SUCCESS,
    GET_COMPLAINT_FAILURE,
    GET_COMPLAINT_SUCCESS,
    UPDATE_COMPLAINT,
    UPDATE_COMPLAINT_SUCCESS,
    UPDATE_COMPLAINT_ERROR,
    DELETE_COMPLAINT,
    DELETE_COMPLAINT_ERROR,
    DELETE_COMPLAINT_SUCCESS,
    CREATE_COMPLAINT,
  CREATE_COMPLAINT_SUCCESS,
  CREATE_COMPLAINT_ERROR,
  GET_COMPLAINT_COUNT_SUCCESS,
  GET_COMPLAINT_COUNT_FAILURE,
  GET_COMPLAINT_COUNT
  } from "../constants";

  export const getComplaintsRequest = () => ({
    type: GET_COMPLAINTS_REQUEST,
  });
  
  export const getComplaintsSuccess = (complaints) => ({
    type: GET_COMPLAINTS_SUCCESS,
    payload: { complaints },
  });
  
  export const getComplaintsFailure = (error) => ({
    type: GET_COMPLAINTS_FAILURE,
    payload: { error },
  });
  
  export const getComplaintRequest = (id) => ({
    type: GET_COMPLAINT_REQUEST,
    payload: { id },
  });
  
  export const getComplaintSuccess = (complaint) => ({
    type: GET_COMPLAINT_SUCCESS,
    payload: { complaint },
  });
  
  export const getComplaintFailure = (error) => ({
    type: GET_COMPLAINT_FAILURE,
    payload: { error },
  });
  
  
  export const updateComplaint = (complaint,id) => ({
    type: UPDATE_COMPLAINT,
    payload: { body:complaint ,id},
  });
  
  export const updateComplaintSuccess = (complaint) => ({
    type: UPDATE_COMPLAINT_SUCCESS,
    payload: { complaint },
  });
  
  export const updateComplaintError = (error) => ({
    type: UPDATE_COMPLAINT_ERROR,
    payload: { error },
  });
  
  export const deleteComplaint = (id) => ({
    type: DELETE_COMPLAINT,
    payload: { id },
  });
  
  export const deleteComplaintSuccess = (id) => ({
    type: DELETE_COMPLAINT_SUCCESS,
    payload: { id },
  });
  
  export const deleteComplaintError = (error) => ({
    type: DELETE_COMPLAINT_ERROR,
    payload: { error },
  });
  
  export const createComplaint = (complaint) => ({
    type: CREATE_COMPLAINT,
    payload: {body: complaint },
  });
  
  export const createComplaintSuccess = (complaint) => ({
    type: CREATE_COMPLAINT_SUCCESS,
    payload: { body:complaint },
  });
  
  export const createComplaintError = (error) => ({
    type: CREATE_COMPLAINT_ERROR,
    payload: { error },
  });
  
  export const getComplaintCount = () => ({
    type: GET_COMPLAINT_COUNT,
  });
  
  export const getComplaintCountSuccess = (count) => (
    
    {
   
    type: GET_COMPLAINT_COUNT_SUCCESS,
    payload: { count },
  });
  
  export const getComplaintCountFailure = (error) => ({
    type: GET_COMPLAINT_COUNT_FAILURE,
    payload: { error },
  });
