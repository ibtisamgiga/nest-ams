import { takeEvery, put, takeLatest,select } from "redux-saga/effects";
import { SIGIN_IN,SET_USER,SET_ERROR } from "../constants";
import fetchData from "../../utils/fetchData";
import { setLocalStorage } from "../../utils/localStorageHelper";

function* siginIn({data}) {
  const state = yield select(); 
    let response=yield fetchData("POST", data,"http://localhost:5000/users/signin")
    if(response.error){
      yield put({type: SET_ERROR, payload:{error:response.message}})
    }else{
      yield put({type: SET_USER, payload:{response}})
    }
   if(!response.error){
    setLocalStorage(response);
   };
}




function* userSaga() {
  yield takeLatest(SIGIN_IN, siginIn);
  //   yield takeEvery(EVENT_LIST, getEvents);
  //   yield takeEvery(DELETE_EVENT, delEvents);
}
export default userSaga;
