import { fork } from "redux-saga/effects";
import userSaga from "./login/userSaga";
import usersSaga from "./users/usersSaga";
import organizationSaga from "./organization/organizationSaga";
import complainSaga from "./complaints/complaintSaga";
import itemSaga from "./item/itemSaga"
import departmentSaga from "./departments/departmentSaga";
import categorySaga from "./category/categorySaga";
import vendorSaga from "./vendor/vendorSaga";
import requestSaga from "./request/requestSaga";
export default function * rootSaga(){
    yield fork(userSaga)
    yield fork(organizationSaga)
    yield fork(usersSaga)
    yield fork(complainSaga)
    yield fork(itemSaga)
    yield fork(departmentSaga)
    yield fork(categorySaga)
    yield fork(requestSaga)
    yield fork(vendorSaga)
}