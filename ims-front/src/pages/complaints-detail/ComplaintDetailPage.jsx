import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StatusHeader from "../../components/shared/header-with-status/StatusHeader";
import ImageText from "../../components/shared/image-with-text/ImageText";
import LabelText from "../../components/shared/text-with-label/LabelText";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getComplaintRequest,
  updateComplaint,
} from "../../redux/complaints/complaintAction";
function ComplaintDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const check = queryParams.get("submit");
  const complainData = useSelector((state) => state.complaintData.complaint);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getComplaintRequest(id));
  }, [dispatch]);

  return (
    <div className="body">
      <StatusHeader
        label={"Complaint ID :"}
        heading={complainData?.id}
        status={complainData?.status}
        date={complainData?.submissionDate}
        nobutton={check ? true : null}
        markResolveAction={
          check == "true"
            ? null
            : () => {
                dispatch(updateComplaint({ status: "Resolved" }, id));
                navigate(-1);
              }
        }
      />
      <LabelText label={"Description"} content={complainData?.description} />
      {!check && (
        <Typography variant="h5" component={"h1"} sx={{ fontWeight: "bold" }}>
          Complaint Submitted by
        </Typography>
      )}
      {!check && (
        <ImageText
          image={complainData?.user?.image?.image}
          name={complainData?.user?.name}
          email={complainData?.user?.email}
          number={complainData?.user?.contactNo}
        />
      )}
    </div>
  );
}

export default ComplaintDetailPage;
