//import { SET_ITEM_LIST } from "../constants"
import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_FAILURE,
    GET_ITEM_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEM_FAILURE,
    GET_ITEM_SUCCESS,
    UPDATE_ITEM,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_ERROR,
    DELETE_ITEM,
    DELETE_ITEM_ERROR,
    DELETE_ITEM_SUCCESS,
    CREATE_ITEM,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_ERROR,
  GET_ITEMS_COUNT_SUCCESS,
  GET_ITEMS_COUNT_FAILURE,
  GET_ITEMS_COUNT
  } from "../constants";
  
  const initialState = {
    items: [],
    item: null,
    error: null,
    count: {
      monthlyCount: [],
      currentMonth: {
        count: 0,
      },
      total: 0,
    },
  };
  
  // export const itemData = (data = [], action) => {
  //   switch (action.type) {
  //     case SET_ITEM_LIST:
  //       return[...action.data]
  //     default:
  //       return data;
  
  //   }
  // };
  
  export const itemData = (state = initialState, action) => {
    switch (action.type) {
      case GET_ITEMS_SUCCESS:
        return {
          ...state,
          items: action.payload.items,
          error: null,
        };
      case GET_ITEMS_FAILURE:
        return {
          ...state,
          items: [],
          error: action.payload.error,
        };
      case GET_ITEMS_COUNT_SUCCESS:
        return {
          ...state,
          count: action.payload.count,
          error: null,
        };
      case GET_ITEMS_COUNT_FAILURE:
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
      case GET_ITEM_SUCCESS:
        return {
          ...state,
          item: action.payload.item,
          error: null,
        };
      case GET_ITEM_FAILURE:
        return {
          ...state,
          item: null,
          error: action.payload.error,
        };
  
      case UPDATE_ITEM:
        return { ...state };
  
      case UPDATE_ITEM_SUCCESS:
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.item.id
              ? action.payload.item
              : item
          ),
          item: action.payload.item,
        };
      case UPDATE_ITEM_ERROR:
        return { ...state, error: action.payload.error };
  
      case DELETE_ITEM:
        return { ...state };
  
      case DELETE_ITEM_SUCCESS:
        return {
          ...state,
          items: state.items.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      case DELETE_ITEM_ERROR:
        return { ...state, error: action.payload.error };
      case CREATE_ITEM:
        return { ...state };
      case CREATE_ITEM_SUCCESS:
        return {
          ...state,
          items: [...state.items, action.payload.item],
        };
      case CREATE_ITEM_ERROR:
        return { ...state, error: action.payload.error };
      default:
        return state;
    }
  };
  