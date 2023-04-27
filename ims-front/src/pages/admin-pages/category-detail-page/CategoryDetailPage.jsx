import { Typography } from "@mui/material";
import React from "react";
import DetailHeader from "../../../components/shared/details-header/DetailHeader";
import LabelText from "../../../components/shared/text-with-label/LabelText";
import './category-detail.css'
function CategoryDetailPage() {
  return (
    <div className="body">
      <DetailHeader />
      <LabelText label={"Category Name"} content={"Electronics"} />
      <LabelText label={"Sub-Category Name"} content={"Laptop"} />
      <div className="row">
        <LabelText label={"Total quantity"} content={1} />
        <LabelText label={"Quantity assigined"} content={1} />
      </div>
      <LabelText label={"Quantity unassigined"} content={1} />
      <LabelText label={"Quantity faulty"} content={1} />
      <Typography
        variant="h5"
        component={"h1"}
        sx={{ fontWeight: "bold", marginTop: "2%" }}
      >
        Vendors
      </Typography>
      <div className="row">
        <LabelText label={"Name"} content={"random"} />
        <LabelText label={"Conatct Number"} content={"26534256237272"} />
      </div>
    </div>
  );
}

export default CategoryDetailPage;
