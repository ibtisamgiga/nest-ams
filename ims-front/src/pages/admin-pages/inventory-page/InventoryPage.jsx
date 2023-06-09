import React, { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import MyTables from "../../../components/shared/MyTable";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useTheme, useMediaQuery, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getItemsRequest } from "../../../redux/item/itemAction";
import { getCategoriesRequest } from "../../../redux/category/categoryAction";
import { useNavigate } from "react-router-dom";
import search from "../../../utils/search";
import extractValue from "../../../utils/objectValueExtractor";
import CircularLoader from "../../../components/shared/circular-loader/CircularLoader";
import { AdminInventoryHeader } from "../../../constants/table-constants/tableConstants";
function InventoryPage() {
  const { itemData, categoryData } = useSelector((state) => state);
  const tableData = itemData?.items;
  const categories = categoryData?.categories;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemsRequest(null));
    dispatch(getCategoriesRequest());
  }, [dispatch]);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const categoryResult = extractValue(
    categories.filter((cat) => cat.parent == null),
    "name"
  );
  const subCategoryResult = extractValue(
    categories.filter((cat) => cat.parent != null),
    "name"
  );
  const handleSearch = (event) => {
    setFilteredData(search(event, tableData, setSearchText));
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
          items={categoryResult}
          handleSelect={handleSearch}
        />
        <SelectField
          fieldName={"Sub-Category"}
          items={subCategoryResult}
          handleSelect={handleSearch}
        />
        {categoryResult.length != 0 ? (
          <StartIconButton
            title={"Add Item"}
            width={7}
            to={"/inventory/create"}
          />
        ) : null}
      </div>
      {tableData ?tableData?.length == 0 ? (
          <Alert variant="filled" severity="info">
            No Records Found!
          </Alert>
        ) : (
        <MyTables
          data={
            filteredData
              ? filteredData
              : Array.isArray(tableData)
              ? tableData
              : []
          }
          //data={Array.isArray(Data) ? Data : []}
        
          tableHeaders={AdminInventoryHeader}
          routes={"/inventory/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default InventoryPage;
