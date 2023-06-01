import * as React from "react";
import { useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormImageHolder from "../../../components/shared/form-image/FormImageHolder";
import Divider from "@mui/material/Divider";
import FormInput from "../../../components/shared/form-input/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, updateUser } from "../../../redux/users/usersAction";
import imageUploadHelper from "../../../utils/imageUpload";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createImageHelper from "../../../utils/createImageHelper";
import { formBody } from "../../../constants/edit-employee-contants";
import Notifier from "../../../components/shared/error-meassge/Notifier";
function EditEmployeePage() {
  const logIn = useSelector((state) => state.userData); //{ name: "ali", role: "employee" };
  const id = logIn.token.id;
  const dispatch = useDispatch();
  const { usersData } = useSelector((state) => state);
  const userData = usersData?.selectedUser;
  const error = usersData?.error;
  const [loader, setLoader] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    const imgdata = createImageHelper(files);
    const imageuploaded = await imageUploadHelper(imgdata);
    formData.image = imageuploaded.url;
    setUrl(imageuploaded.url);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLoader(true);
    dispatch(updateUser(formBody(formData), id));
  
  };
  useEffect(() => {
    dispatch(fetchUserById(id));
    setFormData({ ...formData, ...userData });
    setUrl(userData?.image?.image);
    if (error !== null && error !== undefined) {
      setLoader(false);
    } else if (formSubmitted && error === null) {
      setLoader(false);
      navigate(-1)
    }
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
        {error && formSubmitted ? (
          <div>
            <Notifier error={error} success={false} />
          </div>
        ) : formSubmitted ? (
          <Notifier error={error} success={true} />
        ) : null}
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
