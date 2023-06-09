import React, { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import StartIconButton from "../../../components/shared/StartIconButton";
import CollapsibleTable from "../../../components/shared/CollaspableTable";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesDetail } from "../../../redux/category/categoryAction";
import search from "../../../utils/search";
import CircularLoader from "../../../components/shared/circular-loader/CircularLoader";
import useScreenSize from "../../../utils/checkScreenSize";
import { Alert } from "@mui/material";
function CategoriesPage() {
  const isMatch = useScreenSize();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.categoryData?.details);
  useEffect(() => {
    dispatch(getCategoriesDetail());
  }, [dispatch]);

  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (event) => {
    setFilteredData(search(event, tableData, setSearchText));
  };
  return (
    <div className="body">
      {" "}
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Categories</h1>
        </div>
        <SearchField setSearchData={handleSearch} />

        <StartIconButton
          title={"Add Category"}
          width={10}
          to={"/category/create"}
        />
      </div>
      {tableData ? tableData?.length == 0 ? (
          <Alert variant="filled" severity="info">
            No Records Found!
          </Alert>
        ) :(
        <CollapsibleTable tableData={filteredData ? filteredData : tableData} />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default CategoriesPage;
