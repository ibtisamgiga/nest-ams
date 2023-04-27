import React from "react";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
function SuperAdminTabs({handleChange,orientation}) {
  return (
    <TabList sx={{ marginTop: "30px" }} orientation={orientation} onChange={handleChange}>
      <Tab label="DashBoard" value="/" />
      <Tab label="Organizations" value="/organizations" />
      <Tab label="Admins" value="/admins" />
      <Tab label="Complains" value="/complaints" />
    </TabList>
  );
}

export default SuperAdminTabs;
