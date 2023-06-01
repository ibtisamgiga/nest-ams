import { useState, useEffect } from "react";
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
import createImageHelper from "../../../utils/createImageHelper";
function CreateEmployeePage() {
  const [url, setUrl] = useState(defaultImage);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    departmentId: null,
    name: "",
    email: "",
    password: "",
    privateEmail: "",
    contactNo: "",
    image: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const departments = useSelector((state) => state.departmentData?.departments);
  const error = useSelector((state) => state.usersData?.error);
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
    // navigate(-1);
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
      {loader ? (
        <CircularLoader />
      ) : (
        <>
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
              type={"email"}
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
              type={"number"}
              sideLabel={"Contact Number"}
              placeHolder={"Contact Number"}
              onChange={(e) => {
                setFormData({ ...formData, contactNo: e.target.value });
              }}
              value={formData.contactNo}
            />
            <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
            <Typography
              variant="h5"
              component={"h1"}
              sx={{ fontWeight: "bold" }}
            >
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
            {error && <div>{error}</div>}
          </form>
        </>
      )}
    </div>
  );
}

export default CreateEmployeePage;
