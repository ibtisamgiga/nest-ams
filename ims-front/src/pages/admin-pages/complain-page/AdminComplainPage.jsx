import React, { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import StartIconButton from "../../../components/shared/StartIconButton";
import MyTables from "../../../components/shared/MyTable";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TabsVertical from "../../../components/shared/verticat-tabs/TabVertical";
import {
  getComplaintRequest,
  getComplaintsRequest,
} from "../../../redux/complaints/complaintAction";
import search from "../../../utils/search";
function AdminComplaintsPage() {
  const [index, setIndex] = useState(0);

  const empHeader = [
    "ID",
    "Employee Name",
    "Description",
    "Submission Date",
    "Status",
    "Action",
  ];
  const subHeader = [
    "ID",
    "Description",
    "Submission Date",
    "Status",
    "Action",
  ];

  const tableData = useSelector((state) => state.complaintData.complaints);
  const tableData2 = useSelector((state) => state.complaintData.myComp);

  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [filteredData, setFilteredData] = useState(null);
  const [filteredData2, setFilteredData2] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchText2, setSearchText2] = useState("");
  useEffect(() => {
    dispatch(getComplaintsRequest());
  }, [dispatch]);

  const handleSearch = (event) => {
    setFilteredData(search(event, tableData, setSearchText));
    setFilteredData2(search(event, tableData2, setSearchText2));
  };

  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Complaints</h1>
        </div>
        <SearchField setSearchData={handleSearch} />

        <SelectField
          fieldName={"Status"}
          items={["Pending", "Resolved"]}
          handleSelect={handleSearch}
        />
        {index == 0 ? null : (
          <StartIconButton
            title={"create"}
            //width={11}
            to={"/complaint/create"}
          />
        )}
      </div>
      <Box sx={{ display: "flex" }}>
        <TabsVertical
          tab1={"Employees"}
          tab2={"Submittied"}
          //tab3={"Request"}
          index={index}
          onChange={(event, value) => setIndex(value)}
        />

        {index == 0 ? (
          <MyTables
            data={filteredData ? filteredData : tableData}
            tableHeaders={empHeader}
            createData={(Data) => {
              return { ...Data };
            }}
            routes={"/complaints/detail"}
          />
        ) : (
          <MyTables
            data={filteredData2 ? filteredData2 : tableData2}
            tableHeaders={subHeader}
            createData={(Data) => {
              return { ...Data };
            }}
            query={"/?submit=true"}
            routes={"/complaints/detail"}
          />
        )}
      </Box>
    </div>
  );
}

export default AdminComplaintsPage;
