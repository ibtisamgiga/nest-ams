import React, { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import MyTables from "../../../components/shared/MyTable";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getItemsRequest } from "../../../redux/item/itemAction";
import { getCategoriesRequest } from "../../../redux/category/categoryAction";
import { useNavigate } from "react-router-dom";
function InventoryPage() {

  const Data = useSelector((state) => state.itemData?.items);
  //const Data=allData.organizations
  const [once, setOnce] = useState(false);
  const dispatch = useDispatch();
const navigate=useNavigate()
  console.log(Data);
  useEffect(() => {
    // if(!Array.isArray(Data)){
    // navigate('/login')
    // }

    dispatch(getItemsRequest());
    dispatch(getCategoriesRequest());
    setFilteredData(Data);
 
  }, [dispatch]);

  const header = [
    "ID",
    "Item Name",
    "Description",
    "Category",
    "Sub-category",
    "Price",
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
          <h1>Inventory</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Category"}
          items={["furniture", "electronics"]}
          handleSelect={handleSearch}
        />
        <SelectField
          fieldName={"Sub-Category"}
          items={["mouse", "chair"]}
          handleSelect={handleSearch}
        />
        <StartIconButton
          title={"Add Item"}
          width={7}
          to={"/inventory/create"}
        />
      </div>
      <MyTables
        data={Array.isArray(Data)?Data:[]}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
        routes={"/inventory/detail"}
      />
    </div>
  );
}

export default InventoryPage;
