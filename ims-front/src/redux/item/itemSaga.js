import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import fetchData from "../../utils/fetchData";
//import { ITEM_LIST, SET_ITEM_LIST } from "../constants";
import {
  GET_ITEMS_REQUEST,
  GET_ITEM_REQUEST,
  CREATE_ITEM,
  UPDATE_ITEM,
  GET_ITEMS_COUNT,
  DELETE_ITEM,
  CREATE_ITEM_ERROR,
} from "../constants";

import {
  getItemsSuccess,
  getItemsFailure,
  getItemSuccess,
  getItemFailure,
  updateItemSuccess,
  updateItemError,
  deleteItemSuccess,
  deleteItemError,
  createItemSuccess,
  createItemError,
  getItemsCountSuccess,
  getItemsCountFailure,
} from "./itemAction";
import { endPoint } from "../../constants/api-constants";

// Worker saga for getting all items
function* getItems(action) {
  const { type } = action.payload;
  const url = type ? `${endPoint}item?type=${type}` : `${endPoint}item`;
  try {
    const items = yield fetchData("GET", null, url); // call your API method here
    yield put(getItemsSuccess(items)); // dispatch action to update Redux store with retrieved items
  } catch (error) {
    yield put(getItemsFailure(error)); // dispatch action to update Redux store with error
  }
}
function* getCount() {
  try {
    const count = yield fetchData("GET", null, `${endPoint}item/count`); // call your API method here

    yield put(getItemsCountSuccess(count)); // dispatch action to update Redux store with retrieved items
  } catch (error) {
    yield put(getItemsCountFailure(error)); // dispatch action to update Redux store with error
  }
}

function* getItem(action) {
  const { id } = action.payload;

  try {
    const item = yield fetchData("GET", null, `${endPoint}item/${id}`); // call your API method here, passing in the ID as a parameter
    yield put(getItemSuccess(item)); // dispatch action to update Redux store with retrieved item
  } catch (error) {
    yield put(getItemFailure(error)); // dispatch action to update Redux store with error
  }
}

function* updateItemSaga(action) {
  const { id, body } = action.payload;
  try {
    const item = yield fetchData("PATCH", body, `${endPoint}item/${id}`);
    //yield call("" action.payload.item);
    yield put(updateItemSuccess(item));
  } catch (error) {
    yield put(updateItemError(error));
  }
}

function* deleteItemSaga(action) {
  const { id } = action.payload;
  try {
    yield fetchData("DELETE", null, `${endPoint}item/${id}`);
    yield put(deleteItemSuccess(action.payload.id));
  } catch (error) {
    yield put(deleteItemError(error));
  }
}

function* createItemSaga(action) {
  const { body } = action.payload;
  try {
    const item = yield fetchData("POST", body, `${endPoint}item`);

    if (item.statusCode != 200) {
      yield put({
        type: CREATE_ITEM_ERROR,
        payload: item.message,
      });
    } else {
      yield put(createItemSuccess(item));
    }
  } catch (error) {
    yield put(createItemError(error));
  }
}
function* itemSaga() {
  yield takeLatest(GET_ITEMS_REQUEST, getItems);
  yield takeLatest(GET_ITEM_REQUEST, getItem);
  yield takeLatest(CREATE_ITEM, createItemSaga);
  yield takeLatest(UPDATE_ITEM, updateItemSaga);
  yield takeLatest(DELETE_ITEM, deleteItemSaga);
  yield takeLatest(GET_ITEMS_COUNT, getCount);
}
export default itemSaga;
