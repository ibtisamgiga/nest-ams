import { useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import StartIconButton from "../../../components/shared/StartIconButton";
import MyTables from "../../../components/shared/MyTable";
import { useTheme, useMediaQuery } from "@mui/material";
function ReturnPage() {
  const Data = [
    {
      id: 1,
      name: "jhon doe",
      itemName: "Mac-book",
      category: "electronics",
      subCategory: "laptop",
      type: "-",
      date: "1/3/23",
      status: "pending",
    },

    {
      id: 2,
      name: "jhon doe",
      itemName: "Mac-book",
      category: "electronics",
      subCategory: "laptop",
      type: "repair",
      date: "1/3/23",
      status: "approved",
    },
    {
      id: 3,
      name: "jhon doe",
      itemName: "Mac-book",
      category: "electronics",
      subCategory: "laptop",
      type: "replace",
      date: "1/3/23",
      status: "resolved",
    },
  ];
  const header = [
    "ID",
    "Employee Name",
    "Item Name",
    "Category",
    "Sub-category",
    "Type",
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
          <h1>Returns</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Status"}
          items={["pending", "resolved", "approved"]}
          handleSelect={handleSearch}
        />
        <SelectField
          fieldName={"Type"}
          items={["pending", "resolved", "approved"]}
          handleSelect={handleSearch}
        />
      </div>
      <MyTables
        data={filteredData}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
        routes={"/return/detail"}
      />
    </div>
  );
}

export default ReturnPage;
