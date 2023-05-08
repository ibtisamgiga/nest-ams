import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StatusHeader from "../../../components/shared/header-with-status/StatusHeader";
import ImageText from "../../../components/shared/image-with-text/ImageText";
import LabelText from "../../../components/shared/text-with-label/LabelText";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRequestRequest } from "../../../redux/request/requestAction";
function EmployeeRequestDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const requestData = useSelector((state) => state.requestData.request);
  useEffect(() => {
    dispatch(getRequestRequest(id));
  }, [dispatch]);
  return (
    <div className="body">
      <StatusHeader
        label={"Request ID :"}
        heading={requestData?.id}
        status={requestData?.status}
        date={"11/12/22"}
        nobutton={true}
      />
      <LabelText
        label={"Description"}
        divider
        content={requestData?.description}
      />
      <LabelText
        label={"Item Name"}
        content={requestData?.item?.name}
        divider
      />
      <LabelText
        label={"Category"}
        content={requestData?.item?.category?.parent?.name}
        divider
      />
      <LabelText
        label={"Sub-Category"}
        content={requestData?.item?.category?.name}
        divider
      />
    </div>
  );
}

export default EmployeeRequestDetailPage;
