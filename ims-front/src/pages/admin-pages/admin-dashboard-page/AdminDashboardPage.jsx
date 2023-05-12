import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import DataCard from "../../../components/shared/DataCard";
import Chart from "../../../components/shared/Chart";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./admin-dashboard.css";
import { Box } from "@mui/system";
import { getUsersCount } from "../../../redux/users/usersAction";
import { getCategoryCount } from "../../../redux/category/categoryAction";
import { getVendorsCount } from "../../../redux/vendor/vendorAction";
import { getItemsCount } from "../../../redux/item/itemAction";

import {
  getComplaintCount,
  getComplaintsRequest,
} from "../../../redux/complaints/complaintAction";
import MyTables from "../../../components/shared/MyTable";
import CircularLoader from "../../../components/shared/circular-loader/CircularLoader";
import { AdminDashboardHeader } from "../../../constants/table-constants/tableConstants";
import DownloadHeading from "../../../components/shared/download-heading/DownloadHeading";
import { generatePdf } from "../../../utils/pdfGenerator";
import ExpandTables from "../../../components/shared/expand-tables/ExpandTables";
function AdminDashboardPage() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { usersData, categoryData, vendorData, itemData, complaintData } =
    useSelector((state) => state);
  const userCount = usersData?.count;
  const categoryCount = categoryData?.count;
  const vendorCount = vendorData?.count;
  const itemCount = itemData?.count;
  const complaintCount = complaintData?.count;
  const complaints = complaintData.complaints;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryCount());
    dispatch(getUsersCount());
    dispatch(getVendorsCount());
    dispatch(getItemsCount());
    dispatch(getComplaintCount());
    dispatch(getComplaintsRequest());
  }, [dispatch]);

  return (
    <div className="body">
      <h1>Dashboard</h1>

      <div className={isMatch ? "row-md" : "row"}>
        <DataCard
          border={isMatch ? "" : "solid  #e3e3e3 2px"}
          totalCount={userCount?.total}
          name={"Employees"}
          monthDifference={userCount?.currentMonth?.count}
        />
        <DataCard
          border={isMatch ? "" : "solid  #e3e3e3 2px"}
          totalCount={itemCount?.total}
          name={"Inventory Items"}
          monthDifference={
            itemCount?.currentCount?.count == undefined
              ? 0
              : itemCount?.currentCount?.count
          }
        />
        <DataCard
          border={isMatch ? "" : "solid  #e3e3e3 2px"}
          totalCount={vendorCount?.total}
          name={"Vendors"}
          monthDifference={
            vendorCount?.currentMonth?.count == undefined
              ? 0
              : vendorCount?.currentMonth?.count
          }
        />
        <DataCard
          totalCount={categoryCount?.total}
          name={"Categories"}
          monthDifference={categoryCount?.currentMonth?.count}
        />
      </div>
      <DownloadHeading
        complainAction={() =>
          generatePdf(complaintCount?.monthlyCount, "monhly complaints")
        }
        categoryAction={() =>
          generatePdf(itemCount?.monthlyCount, "monhly items")
        }
      />
      <div className={isMatch ? "barchart" : "barchart"}>
        {itemCount?.monthlyCount.length != 0 ? (
          <Chart
            data={itemCount?.monthlyCount}
            multi={true}
            dataKeyX={"category"}
            dataKeyY={"Assigned"}
            dataKeyY2={"Unassigned"}
          />
        ) : (
          <CircularLoader />
        )}
        {complaintCount?.monthlyCount.length != 0 ? (
          <Chart
            data={complaintCount?.monthlyCount}
            multi={true}
            dataKeyX={"month"}
            dataKeyY={"Pending"}
            dataKeyY2={"Resolved"}
          />
        ) : (
          <CircularLoader />
        )}
      </div>
      <ExpandTables heading={"Recent Complaints"} to={"/complaints"} />
      <Box sx={{ marginTop: "2px" }}>
        <MyTables
          data={complaints}
          tableHeaders={AdminDashboardHeader}
          routes={"/complaints/detail"}
          noPagination={true}
        />
      </Box>
    </div>
  );
}

export default AdminDashboardPage;
