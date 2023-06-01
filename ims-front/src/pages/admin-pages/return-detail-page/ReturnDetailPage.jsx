import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import StatusHeader from "../../../components/shared/header-with-status/StatusHeader";
import ImageText from "../../../components/shared/image-with-text/ImageText";
import LabelText from "../../../components/shared/text-with-label/LabelText";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequestRequest,
  updateRequest,
} from "../../../redux/request/requestAction";
import { status, type } from "../../../utils/enums/statusEnum";
import { repair, replace } from "../../../constants/return-constants";

function ReturnDetailPage() {
  const { id } = useParams();
  const requestData = useSelector((state) => state.requestData.request);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getRequestRequest(id));
  }, [dispatch]);
  return (
    <div className="body">
      <StatusHeader
        label={"Return ID :"}
        heading={requestData?.id}
        status={requestData?.status}
        date={requestData?.created_at}
        markText={"Repair"}
        nobutton={requestData?.status == status.APPROVED ? true : false}
        markResolveAction={() => {
          dispatch(updateRequest(repair, id));
          navigate(-1);
        }}
        rejectAction={() => {
          dispatch(updateRequest(replace, id));
          navigate(-1);
        }}
        reject={requestData?.status == status.APPROVED ? null : "Replace"}
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
      <Typography variant="h5" component={"h1"} sx={{ fontWeight: "bold" }}>
        Request Submitted by
      </Typography>
      <ImageText
        image={requestData?.user.image?.image}
        name={requestData?.user?.name}
        email={requestData?.user?.email}
        number={requestData?.user?.contactNo}
      />
    </div>
  );
}

export default ReturnDetailPage;
