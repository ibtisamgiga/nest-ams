import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import fetchData from "../../utils/fetchData";
//import { CATEGORY_LIST, SET_CATEGORY_LIST } from "../constants";
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

import {
  getCategoriesSuccess,
  getCategoriesFailure,
  getCategorySuccess,
  getCategoryFailure,
  getCategoryCountFailure,
  getCategoryCountSuccess,
  updateCategorySuccess,
  updateCategoryError,
  createCategoryError,createCategorySuccess
} from "./categoryAction";
// Worker saga for getting all organizations
function* getCategories() {
  try {
    const categories = yield fetchData(
      "GET",
      null,
      "http://localhost:5000/category"
    ); // call your API method here
    yield put(getCategoriesSuccess(categories)); // dispatch action to update Redux store with retrieved organizations
  } catch (error) {
    yield put(getCategoriesFailure(error)); // dispatch action to update Redux store with error
  }
}
function* getCount() {
  try {
    const count= yield fetchData(
      "GET",
      null,
      "http://localhost:5000/category/count"
    ); // call your API method here
    console.log(count,'saga')
    yield put(getCategoryCountSuccess(count)); // dispatch action to update Redux store with retrieved organizations
  } catch (error) {
    yield put(getCategoryCountFailure(error)); // dispatch action to update Redux store with error
  }
}

function* getCategory(action) {
  const { id } = action.payload;

  try {
    const category = yield fetchData(
      "GET",
      null,
      `http://localhost:5000/category/${id}`
    ); // call your API method here, passing in the ID as a parameter
    yield put(getCategorySuccess(category)); // dispatch action to update Redux store with retrieved organization
  } catch (error) {
    yield put(getCategoryFailure(error)); // dispatch action to update Redux store with error
  }
}

function* updateCategorySaga(action) {
  const { id, body } = action.payload;
  try {
    const category = yield fetchData(
      "PUT",
      body,
      `http://localhost:5000/category/${id}`
    );
    //yield call("" action.payload.organization);
    yield put(updateCategorySuccess(category));
  } catch (error) {
    yield put(updateCategoryError(error));
  }
}

function* createCategorySaga(action) {
    const { body } = action.payload;
    try {     const category = yield fetchData("POST", body, `http://localhost:5000/category`);
      console.log(category, "csaga");
      if (category.error) {
        yield put(createCategoryError(category.message));
      }
      yield put(createCategorySuccess(category));
    } catch (error) {
      yield put(createCategoryError(error));
    }
  }

function* categorySaga() {
  yield takeLatest(GET_CATEGORIES_REQUEST, getCategories);
  //yield takeEvery(CATEGORY_LIST, getOrganizations);

  yield takeLatest(GET_CATEGORY_REQUEST, getCategory);
  yield takeLatest(GET_CATEGORIES_COUNT,getCount)
     yield takeLatest(CREATE_CATEGORY, createCategorySaga);
     yield takeLatest(UPDATE_CATEGORY, updateCategorySaga);
  //   yield takeLatest(DELETE_CATEGORY, deleteOrganizationSaga);
}
export default categorySaga;
