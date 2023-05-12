import React, { useEffect } from "react";
import { useTheme, useMediaQuery, Divider, Typography } from "@mui/material";
import "./employee-dashboard.css";
import StartIconButton from "../../../components/shared/StartIconButton";
import UserDetails from "../../../components/shared/user-detail-component/UserDetails";
import { Link } from "react-router-dom";
import ExpandTables from "../../../components/shared/expand-tables/ExpandTables";
import MyTables from "../../../components/shared/MyTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../../redux/users/usersAction";
import { getRequestsRequest } from "../../../redux/request/requestAction";
import { getComplaintsRequest } from "../../../redux/complaints/complaintAction";
import {
  EmployeeDashBoardComplaintsHeader,
  EmployeeDashBoardRequestHeader,
} from "../../../constants/table-constants/tableConstants";
function EmployeeDashboardPage({ handleChange }) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const logIn = useSelector((state) => state.userData); //{ name: "ali", role: "employee" };
  const id = logIn.token.id;
  const { usersData, requestData, complaintData } = useSelector(
    (state) => state
  );
  const userData = usersData.selectedUser;
  const requestDataTable = requestData?.requests;
  const complaintDataTable = complaintData.complaints;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(getRequestsRequest(null));
    dispatch(getComplaintsRequest());
  }, [dispatch]);

  return (
    <div className="body">
      {" "}
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Dashboard</h1>
        </div>

        <StartIconButton
          title={isMatch ? "Edit" : "Edit Profile"}
          width={8}
          editIcon={true}
          to={"/employee/edit"}
        />
      </div>
      <UserDetails
        image={userData?.image?.image}
        name={userData?.name}
        email={userData?.email}
        number={userData?.contactNo}
        totalExp={userData?.totalExp}
        companyExp={userData?.compExp}
        education={userData?.education}
        department={userData?.department}
        desiganation={userData?.designation}
      />
      <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      <ExpandTables heading={"Recent Requests"} to={"/requests"} />
      <MyTables
        data={requestDataTable}
        tableHeaders={EmployeeDashBoardRequestHeader}
        routes={"/request/detail"}
        noPagination={true}
      />
      <ExpandTables heading={"Recent Complaints"} to={"/complaints"} />
      <MyTables
        data={complaintDataTable}
        tableHeaders={EmployeeDashBoardComplaintsHeader}
        routes={"/complaints/detail"}
        noPagination={true}
      />
    </div>
  );
}

export default EmployeeDashboardPage;
