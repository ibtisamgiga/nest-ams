import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography } from "@mui/material";

export default function GraphTabs({handleChange,value}) {

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" ,display:"flex",justifyContent:"space-between",marginTop:'1%'}}>
      <Typography variant="h5" component={"p"} sx={{ fontWeight: "bold",fontSize:'1rem'}}>
        Analytics
      </Typography>

      <Tabs value={value} onChange={handleChange} sx={{fontSize:'2px',color:'#2ab38e'}}
      TabIndicatorProps={{style: {background:'#2ab38e'}}}
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