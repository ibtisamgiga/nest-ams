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
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, updateUser } from "../../../redux/users/usersAction";
import imageUploadHelper from "../../../utils/imageUpload";
import { getRequestsRequest } from "../../../redux/request/requestAction";
import { getComplaintsRequest } from "../../../redux/complaints/complaintAction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function EditEmployeePage() {
  const logIn = useSelector((state) => state.userData); //{ name: "ali", role: "employee" };
  const id = logIn.token.id;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.usersData.selectedUser);
  const error = useSelector((state) => state.usersData);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    privateEmail: "",
    contactNo: "",
    education: "",
    companyExp: "",
    totalExp: "",
  });
  const [url, setUrl] = useState(formData?.image?.image);
  const navigate = useNavigate();
  const handleFiles = async (files) => {
    const imgdata = new FormData();
    imgdata.append("file", files.fileList[0]);
    imgdata.append("upload_preset", "fqje0r0l");
    imgdata.append("cloud_name", "dntzlt0mt");
    let imageuploaded = await imageUploadHelper(imgdata);
    formData.image.image = imageuploaded.url;
    setUrl(imageuploaded.url);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: formData.name,
      privateEmail: formData.privateEmail,
      contactNo: formData.contactNo,
      organizationId: formData.organizationId,
      designation: formData.designation,
      education: formData.education,
      totalExp: formData.totalExp,
      compExp: formData.companyExperience,
      image: formData?.image,
    };
    dispatch(updateUser(body, id));
    navigate(-1);
  };
  useEffect(() => {
    dispatch(fetchUserById(id));
    setFormData({ ...formData, ...userData });

    setUrl(userData?.image?.image);
  }, [dispatch]);
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
          defaultValue={userData?.name}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Email Address"}
          placeHolder={"Email Address"}
          onChange={(e) => {
            setFormData({ ...formData, privateEmail: e.target.value });
          }}
          defaultValue={userData?.privateEmail}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        {/* <FormInput sideLabel={"Organization"} placeHolder={"Organization"} /> */}
        <FormInput
          sideLabel={"Desiganation"}
          placeHolder={"Desiganation"}
          onChange={(e) => {
            setFormData({ ...formData, designation: e.target.value });
          }}
          defaultValue={userData?.designation}
        />

        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Contact Number"}
          placeHolder={"Contact Number"}
          onChange={(e) => {
            setFormData({ ...formData, contactNo: e.target.value });
          }}
          defaultValue={userData?.contactNo}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Education"}
          placeHolder={"Education"}
          onChange={(e) => {
            setFormData({ ...formData, education: e.target.value });
          }}
          defaultValue={userData?.education}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Total Experience"}
          placeHolder={"Total Experience"}
          onChange={(e) => {
            setFormData({ ...formData, totalExp: e.target.value });
          }}
          defaultValue={userData?.totalExp}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Company Experience"}
          placeHolder={"Company Experience"}
          onChange={(e) => {
            setFormData({ ...formData, companyExperience: e.target.value });
          }}
          defaultValue={userData?.compExp}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      </form>
    </div>
  );
}

export default EditEmployeePage;
