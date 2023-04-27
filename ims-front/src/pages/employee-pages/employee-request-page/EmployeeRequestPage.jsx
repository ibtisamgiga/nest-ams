import React, { useState } from "react";
import SearchField from "../../../components/shared/SearchField";
import SelectField from "../../../components/shared/SelectField";
import MyTables from "../../../components/shared/MyTable";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useTheme, useMediaQuery } from "@mui/material";
function EmployeeRequestPage() {
  const Data = [
    {
      id: 1,
      name: "mouse",
      description: "lorem ispsum lorem ispsum lorem ispsum lorem ispsum",
      category: "electronics",
      subCategory: "MOUSE",
      price: 1234,
    },

    {
      id: 2,
      name: "chair",
      description: "lorem ispsum lorem ispsum lorem ispsum lorem ispsum",
      category: "furniture",
      subCategory: "CHAIR",
      price: 127,
    },
    {
      id: 3,
      name: "head-phone",
      description: "lorem ispsum lorem ispsum lorem ispsum lorem ispsum",
      category: "electronics",
      subCategory: "Wearables",
      price: 4000,
    },
  ];
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


  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Requests</h1>
        </div>
        
        <StartIconButton title={"create Request"} width={11} to={"/request/create"} />
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

export default EmployeeRequestPage;
