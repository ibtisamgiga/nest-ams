import { combineReducers } from "redux";
import{userData}from"./login/userReducer"
import{usersData}from"./users/usersReducer"
import{organizationData}from"./organization/organizationReducer"
import{complaintData}from"./complaints/complaintReducer"
import{itemData}from"./item/itemReducer"
import{departmentData}from "./departments/departmentReducer"
import{categoryData}from "./category/categoryReducer"
import { requestData } from "./request/requestReducer";
import { vendorData } from "./vendor/vendorReducer"
export default combineReducers({
  userData,organizationData,usersData,complaintData,itemData,departmentData,categoryData,requestData,vendorData
});
