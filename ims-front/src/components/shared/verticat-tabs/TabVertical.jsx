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
  // const[index,setIndex]=React.useState()
  return (
    <div>
      <Tabs
        aria-label="Vertical tabs"
        orientation={display}
        value={index}
        onChange={onChange} //(event, value) => setIndex(value)
        //sx={{ minWidth: 300, borderRadius: 'lg'}}
      >
        <TabList>
          <Tab
            variant={index === 0 ? "solid" : "plain"}
            color={index === 0 ? "primary" : "neutral"}
          >
            {tab1}
          </Tab>
          <Tab
            variant={index === 1 ? "solid" : "plain"}
            color={index === 1 ? "primary" : "neutral"}
          >
            {tab2}
          </Tab>

          {tab3 ? (
            <Tab
              variant={index === 2 ? "solid" : "plain"}
              color={index === 2 ? "primary" : "neutral"}
            >
              {tab3}
            </Tab>
          ) : null}
        </TabList>
      </Tabs>
    </div>
  );
}
TabsVertical.defaultProps = {
  display: "vertical",
};
