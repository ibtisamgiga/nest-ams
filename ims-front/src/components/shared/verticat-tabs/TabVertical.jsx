import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { Divider } from "@mui/material";

export default function TabsVertical({
  tab1,
  tab2,
  tab3,
  index,
  onChange,
  display,
}) {
  return (
    <>
      <div>
        <Tabs
          aria-label="Vertical tabs"
          orientation={display}
          value={index}
          onChange={onChange}
        >
          <TabList sx={{ backgroundColor: "white" }}>
            <Tab
              sx={{
                width: display == "vertical" ? "200px" : null,
                color: index == 0 ? "white" : "black",
                backgroundColor: index == 0 ? "#5184ec" : "white",
              }}
            >
              {tab1}
            </Tab>
            <Tab
              sx={{
                width: display == "vertical" ? "200px" : null,
                color: index == 1 ? "white" : "black",
                backgroundColor: index == 1 ? "#5184ec" : "white",
              }}
            >
              {tab2}
            </Tab>

            {tab3 ? (
              <Tab
                sx={{
                  width: display == "vertical" ? "200px" : null,
                  color: index == 2 ? "white" : "black",
                  backgroundColor: index == 2 ? "#5184ec" : "white",
                }}
              >
                {tab3}
              </Tab>
            ) : null}
          </TabList>
        </Tabs>
      </div>
      <Divider
        sx={
          display == "vertical"
            ? {
                borderRightWidth: 4,
                marginLeft: "20px",
                orientation: "vertical",
              }
            : {
                borderBottomWidth: 4,
                margin: "20px",
              }
        }
      />
    </>
  );
}
TabsVertical.defaultProps = {
  display: "vertical",
};
