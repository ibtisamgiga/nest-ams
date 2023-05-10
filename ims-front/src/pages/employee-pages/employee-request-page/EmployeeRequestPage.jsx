import React, { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import MyTables from "../../../components/shared/MyTable";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRequestsRequest } from "../../../redux/request/requestAction";
import { EmployeeRequestPageheader } from "../../../constants/table-constants/tableConstants";
function EmployeeRequestPage() {
  const tableData = useSelector((state) => state.requestData?.requests);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequestsRequest(null));
  }, [dispatch]);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Requests</h1>
        </div>

        <StartIconButton
          title={isMatch ? "create" : "create Request"}
          width={isMatch ? 6 : 11}
          noIcon={isMatch ? true : false}
          to={"/request/create"}
        />
      </div>
      <MyTables
        data={tableData}
        tableHeaders={EmployeeRequestPageheader}
        routes={"/request/detail"}
      />
    </div>
  );
}

export default EmployeeRequestPage;
