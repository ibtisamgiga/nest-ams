import { Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DetailHeader from "../../../components/shared/details-header/DetailHeader";
import ImageText from "../../../components/shared/image-with-text/ImageText";
import LabelText from "../../../components/shared/text-with-label/LabelText";
import "./inventory-detail.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, getItemRequest } from "../../../redux/item/itemAction";
function InventoryDetailPage() {
  const { id } = useParams();
const navigate=useNavigate()
  const dispatch = useDispatch();
const [open,setOpen]=useState(false)
  useEffect(() => {
    dispatch(getItemRequest(id));
  }, [dispatch]);
  const item = useSelector((state) => state.itemData?.item);
  return (
    <div className="body">
      <DetailHeader editAction={"/inventory/edit/"+id}   closeAction={() => {
          setOpen(false);
        }}
        open={open}
        openAction={() => {
          setOpen(true);
          // dispatch(deleteOrganization(id));
          // navigate(-1);
        }} deleteAction={()=>{dispatch(deleteItem(id));navigate(-1)}} />
      <div className="row-inv">
        <LabelText label={"Item Name"} content={item?.name} />
        <LabelText label={"Serial Number"} content={item?.serialNumber} />
      </div>
      <LabelText
        label={"Description"}
        content={
          item?.description
        }
      />
      <LabelText label={"Category"} content={item?.category?.parent?.name} />
      <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      <LabelText label={"Sub-Category"} content={item?.category?.name} />
      <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      <LabelText label={"Date Of Purchase"} content={item?.created_at} />
      <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      <LabelText label={"Unit Price"} content={item?.price} />
      <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      <LabelText label={"Current Price"} content={"100"} />
      <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      <div className="row-inv">
        <LabelText label={"Depreciated Price"} content={"50"} />
        <LabelText label={"Percentage Depreciation"} content={"50%"} />
      </div>
      <Typography
        variant="h5"
        component={"h1"}
        sx={{ fontWeight: "bold", marginTop: "2%" }}
      >
        Vendor
      </Typography>
      <LabelText label={"Name"} content={item?.vendor?.name} />
      <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      <LabelText label={"Contact Number"} content={item?.vendor?.contactNumber} />
      <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      <Typography
        variant="h5"
        component={"h1"}
        sx={{ fontWeight: "bold", marginTop: "2%" }}
      >
        Assigined To
      </Typography>
     {item?.assigned_to &&<ImageText
        name={item?.user?.name}
        email={item?.user?.email}
        number={item?.user?.contactNo}
        image={item?.user?.image?.image}
      />}
    </div>
  );
}

export default InventoryDetailPage;
