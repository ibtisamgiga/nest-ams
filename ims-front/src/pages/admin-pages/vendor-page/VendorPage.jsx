import { useEffect } from "react";
import { useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useDispatch, useSelector } from "react-redux";
import MyTables from "../../../components/shared/MyTable";
import { useTheme, useMediaQuery } from "@mui/material";
import { getVendorsRequest } from "../../../redux/vendor/vendorAction";
import search from "../../../utils/search";
import CircularLoader from "../../../components/shared/circular-loader/CircularLoader";
import extractValue from "../../../utils/objectValueExtractor";
import { getCategoriesRequest } from "../../../redux/category/categoryAction";

function VendorPage() {
  const tableData = useSelector((state) => state.vendorData?.vendors);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVendorsRequest());
    dispatch(getCategoriesRequest());
  }, [dispatch]);

  const header = [
    "ID",
    "Vendor Name",
    "Contact Number",
    "Category",
    "Sub-category",
    "Total Spending",
    "Action",
  ];

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const categories = useSelector((state) => state.categoryData?.categories);
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
          <h1>Vendors</h1>
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
        <StartIconButton title={"Add Vendor"} width={8} to={"/vendor/create"} />
      </div>
      {tableData.length != 0 ? (
        <MyTables
          data={filteredData ? filteredData : tableData}
          tableHeaders={header}
          createData={(Data) => {
            return { ...Data };
          }}
          routes={"/vendor/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default VendorPage;
