import * as React from "react";
import { useState } from "react";
import { defaultImage, AvatarInput } from "../../../constants/organizationConst";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormImageHolder from "../../../components/shared/form-image/FormImageHolder";
import Divider from "@mui/material/Divider";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
function EditEmployeePage() {
  const [url, setUrl] = useState(defaultImage);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    department:'',
    privateEmail: "",
    contactNo: "",
    education:"",
   companyExperience: null,
   totalExp:null
  });
  const handleFiles = (files) => {
    // console.log(files.base64,'hello');
    setUrl(files.base64);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="body">
      <FormHeader heading={"Add New Employee"} form={"EditEmployee"} />
      <form onSubmit={handleSubmit} id={"EditEmployee"}>
        <FormImageHolder
          handleFiles={handleFiles}
          image={url}
          label={"Picture"}
          subLabel={"upload high resoulation with clear face"}
        />
        <FormInput
          sideLabel={"Name"}
          placeHolder={"Full Name"}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          value={formData.name}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Email Address"}
          placeHolder={"Email Address"}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          value={formData.email}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        {/* <FormInput sideLabel={"Organization"} placeHolder={"Organization"} /> */}
        <FormSelect
          sideLabel={"Desiganation"}
          placeHolder={"Desiganation"}
          items={[
            { name: "gigalabs", id: 1 },
            { name: "tanbits", id: 2 },
            { name: "I2C", id: 3 },
          ]}
          onChange={(e) => {
            setFormData({ ...formData,designation: e.target.value });
            console.log(formData.designation);
          }}
        />

        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Contact Number"}
          placeHolder={"Contact Number"}
          onChange={(e) => {
            setFormData({ ...formData, contactNo: e.target.value });
          }}
          value={formData.contactNo}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Education"}
          placeHolder={"Education"}
          onChange={(e) => {
            setFormData({ ...formData, education: e.target.value });
          }}
          value={formData.education}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Total Experience"}
          placeHolder={"Total Experience"}
          onChange={(e) => {
            setFormData({ ...formData, totalExp: e.target.value });
          }}
          value={formData.totalExp}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Company Experience"}
          placeHolder={"Company Experience"}
          onChange={(e) => {
            setFormData({ ...formData, companyExperience: e.target.value });
          }}
          value={formData.companyExperience}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      </form>
    </div>
  );
}

export default EditEmployeePage;
