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
  GET_CATEGORIES_COUNT
  } from "../constants";

  export const getCategoriesRequest = () => ({
    type: GET_CATEGORIES_REQUEST,
  });
  
  export const getCategoriesSuccess = (categories) => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: { categories },
  });
  
  export const getCategoriesFailure = (error) => ({
    type: GET_CATEGORIES_FAILURE,
    payload: { error },
  });
  
  export const getCategoryRequest = (id) => ({
    type: GET_CATEGORY_REQUEST,
    payload: { id },
  });
  
  export const getCategorySuccess = (category) => ({
    type: GET_CATEGORY_SUCCESS,
    payload: { category },
  });
  
  export const getCategoryFailure = (error) => ({
    type: GET_CATEGORY_FAILURE,
    payload: { error },
  });
  
  
  export const updateCategory = (category,id) => ({
    type: UPDATE_CATEGORY,
    payload: { body:category ,id},
  });
  
  export const updateCategorySuccess = (category) => ({
    type: UPDATE_CATEGORY_SUCCESS,
    payload: { category },
  });
  
  export const updateCategoryError = (error) => ({
    type: UPDATE_CATEGORY_ERROR,
    payload: { error },
  });
  
  export const deleteCategory = (id) => ({
    type: DELETE_CATEGORY,
    payload: { id },
  });
  
  export const deleteCategorySuccess = (id) => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload: { id },
  });
  
  export const deleteCategoryError = (error) => ({
    type: DELETE_CATEGORY_ERROR,
    payload: { error },
  });
  
  export const createCategory = (category) => ({
    type: CREATE_CATEGORY,
    payload: {body: category },
  });
  
  export const createCategorySuccess = (category) => ({
    type: CREATE_CATEGORY_SUCCESS,
    payload: { body:category },
  });
  
  export const createCategoryError = (error) => ({
    type: CREATE_CATEGORY_ERROR,
    payload: { error },
  });
  
  export const getCategoryCount = () => ({
    type: GET_CATEGORIES_COUNT,
  });
  
  export const getCategoryCountSuccess = (count) => (
    
    {
   
    type: GET_CATEGORIES_COUNT_SUCCESS,
    payload: { count },
  });
  
  export const getCategoryCountFailure = (error) => ({
    type: GET_CATEGORIES_COUNT_FAILURE,
    payload: { error },
  });



