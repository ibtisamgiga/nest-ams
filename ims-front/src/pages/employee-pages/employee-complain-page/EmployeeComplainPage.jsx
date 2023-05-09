import React, { useEffect, useState } from "react";

import StartIconButton from "../../../components/shared/StartIconButton";
import MyTables from "../../../components/shared/MyTable";
import AddIcon from "@mui/icons-material/Add";
import { useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintsRequest } from "../../../redux/complaints/complaintAction";

function EmployeeComplainPage() {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.complaintData.complaints);
  const header = [
    "ID",
    "Title",
    "Description",
    "Submission Date",
    "Status",
    "Action",
  ];
  useEffect(() => {
    dispatch(getComplaintsRequest());
  }, [dispatch]);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Complaints</h1>
        </div>

        <StartIconButton
          title={isMatch ? "create" : "create complaints"}
          width={isMatch ? 6 : 11}
          noIcon={isMatch ? true : false}
          to={"/complaint/create"}
        />
      </div>
      <MyTables
        data={tableData}
        tableHeaders={header}
        routes={"/complaints/detail"}
      />
    </div>
  );
}

export default EmployeeComplainPage;
