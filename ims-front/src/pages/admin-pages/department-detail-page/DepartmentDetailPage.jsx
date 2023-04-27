import React from "react";
import DetailHeader from "../../../components/shared/details-header/DetailHeader";
import ImageText from "../../../components/shared/image-with-text/ImageText";
import { Divider, Typography } from "@mui/material";
import dp from "../../../components/shared/image-with-text/dummy";
import LabelText from "../../../components/shared/text-with-label/LabelText";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteDepartment, getDepartmentRequest } from "../../../redux/departments/departmentAction";
function DepartmentDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDepartmentRequest(id));
  }, [dispatch]);
  const department = useSelector((state) => state.departmentData?.department);
  return (
    <div className="body">
      <DetailHeader heading={"Department Detail"} deleteAction={()=>dispatch(deleteDepartment(id))}  />
      <LabelText label={"Department Name"} content={department?.name} />
      <LabelText label={"Department Email"} content={department?.email} />
      <LabelText label={"Department Number"} content={department?.contactNo} />
      <Typography variant="h5" component={"h1"} sx={{ fontWeight: "bold" }}>
        Organization
      </Typography>
      <ImageText  image={department?.orgImage} name={department?.orgName} email={department?.orgEmail} />
      <LabelText label={"Representative Name"} content={department?.repName} />
      <LabelText label={"Representative Contact No"} content={department?.repContactNo} />
    </div>
  );
}

export default DepartmentDetailPage;
