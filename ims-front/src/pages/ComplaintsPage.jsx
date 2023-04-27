import React, { useEffect, useState } from "react";
import SearchField from "../components/shared/SearchField";
import SelectField from "../components/shared/SelectField";
import StartIconButton from "../components/shared/StartIconButton";
import MyTables from "../components/shared/MyTable";
import AddIcon from "@mui/icons-material/Add";
import { useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintRequest, getComplaintsRequest } from "../redux/complaints/complaintAction";
function ComplaintsPage() {
  // const Data = [
  //   {
  //     id: 1,
  //     name: "zain",
  //     organization: "gigalabs",
  //     descritpion:
  //       "Lorem ispsum sushduegjhDdSdhskdghGGHASdadgsgk udsghsdaKDfhfds ",
  //     submissionDate: "2/03/2020",
  //     status: "pending",
  //    //view: "/",
  //   },
  //   {
  //     id: 1,
  //     name: "ali",
  //     organization: "nextbridge",
  //     descritpion:
  //       "Lorem ispsum sushduegjhDdSdhskdghGGHASdadgsgk udsghsdaKDfhfds ",
  //     submissionDate: "2/03/2020",
  //     status: "resolved",
  //     //view: "/",
  //   },
  //   {
  //     id: 1,
  //     name: "umar",
  //     organization: "I2c",
  //     descritpion:
  //       "Lorem ispsum sushduegjhDdSdhskdghGGHASdadgsgk udsghsdaKDfhfds ",
  //     submissionDate: "2/03/2020",
  //     status: "pending",
  //     //view: "/",
  //   },
  //   {
  //     id: 1,
  //     name: "zain",
  //     organization: "gigalabs",
  //     descritpion:
  //       "Lorem ispsum sushduegjhDdSdhskdghGGHASdadgsgk udsghsdaKDfhfds ",
  //     submissionDate: "2/03/2020",
  //     status: "pending",
  //     //view: "/",
  //   },
  // ];
  const header = [
    "ID",
    "Admin Name",
    "Organization",
    "Description",
    "Submission Date",
    "Status",
    "Action",
  ];
 // const Data=[]

  const Data = useSelector((state) => state.complaintData.complaints);
  //console.log(Dxata,'saga com')
  //const Data=allData.organizations
  const [once, setOnce] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if(!once){
    dispatch(getComplaintsRequest());
    setFilteredData(Data)
    setOnce(true)
     }
  }, [dispatch,Data]);

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
          <h1>Complaints</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Organization"}
          items={["gigalabs", "tanbits", "I2C"]}
          handleSelect={handleSearch}
        />
        <SelectField
          fieldName={"Status"}
          items={["pending", "resolved"]}
          handleSelect={handleSearch}
        />
      </div>
      <MyTables
        data={filteredData}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
          
        }}
        routes={'/complaints/detail'}
      />
    </div>
  );
}

export default ComplaintsPage;
