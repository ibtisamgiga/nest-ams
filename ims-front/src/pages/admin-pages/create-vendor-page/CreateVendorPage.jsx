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
import Notifier from "../../../components/shared/error-meassge/Notifier";
function CreateVendorPage() {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    categoryIds: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { categoryData, vendorData } = useSelector((state) => state);
  const categories = categoryData?.categories;
  const error = vendorData?.error;
  const setCategories = categories.filter((obj) => obj.parent === null);
  const [current, setCurrent] = useState(setCategories[0]);
  //const setCategories =
  const [subCategories, setsubCategories] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    subCategories.forEach((item) => {
      formData.categoryIds.push(item);
    });
    setFormSubmitted(true);
    setLoader(true);
    dispatch(createVendor(formData));
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
    if (error !== null && error !== undefined) {
      setLoader(false);
    } else if (formSubmitted && error === null) {
      navigate(-1);
      setLoader(false);
    }
  }, [error, navigate, dispatch]);
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
        {error && formSubmitted ? (
          <div>
            <Notifier error={error} success={false} />
          </div>
        ) : formSubmitted ? (
          <Notifier error={error} success={true} />
        ) : null}
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
          items={setCategories}
          keyId={1}
          defaultValue={setCategories[0]}
          onChange={(e) => {
            setCurrent(
              ...setCategories.filter((obj) => obj.id == e.target.value)
            );
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
