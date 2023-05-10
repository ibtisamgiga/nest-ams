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
import { AdminEmployeeHeader } from "../../../constants/table-constants/tableConstants";

function EmployeePage() {
  const { usersData, departmentData } = useSelector((state) => state);
  const tableData = usersData?.userList;
  const departments = departmentData?.departments;
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
          tableHeaders={AdminEmployeeHeader}
          routes={"/employee/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default EmployeePage;
