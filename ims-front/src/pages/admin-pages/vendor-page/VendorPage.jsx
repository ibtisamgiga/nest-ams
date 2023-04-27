import { useEffect } from 'react'
import { useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useDispatch, useSelector } from "react-redux";
import MyTables from '../../../components/shared/MyTable';
import { useTheme, useMediaQuery } from "@mui/material";
import { getVendorsRequest } from '../../../redux/vendor/vendorAction';

function VendorPage() {
  const Data = useSelector((state) => state.vendorData?.vendors);
  console.log(Data)
  const dispatch = useDispatch();

  console.log(Data);
  useEffect(() => {
    dispatch(getVendorsRequest());
    setFilteredData(Data);
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
    <div className='body'>
         <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Vendors</h1>
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
        <StartIconButton title={"Add Vendor"} width={8} to={"/vendor/create"} />
  
      </div>
      <SearchField setSearchData={handleSearch} />
      <SearchField setSearchData={handleSearch} />
      <MyTables
        data={filteredData}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
        routes={"/vendor/detail"}
      />
    </div>
 
  )
}

export default VendorPage