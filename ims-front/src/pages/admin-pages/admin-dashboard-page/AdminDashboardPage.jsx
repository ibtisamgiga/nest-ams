import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import DataCard from "../../../components/shared/DataCard";
import Chart from "../../../components/shared/Chart";
import "./admin-dashboard.css";
import { Box } from "@mui/system";
function AdminDashboardPage() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const monthlyData = [
    { name: "Jan", uv: 300, pv: 30 },
    { name: "Feb", uv: 800, pv: 60 },
    { name: "Mar", uv: 400, pv: 200 },
    { name: "Apr", uv: 200, pv: 70 },
    { name: "May", uv: 120, pv: 230 },
    { name: "Jun", uv: 600, pv: 500 },
    { name: "Jul", uv: 700, pv: 350 },
    { name: "Aug", uv: 850, pv: 300 },
    { name: "Sep", uv: 900, pv: 800 },
    { name: "Oct", uv: 1000, pv: 900 },
    { name: "Nov", uv: 1200, pv: 400 },
    { name: "Dec", uv: 1300, pv: 300 },
    // ...
  ];
  return (
    <div className="body">
      <h1>Dashboard</h1>

      <div className={isMatch ? "row-md" : "row"}>
        <DataCard
          border={isMatch ? "" : "solid  #e3e3e3 2px"}
          totalCount={500}
          name={"Employees"}
          monthDifference={10}
        />
        <DataCard
          border={isMatch ? "" : "solid  #e3e3e3 2px"}
          totalCount={200}
          name={"Inventory Items"}
          monthDifference={10}
        />
        <DataCard
          border={isMatch ? "" : "solid  #e3e3e3 2px"}
          totalCount={200}
          name={"Vendors"}
          monthDifference={120}
        />
        <DataCard totalCount={200} name={"Categories"} monthDifference={8} />
      </div>
      <div className={isMatch ? "barchart" : "barchart"}>
        <Chart data={monthlyData} multi={true} />
        <Chart data={monthlyData} multi={true}/>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
