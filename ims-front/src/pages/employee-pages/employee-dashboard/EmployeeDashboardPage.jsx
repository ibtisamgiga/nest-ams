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
function EmployeeDashboardPage({ handleChange }) {
  const header = [
    "ID",
    "Employee Name",
    "Item Name",
    "Category",
    "Sub-category",
    "Date",
    "Status",
    "Action",
  ];
  const compHeader = [
    "ID",
    "Title",
    "Description",
    "Submission Date",
    "Status",
    "Action",
  ];
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const logIn = useSelector((state) => state.userData); //{ name: "ali", role: "employee" };
  const id = logIn.token.id;
  const userData = useSelector((state) => state.usersData.selectedUser);
  const requestData = useSelector((state) => state.requestData?.requests);
  const complaintData = useSelector((state) => state.complaintData.complaints);
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
        data={requestData}
        tableHeaders={header}
        routes={"/request/detail"}
      />
      <ExpandTables heading={"Recent Complaints"} to={"/complaints"} />
      <MyTables
        data={complaintData}
        tableHeaders={compHeader}
        routes={"/complaints/detail"}
      />
    </div>
  );
}

export default EmployeeDashboardPage;
