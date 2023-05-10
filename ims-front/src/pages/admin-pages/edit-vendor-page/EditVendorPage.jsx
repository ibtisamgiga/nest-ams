import { useEffect, useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import { Divider } from "@mui/material";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import MultiSelect from "../../../components/shared/multi-select/MultiSelect";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest } from "../../../redux/category/categoryAction";
import {
  createVendor,
  getVendorRequest,
  updateVendor,
} from "../../../redux/vendor/vendorAction";
import { useNavigate, useParams } from "react-router-dom";
function EditVendorPage() {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    categoryIds: [],
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const { categoryData, vendorData } = useSelector((state) => state);
  const categories = categoryData.categories;
  const vendor = vendorData.vendor;
  const cat = categories.filter((obj) => obj.parent === null);
  const [current, setCurrent] = useState(cat[0]);
  const navigate = useNavigate();
  const [subCategories, setsubCategories] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    subCategories.forEach((item) => {
      formData.categoryIds.push(item);
    });
    
    dispatch(updateVendor(formData, id));
    navigate(-1);
  };
  /*******************************/
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setsubCategories(typeof value === "string" ? value.split(",") : value);
  };
  /*******************************/
  useEffect(() => {
    dispatch(getCategoriesRequest());
    dispatch(getVendorRequest(id));
    setFormData({ ...formData, ...vendor });
    //setCurrent(cat[0]);
  }, [dispatch]);
  /*******************************/
  return (
    <div className="body">
      <FormHeader heading={"Edit Vendor"} form={"editVendor"} />
      <form onSubmit={handleSubmit} id={"editVendor"}>
        <FormInput
          sideLabel={"Name"}
          placeHolder={"Name"}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          defaultValue={vendor?.name}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"ContactNumber"}
          placeHolder={"Contact Number"}
          onChange={(e) => {
            setFormData({ ...formData, contactNumber: e.target.value });
          }}
          defaultValue={vendor?.contactNumber}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />

        <FormSelect
          sideLabel={"Select Category "}
          placeHolder={"select Category"}
          items={cat}
          keyId={1}
          defaultValue={vendor?.categories[0]?.parent}
          onChange={(e) => {
            setCurrent(...cat.filter((obj) => obj.id == e.target.value));
          }}
        />
        <MultiSelect
          defaultValue={vendor?.categories}
          names={current?.children ? current?.children : []}
          onChange={handleChange}
          subCategories={subCategories}
        />
      </form>
    </div>
  );
}

export default EditVendorPage;
