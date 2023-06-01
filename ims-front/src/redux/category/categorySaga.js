import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import fetchData from "../../utils/fetchData";
//import { CATEGORY_LIST, SET_CATEGORY_LIST } from "../constants";
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORY_REQUEST,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES_DETAIL_REQUEST,
  GET_CATEGORIES_COUNT,
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
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
  createCategoryError,
  createCategorySuccess,
  getCategoriesDetailSuccess,
  getCategoriesDetailFailure,
  deleteCategorySuccess,
  deleteCategoryError,
} from "./categoryAction";
import { endPoint } from "../../constants/api-constants";
// Worker saga for getting all organizations
function* getCategories() {
  try {
    const categories = yield fetchData("GET", null, `${endPoint}category`); // call your API method here
    yield put(getCategoriesSuccess(categories)); // dispatch action to update Redux store with retrieved organizations
  } catch (error) {
    yield put(getCategoriesFailure(error)); // dispatch action to update Redux store with error
  }
}

function* getDetails() {
  try {
    const details = yield fetchData("GET", null, `${endPoint}category/details`); // call your API method here
    yield put(getCategoriesDetailSuccess(details)); // dispatch action to update Redux store with retrieved organizations
  } catch (error) {
    yield put(getCategoriesDetailFailure(error)); // dispatch action to update Redux store with error
  }
}
function* getCount() {
  try {
    const count = yield fetchData("GET", null, `${endPoint}category/count`); // call your API method here

    yield put(getCategoryCountSuccess(count)); // dispatch action to update Redux store with retrieved organizations
  } catch (error) {
    yield put(getCategoryCountFailure(error)); // dispatch action to update Redux store with error
  }
}

function* getCategory(action) {
  const { id } = action.payload;

  try {
    const category = yield fetchData("GET", null, `${endPoint}category/${id}`); // call your API method here, passing in the ID as a parameter
    yield put(getCategorySuccess(category)); // dispatch action to update Redux store with retrieved organization
  } catch (error) {
    yield put(getCategoryFailure(error)); // dispatch action to update Redux store with error
  }
}

function* updateCategorySaga(action) {
  const { id, body } = action.payload;
  try {
    const category = yield fetchData(
      "PATCH",
      body,
      `${endPoint}category/${id}`
    );
    if (category.statusCode != 200) {
      yield put(updateCategoryError(category.message));
    } else {
      yield put(updateCategorySuccess(category));
    }
    //yield put(updateCategorySuccess(category));
  } catch (error) {
    yield put(updateCategoryError(error));
  }
}

function* createCategorySaga(action) {
  const { body } = action.payload;
  try {
    const category = yield fetchData("POST", body, `${endPoint}category`);

    if (category.statusCode != 200) {
      yield put({ type: CREATE_CATEGORY_ERROR, payload: category.message });
    } else {
      yield put(createCategorySuccess(category));
    }
  } catch (error) {
    yield put(createCategoryError(error));
  }
}
function* deleteCategorySaga(action) {
  const { id } = action.payload;
  try {
    yield fetchData("DELETE", null, `${endPoint}category/${id}`);

    yield put(deleteCategorySuccess(action.payload.id));
  } catch (error) {
    yield put(deleteCategoryError(error));
  }
}

function* categorySaga() {
  yield takeLatest(GET_CATEGORIES_REQUEST, getCategories);
  yield takeLatest(GET_CATEGORIES_DETAIL_REQUEST, getDetails);
  yield takeLatest(GET_CATEGORY_REQUEST, getCategory);
  yield takeLatest(GET_CATEGORIES_COUNT, getCount);
  yield takeLatest(CREATE_CATEGORY, createCategorySaga);
  yield takeLatest(UPDATE_CATEGORY, updateCategorySaga);
  yield takeLatest(DELETE_CATEGORY, deleteCategorySaga);
}
export default categorySaga;
