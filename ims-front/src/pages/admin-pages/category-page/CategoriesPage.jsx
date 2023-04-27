import React, { useEffect, useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import MyTables from "../../../components/shared/MyTable";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useTheme, useMediaQuery } from "@mui/material";
import ExapndableTable from "../../../components/shared/ExapndableTable";
import CollapsibleTable from "../../../components/shared/CollaspableTable";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest } from "../../../redux/category/categoryAction";
function CategoriesPage() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
const dispatch=useDispatch()
  const Data = [
    {
      id: 1,
      category: 1,
      subCategory: 2,
      vendor: 8,
      subCat: [
        {
          id: 3,
          subCategoryName: "laptop",
          vendorName: "Game Over",
          quantity: 3,
          qAssigined: 12,
          qUassigined: 2,
          qFaulty: 4,
        },
        {
          id: 5,
          subCategoryName: "mouse",
          vendorName: "ikea",
          quantity: 3,
          qAssigined: 12,
          qUassigined: 2,
          qFaulty: 4,
        },
      ],
    },

    {
      id: 2,
      category: 5,
      subCategory: 2,
      vendor: 8,
      subCat: [
        {
          id: 3,
          subCategoryName: "chair",
          vendorName: "Game Over",
          quantity: 3,
          qAssigined: 12,
          qUassigined: 2,
          qFaulty: 4,
        },
        {
          id: 5,
          subCategoryName: "table",
          vendorName: "ikea",
          quantity: 3,
          qAssigined: 12,
          qUassigined: 2,
          qFaulty: 4,
        },
      ],
    },
  ];
  useEffect(()=>{
    dispatch(getCategoriesRequest())
  },[dispatch])
  const header = [
    "ID",
    "Category Name",
    "Number of Sub-Categories",
    "Number of Vendors",
    "Action",
    " ",
    " "
  ];

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
      {/* <ExapndableTable
        data={filteredData}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
        routes={"/inventory/detail"}
      /> */}
      <CollapsibleTable tableData={Data}/>
    </div>
  );
}

export default CategoriesPage;
