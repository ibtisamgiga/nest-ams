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
  // export const fetchOrgaizationList = () => {
  //   return {
  //     type: ITEM_LIST,
  //   };
  // };
  
  export const getItemsRequest = (type) => ({
    type: GET_ITEMS_REQUEST,
    payload: { type },
  });
  
  export const getItemsSuccess = (items) => ({
    type: GET_ITEMS_SUCCESS,
    payload: { items },
  });
  
  export const getItemsFailure = (error) => ({
    type: GET_ITEMS_FAILURE,
    payload: { error },
  });
  
  export const getItemRequest = (id) => ({
    type: GET_ITEM_REQUEST,
    payload: { id },
  });
  
  export const getItemSuccess = (item) => ({
    type: GET_ITEM_SUCCESS,
    payload: { item },
  });
  
  export const getItemFailure = (error) => ({
    type: GET_ITEM_FAILURE,
    payload: { error },
  });
  
  
  export const updateItem = (Item,id) => ({
    type: UPDATE_ITEM,
    payload: { body:Item ,id},
  });
  
  export const updateItemSuccess = (Item) => ({
    type: UPDATE_ITEM_SUCCESS,
    payload: { Item },
  });
  
  export const updateItemError = (error) => ({
    type: UPDATE_ITEM_ERROR,
    payload: { error },
  });
  
  export const deleteItem = (id) => ({
    type: DELETE_ITEM,
    payload: { id },
  });
  
  export const deleteItemSuccess = (id) => ({
    type: DELETE_ITEM_SUCCESS,
    payload: { id },
  });
  
  export const deleteItemError = (error) => ({
    type: DELETE_ITEM_ERROR,
    payload: { error },
  });
  
  export const createItem = (Item) => ({
    type: CREATE_ITEM,
    payload: {body: Item },
  });
  
  export const createItemSuccess = (Item) => ({
    type: CREATE_ITEM_SUCCESS,
    payload: { body:Item },
  });
  
  export const createItemError = (error) => ({
    type: CREATE_ITEM_ERROR,
    payload: { error },
  });
  
  
  export const getItemsCount = () => ({
    type: GET_ITEMS_COUNT,
  });
  
  export const getItemsCountSuccess = (count) => (
    
    {
   
    type: GET_ITEMS_COUNT_SUCCESS,
    payload: { count },
  });
  
  export const getItemsCountFailure = (error) => ({
    type: GET_ITEMS_COUNT_FAILURE,
    payload: { error },
  });
  

  