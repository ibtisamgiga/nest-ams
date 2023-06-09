import * as React from "react";
import { useEffect, useState } from "react";
import {
  defaultImage,
  AvatarInput,
} from "../../../constants/organizationConst";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormImageHolder from "../../../components/shared/form-image/FormImageHolder";
import Divider from "@mui/material/Divider";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, updateUser } from "../../../redux/users/usersAction";
import imageUploadHelper from "../../../utils/imageUpload";
import { useNavigate } from "react-router-dom";
import createImageHelper from "../../../utils/createImageHelper";
function EditAdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    privateEmail: "",
    contactNo: "",
    organizationId: null,
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [once, setOnce] = useState(false);
  const { usersData, organizationData } = useSelector((state) => state);
  const adminData = usersData.selectedUser;
  const organizations = organizationData.organizations;
  const error = usersData.error;

  const [url, setUrl] = useState(formData?.image?.image);
  const dispatch = useDispatch();
  const handleFiles = async (files) => {
    const imgdata = createImageHelper(files);
    const imageuploaded = await imageUploadHelper(imgdata);
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
      image: formData?.image,
    };
    dispatch(updateUser(body, id));
    navigate(-1);
  };
  useEffect(() => {
    if (!once) {
      dispatch(fetchUserById(id));
      setFormData({ ...formData, ...adminData });
      setUrl(adminData?.image?.image);
      setOnce(true);
    }
  }, [adminData]);

  return (
    <div className="body">
      <FormHeader heading={"Edit Admin"} form={"EditAdmin"} />
      <form onSubmit={handleSubmit} id={"EditAdmin"}>
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
          defaultValue={adminData?.name}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Email Address"}
          placeHolder={"Email Address"}
          onChange={(e) => {
            setFormData({ ...formData, privateEmail: e.target.value });
          }}
          defaultValue={adminData?.privateEmail}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />

        <FormSelect
          defaultValue={adminData?.organizationId}
          keyId={1}
          sideLabel={"Organization"}
          placeHolder={"Organization"}
          items={organizations}
          onChange={(e) => {
            setFormData({ ...formData, organizationId: e.target.value });
          }}
        />

        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Contact Number"}
          placeHolder={"Contact Number"}
          onChange={(e) => {
            setFormData({ ...formData, contactNo: e.target.value });
          }}
          defaultValue={adminData?.contactNo}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
      </form>
    </div>
  );
}

export default EditAdminPage;
