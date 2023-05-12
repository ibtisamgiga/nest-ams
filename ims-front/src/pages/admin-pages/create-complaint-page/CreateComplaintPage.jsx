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
import imageUploadHelper from "../../../utils/imageUpload";
import { useDispatch } from "react-redux";
import { createComplaint } from "../../../redux/complaints/complaintAction";
function CreateComplaintPage() {
  const [url, setUrl] = useState(defaultImage);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    images: [],
    description: "",
  });
  const handleFiles = async (files) => {
    const imgdata = new FormData();
    imgdata.append("file", files.fileList[0]);
    imgdata.append("upload_preset", "fqje0r0l");
    imgdata.append("cloud_name", "dntzlt0mt");
    let imageuploaded = await imageUploadHelper(imgdata);
    formData.images.push(imageuploaded.url);
    //formData.image = imageuploaded.url;
    setUrl(imageuploaded.url);
    //setUrl(files.base64);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createComplaint(formData));
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
            setFormData({ ...formData, description: e.target.value });
          }}
          value={formData.description}
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
