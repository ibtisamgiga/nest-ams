import React, { useEffect, useState } from "react";
import SearchField from "../components/shared/SearchField";
import SelectField from "../components/shared/SelectField";
import StartIconButton from "../components/shared/StartIconButton";
import MyTables from "../components/shared/MyTable";
import AddIcon from "@mui/icons-material/Add";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  fetchOrgaizationList,
  getOrganizationsRequest,
} from "../redux/organization/organizationAction";
import { useDispatch, useSelector } from "react-redux";
import CircularLoader from "../components/shared/circular-loader/CircularLoader";
import search from "../utils/search";

function OrganizationPage() {
  const header = [
    "ID",
    "Image",
    "Name",
    "Location",
    "Email",
    "Contact No.",
    "Action",
  ];

  const tableData = useSelector(
    (state) => state.organizationData?.organizations
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getOrganizationsRequest());
  }, [dispatch]);

  const handleSearch = (event) => {
    setFilteredData(search(event, tableData, setSearchText));
  };
  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Organizations</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Location"}
          items={["Lahore", "Islamabad"]}
          handleSelect={handleSearch}
        />
        <StartIconButton title={"add"} to="/create/organization" />
      </div>
      {tableData.length != 0 ? (
        <MyTables
          data={filteredData ? filteredData : tableData}
          tableHeaders={header}
          createData={(Data) => {
            return { ...Data };
          }}
          routes={"/organization/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default OrganizationPage;
