import React from "react";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
function EmployeeTabs({ handleChange, orientation }) {
  return (
    <TabList
      sx={{ marginTop: "30px" }}
      orientation={orientation}
      onChange={handleChange}
    >
      <Tab label="DashBoard" value="/" />
      <Tab label="Requests" value="/requests" />
      <Tab label="Complaints" value="/complaints" />
    </TabList>
  );
}

export default EmployeeTabs;
