import * as React from "react";
import { useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormImageHolder from "../../../components/shared/form-image/FormImageHolder";
import Divider from "@mui/material/Divider";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import imageUploadHelper from "../../../utils/imageUpload";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../redux/users/usersAction";
import { useNavigate } from "react-router-dom";
import { defaultImage } from "../../../constants/organizationConst";
import CircularLoader from "../../../components/shared/circular-loader/CircularLoader";
function CreateEmployeePage() {
  const [url, setUrl] = useState(defaultImage);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    departmentId: null,
    name: "",
    email: "",
    password: "",
    privateEmail: "",
    contactNo: "",
    image: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const departments = useSelector((state) => state.departmentData?.departments);
  const handleFiles = async (files) => {
    const imgdata = new FormData();
    imgdata.append("file", files.fileList[0]);
    imgdata.append("upload_preset", "fqje0r0l");
    imgdata.append("cloud_name", "dntzlt0mt");
    setLoading(true);
    let imageuploaded = await imageUploadHelper(imgdata);
    formData.image = imageuploaded.url;
    setUrl(imageuploaded.url);
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
    navigate(-1);
  };

  return (
    <div className="body">
      <FormHeader heading={"Add New Employee"} form={"createEmployee"} />
      <form onSubmit={handleSubmit} id={"createEmployee"}>
        {loading == true ? (
          <CircularLoader display={"left"} size={"2rem"} />
        ) : (
          <FormImageHolder
            handleFiles={handleFiles}
            image={url}
            label={"Employee's Picture"}
            subLabel={"upload high resoulation with clear face"}
          />
        )}
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
          value={formData.privateEmail}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        {/* <FormInput sideLabel={"Organization"} placeHolder={"Organization"} /> */}
        <FormSelect
          defaultValue={departments[0]}
          keyId={1}
          sideLabel={"Department"}
          placeHolder={"Department"}
          items={departments}
          onChange={(e) => {
            setFormData({ ...formData, departmentId: e.target.value });
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
        <Typography variant="p" component={"p"}>
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

export default CreateEmployeePage;
