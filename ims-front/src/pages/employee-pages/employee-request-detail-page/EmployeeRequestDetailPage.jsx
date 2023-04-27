import { Typography } from "@mui/material";
import React from "react";
import StatusHeader from "../../../components/shared/header-with-status/StatusHeader";
import ImageText from "../../../components/shared/image-with-text/ImageText";
import LabelText from "../../../components/shared/text-with-label/LabelText";

function EmployeeRequestDetailPage() {
  return (
    <div className="body">
      <StatusHeader
        label={"Request ID :"}
        heading={"123"}
        status={"Pending"}
        date={"11/12/22"}
        nobutton={true}
      />
      <LabelText
        label={"Description"}
        divider
        content={
          "lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum"
        }
      />
      <LabelText label={"Item Name"} content={"MacBook Pro"} divider />
      <LabelText label={"Category"} content={"Electronics"} divider />
      <LabelText label={"Sub-Category"} content={"Mouse"} divider />
    </div>
  );
}

export default EmployeeRequestDetailPage;
