import React from "react";
import DataCard from "../../../components/shared/DataCard";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Chart from "../../../components/shared/Chart";
import "./sadashboard.css";
import { getOrganizationsCount } from "../../../redux/organization/organizationAction";
import { getUsersCount } from "../../../redux/users/usersAction";
import {
  getComplaintCount,
  getComplaintsRequest,
} from "../../../redux/complaints/complaintAction";
import GraphTabs from "../../../components/shared/graph-tabs/GraphTabs";
import MyTables from "../../../components/shared/MyTable";
import { SuperAdminDashboardHeader } from "../../../constants/table-constants/tableConstants";
import { Box } from "@mui/material";
import useScreenSize from "../../../utils/checkScreenSize";
import ExpandTables from "../../../components/shared/expand-tables/ExpandTables";
import { generatePdf } from "../../../utils/pdfGenerator";
function SADashboardPage() {
  const { complaintData, organizationData, usersData } = useSelector(
    (state) => state
  );
  const tableData = complaintData.complaints;
  const organizationCount = organizationData?.count;
  const userCount = usersData?.count;
  const complaintCount = complaintData?.count;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };
  const isMatch = useScreenSize();
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
          totalCount={organizationCount.total}
          name={"Organization"}
          monthDifference={
            organizationCount?.currentMonth?.count == undefined
              ? 0
              : organizationCount?.currentMonth?.count
          }
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
      <GraphTabs
        handleChange={handleChangeTabs}
        value={value}
        action={() =>
          generatePdf(
            value == 0
              ? organizationCount?.monthlyCount
              : userCount?.monthlyCount,
            "monhly data"
          )
        }
      />
      <div className="barchart">
        <Chart
          data={
            value == 0
              ? organizationCount?.monthlyCount
              : userCount?.monthlyCount
          }
          dataKeyX={"month"}
          dataKeyY={"count"}
        />
      </div>
      <ExpandTables heading={"Recent Complaints"} to={"/complaints"} />
      <Box sx={{ marginTop: "-2%" }}>
        <MyTables
          data={tableData.slice(0, 5)}
          tableHeaders={SuperAdminDashboardHeader}
          routes={"/complaints/detail"}
          noPagination={true}
        />
      </Box>
    </div>
  );
}

export default SADashboardPage;
