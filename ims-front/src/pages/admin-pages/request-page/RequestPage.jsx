import { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useDispatch, useSelector } from "react-redux";
import MyTables from "../../../components/shared/MyTable";
import { useTheme, useMediaQuery } from "@mui/material";
import { getRequestsRequest } from "../../../redux/request/requestAction";
function RequestPage() {
  const Data = useSelector((state) => state.requestData?.requests);
  console.log(Data)
  const dispatch = useDispatch();

  console.log(Data);
  useEffect(() => {
    dispatch(getRequestsRequest());
    setFilteredData(Data);
  }, [dispatch]);

  const header = [
    "ID",
    "Employee Name",
    "Item Name",
    "Category",
    "Sub-category",
    "Date",
    "Status",
    "Action",
  ];

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
          <h1>Requests</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Status"}
          items={["pending", "resolved", "approved"]}
          handleSelect={handleSearch}
        />
      </div>
      <MyTables
        data={Data}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
        routes={"/request/detail"}
      />
    </div>
  );
}

export default RequestPage;
