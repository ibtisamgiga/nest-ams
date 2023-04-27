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

  const Data = useSelector((state) => state.organizationData?.organizations);
  //const Data=allData.organizations
  const [once, setOnce] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if(!once){
    dispatch(getOrganizationsRequest());
    setFilteredData(Data)
    setOnce(true)
     }
  }, [dispatch,Data]);


  const handleSearch = (event) => {
    setSearchText(event.target.value);
    const filteredRows = Data?.filter((row) => {
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
      {Data.length != 0 ? (
        <MyTables
          data={Data?Data:[]}
          tableHeaders={header}
          createData={(Data) => {
            return { ...Data };
          }}
          routes={"/organization/detail"}
        />
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
}

export default OrganizationPage;
