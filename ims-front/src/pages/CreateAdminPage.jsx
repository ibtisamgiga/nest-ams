import * as React from "react";
import { useState } from "react";
import { defaultImage, AvatarInput } from "../constants/organizationConst";
import FormHeader from "../components/shared/form-header/FormHeader";
import FormImageHolder from "../components/shared/form-image/FormImageHolder";
import Divider from "@mui/material/Divider";
import FormInput from "../components/shared/form-input/FormInput";
import FormSelect from "../components/shared/form-select/FormSelect";
import imageUploadHelper from "../utils/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { createUser } from "../redux/users/usersAction";
function CreateAdminPage() {
  const [url, setUrl] = useState(defaultImage);
  const dispatch = useDispatch();
  const organizations = useSelector(
    (state) => state.organizationData.organizations
  );
  const error = useSelector(
    (state) => state.usersData.error
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    privateEmail: "",
    contactNo: "",
    image:"",
    organizationId: null,
  });
  const handleFiles =async(files) => {
    const imgdata = new FormData();
    imgdata.append("file", files.fileList[0]);
    imgdata.append("upload_preset", "fqje0r0l");
    imgdata.append("cloud_name", "dntzlt0mt");
    let imageuploaded = await imageUploadHelper(imgdata);
    formData.image = imageuploaded.url;
    setUrl(imageuploaded.url);
    //setUrl(files.base64);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
    console.log(error)
    console.log(formData);
  };

  return (
    <div className="body">
      <FormHeader heading={"Add New Admin"} form={"createAdmin"} />
      <form onSubmit={handleSubmit} id={"createAdmin"}>
        <FormImageHolder
          handleFiles={handleFiles}
          image={url}
          label={"Admin's Picture"}
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
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Email Address"}
          placeHolder={"Email Address"}
          onChange={(e) => {
            setFormData({ ...formData, privateEmail: e.target.value });
          }}
          value={formData.privateEmaill}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        {/* <FormInput sideLabel={"Organization"} placeHolder={"Organization"} /> */}
        <FormSelect
          defaultValue={organizations[0]}
          keyId={1}
          sideLabel={"Organization"}
          placeHolder={"Organization"}
          items={organizations}
          onChange={(e) => {
            setFormData({ ...formData, organizationId: e.target.value });
            //console.log(formData);
          }}
        />

        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Contact Number"}
          placeHolder={"Contact Number"}
          onChange={(e) => {
            setFormData({ ...formData, contactNo: e.target.value });
          }}
          value={formData.contactNo}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <Typography variant="h5" component={"h1"} sx={{ fontWeight: "bold" }}>
        Credentials
      </Typography>
      <Typography variant="p" component={"p"} >
        Below are one time created credentials.
      </Typography>
        <FormInput
          sideLabel={"Email"}
          placeHolder={"Email"}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          value={formData.email}
        />
          <FormInput
          sideLabel={"Password"}
          placeHolder={"Password"}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          value={formData.password}
        />
      </form>
    </div>
  );
}

export default CreateAdminPage;
