import { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useDispatch, useSelector } from "react-redux";
import MyTables from "../../../components/shared/MyTable";
import { useTheme, useMediaQuery } from "@mui/material";
import { getRequestsRequest } from "../../../redux/request/requestAction";
import search from "../../../utils/search";
import CircularLoader from "../../../components/shared/circular-loader/CircularLoader";
function RequestPage() {
  const tableData = useSelector((state) => state.requestData?.requests);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequestsRequest("Acquisition"));
  }, [dispatch]);

  const header = [
    "ID",
    "Employee Name",
    "Item Name",
    "Category",
    "Sub-category",
    "Date",
    "Status",
    "Action",
  ];

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
      {tableData ? (
        <MyTables
          data={filteredData ? filteredData : tableData}
          tableHeaders={header}
          routes={"/request/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default RequestPage;
