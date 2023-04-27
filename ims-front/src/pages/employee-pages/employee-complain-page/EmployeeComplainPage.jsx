import React, { useState } from "react";

import StartIconButton from "../../../components/shared/StartIconButton";
import MyTables from "../../../components/shared/MyTable";
import AddIcon from "@mui/icons-material/Add";
import { useTheme, useMediaQuery } from "@mui/material";

function EmployeeComplainPage() {
  const Data = [
    {
      id: 1,
      name: "zain",
      organization: "gigalabs",
      descritpion:
        "Lorem ispsum sushduegjhDdSdhskdghGGHASdadgsgk udsghsdaKDfhfds ",
      submissionDate: "2/03/2020",
      status: "pending",
      //view: "/",
    },
    {
      id: 1,
      name: "ali",
      organization: "nextbridge",
      descritpion:
        "Lorem ispsum sushduegjhDdSdhskdghGGHASdadgsgk udsghsdaKDfhfds ",
      submissionDate: "2/03/2020",
      status: "resolved",
      //view: "/",
    },
    {
      id: 1,
      name: "umar",
      organization: "I2c",
      descritpion:
        "Lorem ispsum sushduegjhDdSdhskdghGGHASdadgsgk udsghsdaKDfhfds ",
      submissionDate: "2/03/2020",
      status: "pending",
      //view: "/",
    },
    {
      id: 1,
      name: "zain",
      organization: "gigalabs",
      descritpion:
        "Lorem ispsum sushduegjhDdSdhskdghGGHASdadgsgk udsghsdaKDfhfds ",
      submissionDate: "2/03/2020",
      status: "pending",
      //view: "/",
    },
  ];
  const header = [
    "ID",
    "Admin Name",
    "Organization",
    "Description",
    "Submission Date",
    "Status",
    "Action",
  ];

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Complaints</h1>
        </div>
        
        <StartIconButton title={"create complaints"} width={11} to={"/complaint/create"} />
      </div>
      <MyTables
        data={Data}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
        routes={"/complaints/detail"}
      />
    </div>
  );
}

export default EmployeeComplainPage;
