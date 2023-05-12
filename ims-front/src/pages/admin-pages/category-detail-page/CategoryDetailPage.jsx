import { Typography } from "@mui/material";
import React from "react";
import DetailHeader from "../../../components/shared/details-header/DetailHeader";
import LabelText from "../../../components/shared/text-with-label/LabelText";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "./category-detail.css";
import {
  deleteCategory,
  getCategoryRequest,
} from "../../../redux/category/categoryAction";
function CategoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryRequest(id));
  }, [dispatch]);
  const category = useSelector((state) => state.categoryData?.category);
  return (
    <div className="body">
      <DetailHeader
        deleteAction={() => {
          dispatch(deleteCategory(id));
          navigate(-1);
        }}
        editAction={"/category/edit/" + id + "/?edit=true"}
      />
      <LabelText label={"Category Name"} content={category?.parent} />
      <LabelText label={"Sub-Category Name"} content={category?.name} />

      <LabelText label={"Total quantity"} content={category?.count?.quantity} />
      <LabelText
        label={"Quantity assigined"}
        content={category?.count?.assigined}
      />
      <LabelText
        label={"Quantity unassigined"}
        content={category?.count?.unAssigned}
      />
      <LabelText label={"Quantity faulty"} content={category?.count?.faulty} />
      <Typography
        variant="h5"
        component={"h1"}
        sx={{ fontWeight: "bold", marginTop: "2%" }}
      >
        Vendors
      </Typography>
      {category?.vendors.map((vendor) => {
        return (
          <div key={vendor?.id}>
            <LabelText label={"Name"} content={vendor?.name} />
            <LabelText
              label={"Conatct Number"}
              content={vendor?.contactNumber}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CategoryDetailPage;
