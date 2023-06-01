//import { SET_CATEGORY_LIST } from "../constants"
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORY_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_ERROR,
  DELETE_CATEGORY_SUCCESS,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
  GET_CATEGORIES_COUNT_SUCCESS,
  GET_CATEGORIES_COUNT_FAILURE,
  GET_CATEGORIES_COUNT,
  GET_CATEGORIES_DETAIL_SUCCESS,
  GET_CATEGORIES_DETAIL_FAILURE,
} from "../constants";

const initialState = {
  categories: [],
  details: [],
  category: null,
  error: null,
  count: {
    monthlyCount: [],
    currentMonth: {
      month: null,
      count: 0,
    },
    total: 0,
  },
};

// export const categoryData = (data = [], action) => {
//   switch (action.type) {
//     case SET_CATEGORY_LIST:
//       return[...action.data]
//     default:
//       return data;

//   }
// };

export const categoryData = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        error: null,
      };
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: [],
        error: action.payload.error,
      };
    case GET_CATEGORIES_DETAIL_SUCCESS:
      return {
        ...state,
        details: action.payload.details,
        error: null,
      };
    case GET_CATEGORIES_DETAIL_FAILURE:
      return {
        ...state,
        details: [],
        error: action.payload.error,
      };
    case GET_CATEGORIES_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload.count,
        error: null,
      };
    case GET_CATEGORIES_COUNT_FAILURE:
      return {
        ...state,
        count: {
          monthCount: [],
          currentMonth: {
            month: null,
            count: 0,
          },
          total: 0,
        },
        error: action.payload.error,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload.category,
        error: null,
      };
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        category: null,
        error: action.payload.error,
      };

    case UPDATE_CATEGORY:
      return { ...state };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((comp) =>
          comp.id === action.payload.category.id
            ? action.payload.category
            : comp
        ),
        category: action.payload.category,
      };
    case UPDATE_CATEGORY_ERROR:
      return { ...state, error: action.payload.error };

    case DELETE_CATEGORY:
      return { ...state };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (comp) => comp.id !== action.payload.id
        ),
      };
    case DELETE_CATEGORY_ERROR:
      return { ...state, error: action.payload.error };
    case CREATE_CATEGORY:
      return { ...state };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload.category],
        error: null,
      };
    case CREATE_CATEGORY_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
