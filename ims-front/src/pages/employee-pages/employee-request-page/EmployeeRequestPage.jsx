import React, { useEffect } from "react";
import MyTables from "../../../components/shared/MyTable";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useDispatch, useSelector } from "react-redux";
import { getRequestsRequest } from "../../../redux/request/requestAction";
import { EmployeeRequestPageheader } from "../../../constants/table-constants/tableConstants";
import useScreenSize from "../../../utils/checkScreenSize";
import { Alert } from "@mui/material";
function EmployeeRequestPage() {
  const tableData = useSelector((state) => state.requestData?.requests);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequestsRequest(null));
  }, [dispatch]);
  const isMatch = useScreenSize();
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
      {tableData?.length == 0 ? (
        <Alert variant="filled" severity="info">
          No Records Found!
        </Alert>
      ) : (
        <MyTables
          data={tableData}
          tableHeaders={EmployeeRequestPageheader}
          routes={"/request/detail"}
        />
      
      )}
    </div>
  );
}

export default EmployeeRequestPage;
