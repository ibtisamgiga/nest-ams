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
function DepartmentPage() {
  const tableData = useSelector((state) => state.departmentData?.departments);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDepartmentsRequest());
  }, [dispatch]);

  const header = ["ID", "Name", "Email", "Contact Number", "Action"];

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
      {tableData.length != 0 ? (
        <MyTables
          data={filteredData ? filteredData : tableData}
          tableHeaders={header}
          createData={(Data) => {
            return { ...Data };
          }}
          routes={"/department/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default DepartmentPage;
