import { useEffect, useState } from "react";
import StatusHeader from "../../../components/shared/header-with-status/StatusHeader";
import LabelText from "../../../components/shared/text-with-label/LabelText";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintRequest } from "../../../redux/complaints/complaintAction";
function EmployeeComplaintDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const complaintData = useSelector((state) => state.complaintData.complaint);
  useEffect(() => {
    dispatch(getComplaintRequest(id));
  }, [dispatch]);
  return (
    <div className="body">
      <StatusHeader
        label={"Request ID :"}
        heading={complaintData?.id}
        status={complaintData?.status}
        date={complaintData?.submissionDate}
        nobutton={true}
      />
      <LabelText label={"title"} content={complaintData?.title} divider />
      <LabelText
        label={"Description"}
        divider
        content={complaintData?.description}
      />
    </div>
  );
}

export default EmployeeComplaintDetailPage;
