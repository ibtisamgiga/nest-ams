import React, { useEffect, useState } from "react";
import StartIconButton from "../../../components/shared/StartIconButton";
import MyTables from "../../../components/shared/MyTable";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintsRequest } from "../../../redux/complaints/complaintAction";
import { EmployeeComplainPageheader } from "../../../constants/table-constants/tableConstants";
import useScreenSize from "../../../utils/checkScreenSize";
import { Alert } from "@mui/material";

function EmployeeComplainPage() {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.complaintData.complaints);
  useEffect(() => {
    dispatch(getComplaintsRequest());
  }, [dispatch]);
  const isMatch = useScreenSize();

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
      {tableData?.length == 0 ? (
        <Alert variant="filled" severity="info">
          No Records Found!
        </Alert>
      ) : (
        <MyTables
          data={tableData}
          tableHeaders={EmployeeComplainPageheader}
          routes={"/complaints/detail"}
        />
      )}
    </div>
  );
}

export default EmployeeComplainPage;
