import React, { useEffect, useState } from "react";
import SearchField from "../components/shared/SearchField";
import SelectField from "../components/shared/SelectField";
import StartIconButton from "../components/shared/StartIconButton";
import MyTables from "../components/shared/MyTable";
import AddIcon from "@mui/icons-material/Add";
import { useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintsRequest } from "../redux/complaints/complaintAction";
import CircularLoader from "../components/shared/circular-loader/CircularLoader";
import { getOrganizationsRequest } from "../redux/organization/organizationAction";
import extractValue from "../utils/objectValueExtractor";
import search from "../utils/search";
function ComplaintsPage() {
  const header = [
    "ID",
    "Admin Name",
    "Organization",
    "Description",
    "Submission Date",
    "Status",
    "Action",
  ];

  const tableData = useSelector((state) => state.complaintData.complaints);
  const organizations = useSelector(
    (state) => state.organizationData?.organizations
  );
  const result = extractValue(organizations, "name");
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getComplaintsRequest());
    dispatch(getOrganizationsRequest());
  }, [dispatch]);

  const handleSearch = (event) => {
    setFilteredData(search(event, tableData, setSearchText));
  };

  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Complaints</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Organization"}
          items={result}
          handleSelect={handleSearch}
        />
        <SelectField
          fieldName={"Status"}
          items={["Pending", "Resolved"]}
          handleSelect={handleSearch}
        />
      </div>
      {tableData.length != 0 ? (
        <MyTables
          data={filteredData ? filteredData : tableData}
          tableHeaders={header}
          routes={"/complaints/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default ComplaintsPage;
