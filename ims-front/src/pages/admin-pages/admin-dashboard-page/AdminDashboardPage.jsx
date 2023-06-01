import React from "react";
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
import useScreenSize from "../../../utils/checkScreenSize";
import { border } from "../../../constants/admin-pages/admin-dashbord-contants";
function AdminDashboardPage() {
  const isMatch = useScreenSize();
  const { usersData, categoryData, vendorData, itemData, complaintData } =
    useSelector((state) => state);
  const userCount = usersData?.count;
  const categoryCount = categoryData?.count;
  const vendorCount = vendorData?.count;
  const itemCount = itemData?.count;
  const complaintCount = complaintData?.count;
  const complaints = complaintData.complaints.slice(0, 5);
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
          border={isMatch ? "" : border}
          totalCount={userCount?.total}
          name={"Employees"}
          monthDifference={userCount?.currentMonth?.count}
        />
        <DataCard
          border={isMatch ? "" : border}
          totalCount={itemCount?.total}
          name={"Inventory Items"}
          monthDifference={
            itemCount?.currentCount?.count == undefined
              ? 0
              : itemCount?.currentCount?.count
          }
        />
        <DataCard
          border={isMatch ? "" : border}
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
          monthDifference={categoryCount?.currentMonthCount?.count}
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
        {itemCount?.monthlyCount ? (
          <Chart
            data={itemCount?.monthlyCount}
            multi={true}
            dataKeyX={"category"}
            dataKeyY={"assigned"}
            dataKeyY2={"unassigned"}
          />
        ) : (
          <CircularLoader />
        )}
        {!complaintCount?.monthlyCount ? (
          <CircularLoader />
        ) : (
          <Chart
            data={complaintCount?.monthlyCount}
            multi={true}
            dataKeyX={"month"}
            dataKeyY={"Pending"}
            dataKeyY2={"Resolved"}
          />
        )}
      </div>
      <ExpandTables heading={"Recent Complaints"} to={"/complaints"} />
      <Box sx={{ marginTop: "-2%" }}>
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
