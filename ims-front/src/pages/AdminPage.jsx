import React, { useState } from "react";
import SearchField from "../components/shared/SearchField";
import SelectField from "../components/shared/SelectField";
import StartIconButton from "../components/shared/StartIconButton";
import MyTables from "../components/shared/MyTable";
import AddIcon from "@mui/icons-material/Add";
import { useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../redux/users/usersAction";
import { useEffect } from "react";
import { getOrganizationsRequest } from "../redux/organization/organizationAction";
import CircularLoader from "../components/shared/circular-loader/CircularLoader";
import extractValue from "../utils/objectValueExtractor";
import search from "../utils/search";

function AdminPage() {
  const header = [
    "ID",
    "Image",
    "Name",
    "Organization",
    "Email",
    "Contact No.",
    "Action",
  ];
  const tableData = useSelector((state) => state.usersData.userList);
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
    dispatch(fetchUserList());
    dispatch(getOrganizationsRequest());
  }, [dispatch]);

  const handleSearch = (event) => {
    setFilteredData(search(event, tableData, setSearchText));
  };
  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Admins</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Organization"}
          items={result}
          handleSelect={handleSearch}
        />
        <StartIconButton title={"add"} to="/create/admin" />
      </div>
      {tableData.length != 0 ? (
        <MyTables
          data={filteredData ? filteredData : tableData}
          tableHeaders={header}
          createData={(Data) => {
            return { ...Data };
          }}
          routes={"/admin/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default AdminPage;
