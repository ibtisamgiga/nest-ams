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

function ReturnDetailPage() {
  const { id } = useParams();
  const requestData = useSelector((state) => state.requestData.request);
  const dispatch = useDispatch();
const navigate=useNavigate()
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
        markResolveAction={() => {
          dispatch(updateRequest({ status: "Approved", type: "Repair" }, id));
          navigate(-1)
        
        }}
        rejectAction={() =>{
          dispatch(updateRequest({ status: "Approved", type: "Replace" }, id))
          navigate(-1)}
        }
        reject={"Replace"}
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
