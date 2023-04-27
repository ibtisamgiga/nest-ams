import * as React from "react";
import { useState } from "react";
import {
  defaultImage,
  AvatarInput,
} from "../../../constants/organizationConst";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormImageHolder from "../../../components/shared/form-image/FormImageHolder";
import Divider from "@mui/material/Divider";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
function CreateComplaintPage() {
  const [url, setUrl] = useState(defaultImage);
  const [formData, setFormData] = useState({
    images: "",
    description: "",
    title: "",
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
      <FormHeader heading={""} form={"createComplaint"} />
      <form onSubmit={handleSubmit} id={"createComplaint"}>
        <FormInput
          sideLabel={"Description"}
          placeHolder={"Description..."}
          multiLine={true}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          value={formData.name}
        />
       

        <FormImageHolder
          handleFiles={handleFiles}
          image={url}
          label={"upload image"}
          subLabel={""}
        />
         <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      </form>
    </div>
  );
}

export default CreateComplaintPage;
