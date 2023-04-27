import { useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import { Divider } from "@mui/material";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import MultiSelect from "../../../components/shared/multi-select/MultiSelect";

function CreateVendorPage() {
  const [formData, setFormData] = useState({
    name: "",
    ContactNumber: "",
    category: [],
  });
  const [subCategories, setsubCategories] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleChange = (event) => {
        const {
           target: { value }
         } = event;
         setsubCategories(
           // On autofill we get a stringified value.
           typeof value === "string" ? value.split(",") : value
         );
       };
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
          sideLabel={"Select Category "}
          placeHolder={"select Category"}
          items={[{ name: "electronics", id: 2 }]}
          keyId={1}
          onChange={(e) => {
            setFormData({ ...formData, categoryId: e.target.value });
          }}
        />
        {/* <FormSelect
          sideLabel={"Select Sub-Category "}
          placeHolder={"select Sub-Category"}
          items={[{ name: "mouse", id: 1 }]}
          keyId={1}
          onChange={(e) => {
            setFormData({ ...formData, category: e.target.value });
          }}
        /> */}

        <MultiSelect  names ={["mouse", "keyboard", "charger", "power-Bank"]} onChange={handleChange}subCategories={subCategories}/>
       
      </form>
    </div>
  );
}

export default CreateVendorPage;
