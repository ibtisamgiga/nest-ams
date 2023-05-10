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
import {
  createUser,
  fetchUserById,
  updateUser,
} from "../../../redux/users/usersAction";
import { useEffect } from "react";
import { getDepartmentsRequest } from "../../../redux/departments/departmentAction";
import { useNavigate, useParams } from "react-router-dom";
function EditEmployeeInfoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { departmentData, usersData } = useSelector((state) => state);
  const departments = departmentData.departments;
  const employeeData = usersData.selectedUser;
  const [formData, setFormData] = useState({
    departmentId: employeeData?.departmentDetail?.id,
    name: "",
    email: "",
    password: "",
    privateEmail: "",
    contactNo: "",
    image: "",
  });
  const [url, setUrl] = useState(formData?.image?.image);
  const handleFiles = async (files) => {
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
    const body = {
      departmentId: formData?.departmentId,
      name: formData?.name,
      privateEmail: formData?.privateEmail,
      contactNo: formData?.contactNo,
      image: formData?.image,
    };
    dispatch(updateUser(body, id));
    navigate(-1);
  };
  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(getDepartmentsRequest());
    setFormData({ ...formData, ...employeeData });
    setUrl(employeeData?.image?.image);
  }, [dispatch]);
  return (
    <div className="body">
      <FormHeader heading={"Add New Employee"} form={"createEmployee"} />
      <form onSubmit={handleSubmit} id={"createEmployee"}>
        <FormImageHolder
          handleFiles={handleFiles}
          image={url}
          label={"Employee's Picture"}
          subLabel={"upload high resoulation with clear face"}
        />
        <FormInput
          sideLabel={"Name"}
          placeHolder={"Full Name"}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          defaultValue={employeeData?.name}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Email Address"}
          placeHolder={"Email Address"}
          onChange={(e) => {
            setFormData({ ...formData, privateEmail: e.target.value });
          }}
          defaultValue={employeeData?.privateEmail}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        {/* <FormInput sideLabel={"Organization"} placeHolder={"Organization"} /> */}
        <FormSelect
          defaultValue={employeeData?.departmentDetail?.id}
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
          defaultValue={employeeData?.contactNo}
        />
      </form>
    </div>
  );
}

export default EditEmployeeInfoPage;
