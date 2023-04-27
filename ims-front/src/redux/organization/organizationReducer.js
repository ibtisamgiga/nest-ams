//import { SET_ORGANIZATION_LIST } from "../constants"
import {
  GET_ORGANIZATIONS_REQUEST,
  GET_ORGANIZATIONS_FAILURE,
  GET_ORGANIZATION_REQUEST,
  GET_ORGANIZATIONS_SUCCESS,
  GET_ORGANIZATION_FAILURE,
  GET_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_ERROR,
  DELETE_ORGANIZATION,
  DELETE_ORGANIZATION_ERROR,
  DELETE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_ERROR,
  GET_ORGANIZATIONS_COUNT_SUCCESS,
  GET_ORGANIZATIONS_COUNT_FAILURE,
  GET_ORGANIZATIONS_COUNT,
} from "../constants";

const initialState = {
  organizations: [],
  organization: null,
  error: null,
  count: {
    monthlyCount: [],
    currentMonth: {
      count: 0,
    },
    total: 0,
  },
};

// export const organizationData = (data = [], action) => {
//   switch (action.type) {
//     case SET_ORGANIZATION_LIST:
//       return[...action.data]
//     default:
//       return data;

//   }
// };

export const organizationData = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        organizations: action.payload.organizations,
        error: null,
      };
    case GET_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        organizations: [],
        error: action.payload.error,
      };
    case GET_ORGANIZATIONS_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload.count,
        error: null,
      };
    case GET_ORGANIZATIONS_COUNT_FAILURE:
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
    case GET_ORGANIZATION_SUCCESS:
      return {
        ...state,
        organization: action.payload.organization,
        error: null,
      };
    case GET_ORGANIZATION_FAILURE:
      return {
        ...state,
        organization: null,
        error: action.payload.error,
      };

    case UPDATE_ORGANIZATION:
      return { ...state };

    case UPDATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        organizations: state.organizations.map((org) =>
          org.id === action.payload.organization.id
            ? action.payload.organization
            : org
        ),
        organization: action.payload.organization,
      };
    case UPDATE_ORGANIZATION_ERROR:
      return { ...state, error: action.payload.error };

    case DELETE_ORGANIZATION:
      return { ...state };

    case DELETE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        organizations: state.organizations.filter(
          (org) => org.id !== action.payload.id
        ),
      };
    case DELETE_ORGANIZATION_ERROR:
      return { ...state, error: action.payload.error };
    case CREATE_ORGANIZATION:
      return { ...state };
    case CREATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        organizations: [...state.organizations, action.payload.organization],
      };
    case CREATE_ORGANIZATION_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
