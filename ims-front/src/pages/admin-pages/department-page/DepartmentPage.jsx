import React, { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import MyTables from "../../../components/shared/MyTable";
import { useDispatch, useSelector } from "react-redux";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useTheme, useMediaQuery } from "@mui/material";
import { getDepartmentsRequest } from "../../../redux/departments/departmentAction";
import search from "../../../utils/search";
import CircularLoader from "../../../components/shared/circular-loader/CircularLoader";
import { AdminDepartmentHeader } from "../../../constants/table-constants/tableConstants";
function DepartmentPage() {
  const tableData = useSelector((state) => state.departmentData?.departments);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDepartmentsRequest());
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
          <h1>Departments</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <StartIconButton title={"Add"} to={"/department/create"} />
      </div>
      {tableData ? (
        <MyTables
          data={filteredData ? filteredData : tableData}
          tableHeaders={AdminDepartmentHeader}
          routes={"/department/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default DepartmentPage;
