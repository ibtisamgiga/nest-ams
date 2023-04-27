import React from "react";
import { useTheme, useMediaQuery, Divider, Typography } from "@mui/material";
import "./employee-dashboard.css";
import StartIconButton from "../../../components/shared/StartIconButton";
import UserDetails from "../../../components/shared/user-detail-component/UserDetails";
import { Link } from "react-router-dom";
import ExpandTables from "../../../components/shared/expand-tables/ExpandTables";
import MyTables from "../../../components/shared/MyTable";
function EmployeeDashboardPage({handleChange}) {
  const Data = [
    {
      id: 1,
      name: "jhon doe",
      itemName: "Mac-book",
      category: "electronics",
      subCategory: "laptop",
      date: "1/3/23",
      status: "pending",
    },

    {
      id: 2,
      name: "jhon doe",
      itemName: "Mac-book",
      category: "electronics",
      subCategory: "laptop",
      date: "1/3/23",
      status: "approved",
    },
    {
      id: 3,
      name: "jhon doe",
      itemName: "Mac-book",
      category: "electronics",
      subCategory: "laptop",
      date: "1/3/23",
      status: "resolved",
    },
  ];
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

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="body">
      {" "}
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Dashboard</h1>
        </div>

        <StartIconButton
          title={"Edit Profile"}
          width={8}
          editIcon={true}
          to={"/employee/edit"}
        />
      </div>
      <UserDetails />
      <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      <ExpandTables heading={"Recent Requests"} to={"/requests"} />
      <MyTables
        data={Data}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
        routes={"/request/detail"}
      />
      <ExpandTables heading={"Recent Complaints"} to={"/complaints"} />
      <MyTables
        data={Data}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
        routes={"/request/detail"}
      />
    </div>
  );
}

export default EmployeeDashboardPage;
