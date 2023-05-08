import { useEffect, useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import { Divider } from "@mui/material";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import MultiSelect from "../../../components/shared/multi-select/MultiSelect";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest } from "../../../redux/category/categoryAction";
import { createVendor } from "../../../redux/vendor/vendorAction";
import { useNavigate } from "react-router-dom";
function CreateVendorPage() {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    categoryIds: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categoryData.categories);
  const cat = categories.filter((obj) => obj.parent === null);
  const [current, setCurrent] = useState(cat[0]);
  //const cat =
  const [subCategories, setsubCategories] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    subCategories.forEach((item) => {
      formData.categoryIds.push(item);
    });
    dispatch(createVendor(formData));
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
  }, [dispatch]);
  /*******************************/
  return (
    <div className="body">
      <FormHeader heading={"Add Vendor"} form={"createVendor"} />
      <form onSubmit={handleSubmit} id={"createVendor"}>
        <FormInput
          sideLabel={"Name"}
          placeHolder={"Name"}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          value={formData.name}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"ContactNumber"}
          placeHolder={"Contact Number"}
          onChange={(e) => {
            setFormData({ ...formData, contactNumber: e.target.value });
          }}
          value={formData.contactNumber}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />

        <FormSelect
          sideLabel={"Select Category"}
          placeHolder={"select Category"}
          items={cat}
          keyId={1}
          defaultValue={cat[0]}
          onChange={(e) => {
            setCurrent(...cat.filter((obj) => obj.id == e.target.value));
          }}
        />
        <MultiSelect
          defaultValue={current?.children[0]}
          names={current?.children ? current?.children : []}
          onChange={handleChange}
          subCategories={subCategories}
        />
      </form>
    </div>
  );
}

export default CreateVendorPage;
