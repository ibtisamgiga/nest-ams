import React from "react";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
function AdminTabs({ handleChange ,orientation}) {
  return (
    <TabList sx={{ marginTop: "30px" }} orientation={orientation} onChange={handleChange}>
      <Tab label="DashBoard" value="/" />
      <Tab label="Inventory" value="/inventory" />
      <Tab label="Categories" value="/categories" />
      <Tab label="Departments" value="/departments" />
      <Tab label="Employees" value="/employees" />
      <Tab label="Requests" value="/requests" />
      <Tab label="Returns" value="/returns" />
      <Tab label="Complaints" value="/complaints" />
      <Tab label="Vendors" value="/vendors" />
    </TabList>
  );
}

export default AdminTabs;
