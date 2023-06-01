import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
export default function GraphTabs({ handleChange, value ,action}) {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1%",
      }}
    >
      <Typography
        variant="h5"
        component={"p"}
        sx={{ fontWeight: "bold", fontSize: "1rem" }}
      >
        Analytics{" "}
        <span>
          <DownloadIcon fontSize="12px" onClick={action} />
        </span>
      </Typography>

      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ fontSize: "2px", color: "#2ab38e" }}
        TabIndicatorProps={{ style: { background: "#2ab38e" } }}
        textColor="#2ab38e"
      >
        <Tab label="Organizations" />
        <Tab label="Admins" />
      </Tabs>
    </Box>
  );
} //handleChange,value
//textColor="secondary"
//indicatorColor="secondary"
