import React, { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import StartIconButton from "../../../components/shared/StartIconButton";
import MyTables from "../../../components/shared/MyTable";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { useTheme, useMediaQuery, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TabsVertical from "../../../components/shared/verticat-tabs/TabVertical";
import {
  getComplaintRequest,
  getComplaintsRequest,
} from "../../../redux/complaints/complaintAction";
import search from "../../../utils/search";
import {
  AdminComplainHeader,
  AdminEmpComplainHeader,
} from "../../../constants/table-constants/tableConstants";
import useScreenSize from "../../../utils/checkScreenSize";
import { status } from "../../../utils/enums/statusEnum";
function AdminComplaintsPage() {
  const [index, setIndex] = useState(0);

  const { complaintData } = useSelector((state) => state);
  const tableDataSubmittedComplain = complaintData?.complaints;
  const tableDataMycomplain = complaintData?.myComp;

  const dispatch = useDispatch();
  const isMatch = useScreenSize();

  const [filteredDataComplaints, setFilteredDataComplaints] = useState(null);
  const [filteredDataMyComplaints, setFilteredDataMyComplaints] =
    useState(null);
  const [searchText, setSearchText] = useState("");
  const [sarchTextMyComplaints, setSearchTextMyComplaints] = useState("");
  useEffect(() => {
    dispatch(getComplaintsRequest());
  }, [dispatch]);

  const handleSearch = (event) => {
    setFilteredDataComplaints(
      search(event, tableDataSubmittedComplain, setSearchText)
    );
    setFilteredDataMyComplaints(
      search(event, tableDataMycomplain, setSearchTextMyComplaints)
    );
  };
console.log(tableDataSubmittedComplain)
console.log(tableDataMycomplain,'my')
  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div style={{marginRight:isMatch ?null:'3%'}}>
          <h1>Complaints</h1>
        </div>
        <SearchField setSearchData={handleSearch} />

        <SelectField
          fieldName={"Status"}
          items={[status.PENDING, status.RESOLVED]}
          handleSelect={handleSearch}
        />
        {index == 0 ? null : (
          <StartIconButton title={"create"} to={"/complaint/create"} />
        )}
      </div>
      <Box sx={{ display: "flex", flexDirection: isMatch ? "column" : "row" }}>
        <TabsVertical
          tab1={"Employees"}
          tab2={"Submittied"}
          display={isMatch ? "horizontal" : "vertical"}
          index={index}
          onChange={(event, value) => setIndex(value)}
        />

        {index == 0 ? (
          <Box sx={{ width: "100%", marginLeft: "4%" }}>
            <MyTables
              data={
                filteredDataComplaints
                  ? filteredDataComplaints
                  : tableDataSubmittedComplain
              }
              tableHeaders={AdminEmpComplainHeader}
              routes={"/complaints/detail"}
            />
          </Box>
        ) : (
          <Box sx={{ width: "100%", marginLeft: "4%" }}>
            <MyTables
              data={
                filteredDataMyComplaints
                  ? filteredDataMyComplaints
                  : tableDataMycomplain
              }
              tableHeaders={AdminComplainHeader}
              query={"/?submit=true"}
              routes={"/complaints/detail"}
            />
          </Box>
        )}
      </Box>
    </div>
  );
}

export default AdminComplaintsPage;
