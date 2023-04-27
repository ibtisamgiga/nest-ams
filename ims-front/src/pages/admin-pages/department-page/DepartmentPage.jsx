import React, { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import MyTables from "../../../components/shared/MyTable";
import { useDispatch, useSelector } from "react-redux";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useTheme, useMediaQuery } from "@mui/material";
import { getDepartmentsRequest } from "../../../redux/departments/departmentAction";
function DepartmentPage() {
  // const Data = [
  //   {
  //     id: 1,
  //     name: "HR",
  //     email: "dummy@gmail.com",
  //     number: "12364552628",
  //   },

  //   {
  //     id: 3,
  //     name: "DEV",
  //     email: "dummy@gmail.com",
  //     number: "12364552628",
  //   },
  //   {
  //     id: 3,
  //     name: "QA",
  //     email: "dummy@gmail.com",
  //     number: "12364552628",
  //   },
  // ];
  const Data = useSelector((state) => state.departmentData?.departments);
  //const Data=allData.organizations
  const [once, setOnce] = useState(false);
  const dispatch = useDispatch();

  console.log(Data);
  useEffect(() => {
    dispatch(getDepartmentsRequest());
    setFilteredData(Data);
  }, [dispatch]);

  const header = ["ID", "Name", "Email", "Contact Number", "Action"];

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [filteredData, setFilteredData] = useState(Data);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    const filteredRows = Data.filter((row) => {
      let shouldInclude = false;
      Object.values(row).forEach((value) => {
        if (
          typeof value === "string" &&
          value.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
          shouldInclude = true;
        }
      });
      return shouldInclude;
    });
    setFilteredData(filteredRows);
  };
  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Departments</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <StartIconButton
          title={"Add"}
          to={"/department/create"}
        />
      </div>
      <MyTables
        data={filteredData}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
        routes={"/department/detail"}
      />
    </div>
  );
}

export default DepartmentPage;
