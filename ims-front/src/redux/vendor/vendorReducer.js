//import { SET_VENDOR_LIST } from "../constants"
import {
  GET_VENDORS_VENDOR,
  GET_VENDORS_FAILURE,
  GET_VENDOR_VENDOR,
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

const initialState = {
  vendors: [],
  vendor: null,
  error: null,
  count: {
    currentMonth: 0,
    total: 0,
  },
};

export const vendorData = (state = initialState, action) => {
  switch (action.type) {
    case GET_VENDORS_SUCCESS:
      return {
        ...state,
        vendors: action.payload.vendors,
        error: null,
      };
    case GET_VENDORS_FAILURE:
      return {
        ...state,
        vendors: [],
        error: action.payload.error,
      };
    case GET_VENDORS_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload.count,
        error: null,
      };
    case GET_VENDORS_COUNT_FAILURE:
      return {
        ...state,
        count: {
          currentMonth: 0,
          total: 0,
        },
        error: action.payload.error,
      };
    case GET_VENDOR_SUCCESS:
      return {
        ...state,
        vendor: action.payload.vendor,
        error: null,
      };
    case GET_VENDOR_FAILURE:
      return {
        ...state,
        vendor: null,
        error: action.payload.error,
      };

    case UPDATE_VENDOR:
      return { ...state };

    case UPDATE_VENDOR_SUCCESS:
      return {
        ...state,
        vendors: state.vendors.map((vendor) =>
          vendor.id === action.payload.vendor.id
            ? action.payload.vendor
            : vendor
        ),
        vendor: action.payload.vendor,
      };
    case UPDATE_VENDOR_ERROR:
      return { ...state, error: action.payload.error };

    case DELETE_VENDOR:
      return { ...state };

    case DELETE_VENDOR_SUCCESS:
      return {
        ...state,
        vendors: state.vendors.filter(
          (vendor) => vendor.id !== action.payload.id
        ),
      };
    case DELETE_VENDOR_ERROR:
      return { ...state, error: action.payload.error };
    case CREATE_VENDOR:
      return { ...state };
    case CREATE_VENDOR_SUCCESS:
      return {
        ...state,
        vendors: [...state.vendors, action.payload.vendor],
        error: null,
      };
    case CREATE_VENDOR_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
