import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import fetchData from "../../utils/fetchData";
//import { ITEM_LIST, SET_ITEM_LIST } from "../constants";
import {
GET_ITEMS_REQUEST,
GET_ITEM_REQUEST,
CREATE_ITEM
} from "../constants";
// function* getItems() {

//     let  data=yield fetchData("GET", null, "http://localhost:5000/item")
//     console.log(data,'org-data')
//     yield put({ type:SET_ITEM_LIST, data });
//     return;
//   }

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

// Worker saga for getting all items
function* getItems() {
  try {
    const items = yield fetchData("GET", null, "http://localhost:5000/item"); // call your API method here
    if(items.statusCode==401){
      localStorage.clear()
      //window.location.href('http://localhost:3000/')
    }
    yield put(getItemsSuccess(items)); // dispatch action to update Redux store with retrieved items
  } catch (error) {
    yield put(getItemsFailure(error)); // dispatch action to update Redux store with error
  }
}
// function* getCount() {
//   try {
//     const count = yield fetchData(
//       "GET",
//       null,
//       "http://localhost:5000/item/count"
//     ); // call your API method here
//     console.log(count, "saga");
//     yield put(getItemsCountSuccess(count)); // dispatch action to update Redux store with retrieved items
//   } catch (error) {
//     yield put(getItemsCountFailure(error)); // dispatch action to update Redux store with error
//   }
// }

function* getItem(action) {
   const { id } = action.payload;

   try {
     const item = yield fetchData(
       "GET",
       null,
       `http://localhost:5000/item/${id}`
     ); // call your API method here, passing in the ID as a parameter
     console.log(item)
     if(item.statusCode==401){
      localStorage.clear()
     // window.location.href('http://localhost:3000/')
    }
     yield put(getItemSuccess(item)); // dispatch action to update Redux store with retrieved item
   } catch (error) {
     yield put(getItemFailure(error)); // dispatch action to update Redux store with error
   }
 }

// function* updateItemSaga(action) {
//   const { id, body } = action.payload;
//   try {
//     const item = yield fetchData(
//       "PATCH",
//       body,
//       `http://localhost:5000/item/${id}`
//     );
//     //yield call("" action.payload.item);
//     yield put(updateItemSuccess(item));
//   } catch (error) {
//     yield put(updateItemError(error));
//   }
// }

// function* deleteItemSaga(action) {
//   const { id } = action.payload;
//   try {
//     yield fetchData("DELETE", null, `http://localhost:5000/item/${id}`);
//     yield put(deleteItemSuccess(action.payload.id));
//   } catch (error) {
//     yield put(deleteItemError(error));
//   }
// }

 function* createItemSaga(action) {
   const { body } = action.payload;
   try {
     const item = yield fetchData("POST", body, `http://localhost:5000/item`);
     console.log(item, "csaga");
     if (item.error) {
       yield put(createItemError(item.message));
     }
     yield put(createItemSuccess(item));
   } catch (error) {
     yield put(createItemError(error));
   }
 }
function* itemSaga() {
  yield takeLatest(GET_ITEMS_REQUEST, getItems);
  //yield takeEvery(ITEM_LIST, getItems);

   yield takeLatest(GET_ITEM_REQUEST, getItem);
  yield takeLatest(CREATE_ITEM, createItemSaga);
  // yield takeLatest(UPDATE_ITEM, updateItemSaga);
  // yield takeLatest(DELETE_ITEM, deleteItemSaga);
  // yield takeLatest(GET_ITEM_COUNT, getCount);
}
export default itemSaga;
