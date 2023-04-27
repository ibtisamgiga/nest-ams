import {
    GET_VENDORS_REQUEST,
    GET_VENDORS_FAILURE,
    GET_VENDOR_REQUEST,
    GET_VENDORS_SUCCESS,
    GET_VENDOR_FAILURE,
    GET_VENDOR_SUCCESS,
    UPDATE_VENDOR,
    UPDATE_VENDOR_SUCCESS,
    UPDATE_VENDOR_ERROR,
    DELETE_VENDOR,
    DELETE_VENDOR_ERROR,
    DELETE_VENDOR_SUCCESS,
    CREATE_VENDOR,
    CREATE_VENDOR_SUCCESS,
    CREATE_VENDOR_ERROR,
    GET_VENDORS_COUNT_SUCCESS,
    GET_VENDORS_COUNT_FAILURE,
    GET_VENDORS_COUNT,
  } from "../constants";
  // export const fetchOrgaizationList = () => {
  //   return {
  //     type: VENDOR_LIST,
  //   };
  // };
  
  export const getVendorsRequest = () => ({
    type: GET_VENDORS_REQUEST,
  });
  
  export const getVendorsSuccess = (vendors) => ({
    type: GET_VENDORS_SUCCESS,
    payload: { vendors },
  });
  
  export const getVendorsFailure = (error) => ({
    type: GET_VENDORS_FAILURE,
    payload: { error },
  });
  
  export const getVendorRequest = (id) => ({
    type: GET_VENDOR_REQUEST,
    payload: { id },
  });
  
  export const getVendorSuccess = (vendor) => ({
    type: GET_VENDOR_SUCCESS,
    payload: { vendor },
  });
  
  export const getVendorFailure = (error) => ({
    type: GET_VENDOR_FAILURE,
    payload: { error },
  });
  
  export const updateVendor = (Vendor, id) => ({
    type: UPDATE_VENDOR,
    payload: { body: Vendor, id },
  });
  
  export const updateVendorSuccess = (Vendor) => ({
    type: UPDATE_VENDOR_SUCCESS,
    payload: { Vendor },
  });
  
  export const updateVendorError = (error) => ({
    type: UPDATE_VENDOR_ERROR,
    payload: { error },
  });
  
  export const deleteVendor = (id) => ({
    type: DELETE_VENDOR,
    payload: { id },
  });
  
  export const deleteVendorSuccess = (id) => ({
    type: DELETE_VENDOR_SUCCESS,
    payload: { id },
  });
  
  export const deleteVendorError = (error) => ({
    type: DELETE_VENDOR_ERROR,
    payload: { error },
  });
  
  export const createVendor = (Vendor) => ({
    type: CREATE_VENDOR,
    payload: { body: Vendor },
  });
  
  export const createVendorSuccess = (Vendor) => ({
    type: CREATE_VENDOR_SUCCESS,
    payload: { body: Vendor },
  });
  
  export const createVendorError = (error) => ({
    type: CREATE_VENDOR_ERROR,
    payload: { error },
  });
  
  export const getVendorsCount = () => ({
    type: GET_VENDORS_COUNT,
  });
  
  export const getVendorsCountSuccess = (count) => ({
    type: GET_VENDORS_COUNT_SUCCESS,
    payload: { count },
  });
  
  export const getVendorsCountFailure = (error) => ({
    type: GET_VENDORS_COUNT_FAILURE,
    payload: { error },
  });
  