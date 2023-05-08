import React, { useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import StartIconButton from "../../../components/shared/StartIconButton";
import MyTables from "../../../components/shared/MyTable";
import AddIcon from "@mui/icons-material/Add";
import { useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserList } from "../../../redux/users/usersAction";
import search from "../../../utils/search";
import { getDepartmentsRequest } from "../../../redux/departments/departmentAction";
import extractValue from "../../../utils/objectValueExtractor";
import CircularLoader from "../../../components/shared/circular-loader/CircularLoader";

function EmployeePage() {
  const header = [
    "ID",
    "Name",
    "Email",
    "Contact Number",
    "Department",
    "Action",
  ];

  const tableData = useSelector((state) => state.usersData.userList);
  const departments = useSelector((state) => state.departmentData.departments);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const result = extractValue(departments, "name");
  useEffect(() => {
    dispatch(fetchUserList());
    dispatch(getDepartmentsRequest());
  }, [dispatch]);

  const handleSearch = (event) => {
    setFilteredData(search(event, tableData, setSearchText));
  };

  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Employees</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Departments"}
          items={result}
          handleSelect={handleSearch}
        />
        <StartIconButton title={"add"} to="/employee/create" />
      </div>
      {tableData.length != 0 ? (
        <MyTables
          data={filteredData ? filteredData : tableData}
          tableHeaders={header}
          createData={(Data) => {
            return { ...Data };
          }}
          routes={"/employee/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default EmployeePage;
