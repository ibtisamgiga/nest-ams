import { useState, useEffect } from "react";
import { defaultImage, AvatarInput } from "../../constants/organizationConst";
import FormHeader from "../../components/shared/form-header/FormHeader";
import FormImageHolder from "../../components/shared/form-image/FormImageHolder";
import Divider from "@mui/material/Divider";
import FormInput from "../../components/shared/form-input/FormInput";
import FormSelect from "../../components/shared/form-select/FormSelect";
import imageUploadHelper from "../../utils/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../redux/users/usersAction";
import CircularLoader from "../../components/shared/circular-loader/CircularLoader";
import createImageHelper from "../../utils/createImageHelper";
import Notifier from "../../components/shared/error-meassge/Notifier";
function CreateAdminPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState(defaultImage);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { organizationData, usersData } = useSelector((state) => state);
  const organizations = organizationData.organizations;
  const error = usersData?.error;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    privateEmail: "",
    contactNo: "",
    image: defaultImage,
    organizationId: null,
  });
  const handleFiles = async (files) => {
    const imgdata = createImageHelper(files);
    setLoading(true);
    const imageuploaded = await imageUploadHelper(imgdata);
    formData.image = imageuploaded.url;
    setUrl(imageuploaded.url);
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLoader(true);
    dispatch(createUser(formData));
  };
  useEffect(() => {
    if (error !== null && error !== undefined) {
      setLoader(false);
    } else if (formSubmitted && error === null) {
      navigate(-1);
      setLoader(false);
    }
  }, [error, navigate]);
  return (
    <div className="body">
      <FormHeader heading={"Add New Admin"} form={"createAdmin"} />
      <form onSubmit={handleSubmit} id={"createAdmin"}>
        {loading == true ? (
          <CircularLoader display={"left"} size={"2rem"} />
        ) : (
          <FormImageHolder
            handleFiles={handleFiles}
            image={url}
            label={"Admin's Picture"}
            subLabel={"upload high resoulation with clear face"}
          />
        )}
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
          value={formData.name}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          type={"email"}
          sideLabel={"Email Address"}
          placeHolder={"Email Address"}
          onChange={(e) => {
            setFormData({ ...formData, privateEmail: e.target.value });
          }}
          value={formData.privateEmaill}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormSelect
          defaultValue={organizations[0]}
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
          type={"number"}
          title={"please enter valid number"}
          pattren={"^(?=.*d)[d]{11,13}$"}
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
          type={"email"}
          sideLabel={"Email"}
          placeHolder={"Email"}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          value={formData.email}
        />
        <FormInput
          type={"password"}
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
