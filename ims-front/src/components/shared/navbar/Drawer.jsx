import React, { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import SuperAdminTabs from "./tabs/SuperAdminTabs";
import AdminTabs from "./tabs/AdminTabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import EmployeeTabs from "./tabs/EmployeeTabs";
const DrawerComp = ({ user }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  //const pages = ["DashBoard", "Admin", "Organization", "Complains"];
  const navigate = useNavigate();
  const [value, setValue] = React.useState("/");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
    //setOpenDrawer(false);
  };
  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <TabContext value={value}>
          {/* <TabList
            sx={{ marginTop: "35px" }}
            onChange={handleChange}
            orientation={"vertical"}
          >
            <Tab label="DashBoard" value="/" />
            <Tab label="Admins" value="/admins" />
            <Tab label="Organizations" value="/organizations" />
            <Tab label="Complains" value="/complaints" />
          </TabList> */}
          {user.role == "superadmin" ? (
            <SuperAdminTabs
              handleChange={handleChange}
              orientation={"vertical"}
            />
          ) : user.role == "admin" ? (
            <AdminTabs handleChange={handleChange} orientation={"vertical"} />
          ) : user.role == "employee" ? (
            <EmployeeTabs handleChange={handleChange} orientation={"vertical"} />
          ) : null}
        </TabContext>
      </Drawer>
      <IconButton
        sx={{ color: "black" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="black" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
