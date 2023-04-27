//import { SET_COMPLAINT_LIST } from "../constants"
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
  GET_COMPLAINT_COUNT,
} from "../constants";

const initialState = {
  complaints: [],
  myComp:[],
  complaint: null,
  error: null,
  count: {
    monthlyCount: [],
    currentMonth: {
      Pending: 0,
      Resolved: 0,
    },
    total: {
      Pending: 0,
      Resolved: 0,
    },
  },
};

// export const complaintData = (data = [], action) => {
//   switch (action.type) {
//     case SET_COMPLAINT_LIST:
//       return[...action.data]
//     default:
//       return data;

//   }
// };

export const complaintData = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPLAINTS_SUCCESS:
      console.log(action.payload.complaints.myComplaints)
      return {
        ...state,
        complaints: action.payload.complaints.complaints,
        myComp:action.payload.complaints?.myComplaints?action.payload.complaints.myComplaints:[],
        error: null,
      };
    case GET_COMPLAINTS_FAILURE:
      return {
        ...state,
        complaints: [],
        myComp:[],
        error: action.payload.error,
      };
    case GET_COMPLAINT_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload.count,
        error: null,
      };
    case GET_COMPLAINT_COUNT_FAILURE:
      return {
        ...state,
        count: {
          monthlyCount: [],
          currentMonth: {
            Pending: 0,
            Resolved: 0,
          },
          total: {
            Pending: 0,
            Resolved: 0,
          },
        },
        error: action.payload.error,
      };
    case GET_COMPLAINT_SUCCESS:
      return {
        ...state,
        complaint: action.payload.complaint,
        error: null,
      };
    case GET_COMPLAINT_FAILURE:
      return {
        ...state,
        complaint: null,
        error: action.payload.error,
      };

    case UPDATE_COMPLAINT:
      return { ...state };

    case UPDATE_COMPLAINT_SUCCESS:
      return {
        ...state,
        complaints: state.complaints.map((comp) =>
          comp.id === action.payload.complaint.id
            ? action.payload.complaint
            : comp
        ),
        complaint: action.payload.complaint,
      };
    case UPDATE_COMPLAINT_ERROR:
      return { ...state, error: action.payload.error };

    case DELETE_COMPLAINT:
      return { ...state };

    case DELETE_COMPLAINT_SUCCESS:
      return {
        ...state,
        complaints: state.complaints.filter(
          (comp) => comp.id !== action.payload.id
        ),
      };
    case DELETE_COMPLAINT_ERROR:
      return { ...state, error: action.payload.error };
    case CREATE_COMPLAINT:
      return { ...state };
    case CREATE_COMPLAINT_SUCCESS:
      return {
        ...state,
        complaints: [...state.complaints, action.payload.complaint],
      };
    case CREATE_COMPLAINT_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
