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

function EmployeePage() {
  // const Data = [
  //   {
  //     id: 1,
  //     name: "zain",
  //     email: "hello@gmail.com",
  //     number: "923342251274",
  //     department: "HR",
  //   },

  //   {
  //     id: 2,
  //     name: "mustafa",
  //     email: "next@gmail.com",
  //     number: "11111122222222",
  //     department: "DEV",
  //   },
  //   {
  //     id: 3,
  //     name: "Ali",
  //     email: "next@gmail.com",
  //     number: "11111122222222",
  //     department: "QA",
  //   },
  // ];
  const header = [
    "ID",
    "Name",
    "Email",
    "Contact Number",
    "Department",
    "Action",
  ];

  const Data = useSelector((state) => state.usersData.userList);
  const [once, setOnce] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [filteredData, setFilteredData] = useState(Data);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchUserList());
    console.log(Data)
  }, [dispatch]);


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
          <h1>Employees</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Departments"}
          items={["HR", "DEV", "QA"]}
          handleSelect={handleSearch}
        />
        <StartIconButton title={"add"} to="/employee/create" />
      </div>
      <MyTables
        data={filteredData}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
        routes={"/employee/detail"}
      />
    </div>
  );
}

export default EmployeePage;
