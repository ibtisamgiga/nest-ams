import { useEffect, useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import { Divider } from "@mui/material";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest } from "../../../redux/category/categoryAction";
import { SignalCellularNullSharp } from "@mui/icons-material";
import { createItem } from "../../../redux/item/itemAction";
import { useNavigate } from "react-router-dom";
import Notifier from "../../../components/shared/error-meassge/Notifier";
function CreateItemPage() {
  const dispatch = useDispatch();

  const { categoryData, itemData } = useSelector((state) => state);
  const categories = categoryData?.categories;
  const error = itemData?.error;
  const [loader, setLoader] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const categoriesFilter = categories?.filter((obj) => obj.parent === null);
  const [current, setCurrent] = useState(categoriesFilter[0]); //categoriesFilter.filter(obj => obj.parent === null);
  const [currSubCategory, setCurrSubCat] = useState(
    categoriesFilter[0]?.children[0] ? categoriesFilter[0]?.children[0] : [{}]
  );

  useEffect(() => {
    dispatch(getCategoriesRequest());
    if (error !== null && error !== undefined) {
      setLoader(false);
    } else if (formSubmitted && !error === null) {
      setLoader(false);
    }
  }, [error, navigate, dispatch]);
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    description: "",
    vendorId: null,
    price: null,
    categoryId: null,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLoader(true);
    dispatch(createItem(formData));
  };

  return (
    <div className="body">
      <FormHeader heading={""} form={"createItem"} />
      <form onSubmit={handleSubmit} id={"createItem"}>
        <FormInput
          sideLabel={"Item Name"}
          placeHolder={"Item Name"}
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
          sideLabel={"Serial Number"}
          placeHolder={"Serial Number"}
          onChange={(e) => {
            setFormData({ ...formData, serialNumber: e.target.value });
          }}
          value={formData.serialNumber}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Description"}
          placeHolder={"Enter Description Here..."}
          multiLine={true}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
          value={formData.description}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormSelect
          defaultValue={""}
          sideLabel={"Select Category "}
          placeHolder={"select Category"}
          items={categoriesFilter}
          keyId={1}
          onChange={(e) => {
            setFormData({ ...formData, categoryId: e.target.value });
            setCurrent(
              ...categoriesFilter?.filter((obj) => obj.id == e.target.value)
            );
          }}
        />
        <FormSelect
          defaultValue={""}
          sideLabel={"Select Sub-Category "}
          placeHolder={"select Sub-Category"}
          items={current?.children} //current[0]?.children
          keyId={1}
          onChange={(e) => {
            setFormData({ ...formData, categoryId: e.target.value });
            setCurrSubCat(
              ...current?.children?.filter((obj) => obj.id == e.target.value)
            );
          }}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          type={"number"}
          sideLabel={"price"}
          placeHolder={"price"}
          onChange={(e) => {
            setFormData({ ...formData, price: e.target.value });
          }}
          value={formData.price}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormSelect
          defaultValue={""}
          sideLabel={"Select Vendor  "}
          placeHolder={"select Vendor"}
          items={
            currSubCategory?.vendors?.length == 0
              ? []
              : currSubCategory?.vendors
          }
          keyId={1}
          onChange={(e) => {
            setFormData({ ...formData, vendorId: e.target.value });
          }}
        />
      </form>
    </div>
  );
}

export default CreateItemPage;
