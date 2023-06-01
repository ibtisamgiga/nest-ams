import { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useDispatch, useSelector } from "react-redux";
import MyTables from "../../../components/shared/MyTable";
import { useTheme, useMediaQuery, Alert } from "@mui/material";
import { getRequestsRequest } from "../../../redux/request/requestAction";
import search from "../../../utils/search";
import CircularLoader from "../../../components/shared/circular-loader/CircularLoader";
import { AdminRequestHeader } from "../../../constants/table-constants/tableConstants";
function RequestPage() {
  const tableData = useSelector((state) => state.requestData?.requests);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequestsRequest("Acquisition"));
  }, [dispatch]);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setFilteredData(search(event, tableData, setSearchText));
  };

  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Requests</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Status"}
          items={["Pending", "Resolved", "Approved"]}
          handleSelect={handleSearch}
        />
      </div>
      {tableData ?tableData?.length == 0 ? (
          <Alert variant="filled" severity="info">
            No Records Found!
          </Alert>
        ) : (
          
        <MyTables
          data={filteredData ? filteredData : tableData}
          tableHeaders={AdminRequestHeader}
          routes={"/request/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default RequestPage;
