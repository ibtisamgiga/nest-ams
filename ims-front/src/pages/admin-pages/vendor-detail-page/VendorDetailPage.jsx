import React, { useState } from "react";
import DetailHeader from "../../../components/shared/details-header/DetailHeader";
import MyTables from "../../../components/shared/MyTable";
import LabelText from "../../../components/shared/text-with-label/LabelText";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  deleteVendor,
  getVendorRequest,
} from "../../../redux/vendor/vendorAction";
import { Chip, Stack } from "@mui/material";
function VendorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open,setOpen]=useState(false)
  useEffect(() => {
    dispatch(getVendorRequest(id));
  }, [dispatch]);
  const vendor = useSelector((state) => state.vendorData?.vendor);
  return (
    <div className="body">
      <DetailHeader
        editAction={"/vendor/edit/" + id}
        closeAction={() => {
          setOpen(false);
        }}
        open={open}
        openAction={() => {
          setOpen(true);
          // dispatch(deleteOrganization(id));
          // navigate(-1);
        }}
        deleteAction={() => {
          dispatch(deleteVendor(id));
          navigate(-1);
        }}
      />
      <LabelText label={"Name"} content={vendor?.name} divider />
      <LabelText
        label={"Contact Number"}
        content={vendor?.contactNumber}
        divider
      />
      <LabelText
        label={"Category"}
        content={vendor?.categories[0]?.parent?.name}
        divider
      />
       <Stack direction="row" spacing={1}>
        {vendor?.categories.map((subCat) => {
          return <Chip label={subCat?.name} />;
        })}
      </Stack>
  
    </div>
  );
}

export default VendorDetailPage;
