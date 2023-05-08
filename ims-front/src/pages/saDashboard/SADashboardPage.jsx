import React from "react";
import DataCard from "../../components/shared/DataCard";
import { useTheme, useMediaQuery, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import { BarChart } from '@mui/icons-material';
// import countBarChart from './BarChart';
import Chart from "../../components/shared/Chart";
import "./sadashboard.css";
import { getOrganizationsCount } from "../../redux/organization/organizationAction";
import { getUsersCount } from "../../redux/users/usersAction";
import {
  getComplaintCount,
  getComplaintsRequest,
} from "../../redux/complaints/complaintAction";
import GraphTabs from "../../components/shared/graph-tabs/GraphTabs";
import MyTables from "../../components/shared/MyTable";
function SADashboardPage() {
  const header = [
    "ID",
    "Admin Name",
    "Organization",
    "Description",
    "Submission Date",
    "Status",
    "Action",
  ];
  const tableData = useSelector((state) => state.complaintData.complaints);
  const orgCount = useSelector((state) => state.organizationData?.count);
  const userCount = useSelector((state) => state.usersData?.count);
  const complaintCount = useSelector((state) => state.complaintData?.count);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = React.useState(0);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getOrganizationsCount());
    dispatch(getUsersCount());
    dispatch(getComplaintCount());
    dispatch(getComplaintsRequest());
  }, [dispatch]);

  return (
    <div className="body">
      <h1>Dashboard</h1>
      <div className={isMatch ? "row-md" : "row"}>
        <DataCard
          border={isMatch ? "" : "solid  #e3e3e3 2px"}
          totalCount={orgCount.total}
          name={"Organization"}
          monthDifference={orgCount?.currentMonth?.count}
        />
        <DataCard
          border={isMatch ? "" : "solid  #e3e3e3 2px"}
          totalCount={userCount?.total}
          name={"Admins"}
          monthDifference={userCount?.currentMonth?.count}
        />
        <DataCard
          arrowColor={"red"}
          border={isMatch ? "" : "solid  #e3e3e3 2px"}
          totalCount={complaintCount?.total?.Pending}
          name={"Pending Complaints"}
          monthDifference={
            complaintCount?.currentMonth?.Pending == undefined
              ? 0
              : complaintCount?.currentMonth?.Pending
          }
        />
        <DataCard
          totalCount={complaintCount?.total?.Resolved}
          name={"Resolved Complaints"}
          monthDifference={
            complaintCount?.currentMonth?.Resolved == undefined
              ? 0
              : complaintCount?.currentMonth?.Resolved
          }
        />
      </div>
      <GraphTabs handleChange={handleChangeTabs} value={value} />
      <div className="barchart">
        <Chart
          data={value == 0 ? orgCount?.monthlyCount : userCount?.monthlyCount}
          dataKeyX={"month"}
          dataKeyY={"count"}
        />
      </div>
      <Box sx={{ marginTop: "1%" }}>
        <MyTables
          data={tableData}
          tableHeaders={header}
          createData={(tableData) => {
            return { ...tableData };
          }}
          routes={"/complaints/detail"}
        />
      </Box>
    </div>
  );
}

export default SADashboardPage;
