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
  GET_REQUESTS_COUNT,
} from "../constants";
// export const fetchOrgaizationList = () => {
//   return {
//     type: REQUEST_LIST,
//   };
// };

export const getRequestsRequest = () => ({
  type: GET_REQUESTS_REQUEST,
});

export const getRequestsSuccess = (requests) => ({
  type: GET_REQUESTS_SUCCESS,
  payload: { requests },
});

export const getRequestsFailure = (error) => ({
  type: GET_REQUESTS_FAILURE,
  payload: { error },
});

export const getRequestRequest = (id) => ({
  type: GET_REQUEST_REQUEST,
  payload: { id },
});

export const getRequestSuccess = (request) => ({
  type: GET_REQUEST_SUCCESS,
  payload: { request },
});

export const getRequestFailure = (error) => ({
  type: GET_REQUEST_FAILURE,
  payload: { error },
});

export const updateRequest = (Request, id) => ({
  type: UPDATE_REQUEST,
  payload: { body: Request, id },
});

export const updateRequestSuccess = (Request) => ({
  type: UPDATE_REQUEST_SUCCESS,
  payload: { Request },
});

export const updateRequestError = (error) => ({
  type: UPDATE_REQUEST_ERROR,
  payload: { error },
});

export const deleteRequest = (id) => ({
  type: DELETE_REQUEST,
  payload: { id },
});

export const deleteRequestSuccess = (id) => ({
  type: DELETE_REQUEST_SUCCESS,
  payload: { id },
});

export const deleteRequestError = (error) => ({
  type: DELETE_REQUEST_ERROR,
  payload: { error },
});

export const createRequest = (Request) => ({
  type: CREATE_REQUEST,
  payload: { body: Request },
});

export const createRequestSuccess = (Request) => ({
  type: CREATE_REQUEST_SUCCESS,
  payload: { body: Request },
});

export const createRequestError = (error) => ({
  type: CREATE_REQUEST_ERROR,
  payload: { error },
});

export const getRequestsCount = () => ({
  type: GET_REQUESTS_COUNT,
});

export const getRequestsCountSuccess = (count) => ({
  type: GET_REQUESTS_COUNT_SUCCESS,
  payload: { count },
});

export const getRequestsCountFailure = (error) => ({
  type: GET_REQUESTS_COUNT_FAILURE,
  payload: { error },
});
