import * as React from "react";
import { useEffect, useState } from "react";
import AlertTitle from "@mui/material/AlertTitle";
import Divider from "@mui/material/Divider";
import { defaultImage } from "../../../constants/organizationConst";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormImageHolder from "../../../components/shared/form-image/FormImageHolder";
import FormInput from "../../../components/shared/form-input/FormInput";
import { Countries, States, Cities } from "countries-states-cities-service";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import { useDispatch, useSelector } from "react-redux";
import { createOrganization } from "../../../redux/organization/organizationAction";
import imageUploadHelper from "../../../utils/imageUpload";
import { useNavigate } from "react-router-dom";
import CircularLoader from "../../../components/shared/circular-loader/CircularLoader";
import createImageHelper from "../../../utils/createImageHelper";
import { Alert, Typography } from "@mui/material";
import Notifier from "../../../components/shared/error-meassge/Notifier";
function CreateOrganizationPage() {
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [url, setUrl] = useState(defaultImage);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    repContactNo: "",
    repName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    bio: "",
    image: defaultImage,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const resp = useSelector((state) => state.organizationData);
  const error = resp?.error ? resp?.error : null;
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
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
    dispatch(createOrganization(formData));
  };

  useEffect(() => {
    setCountries(Countries.getCountries());
    if (error !== null && error !== undefined) {
      console.log("(error", error);
      setLoader(false);
    } else if (formSubmitted && error === null) {
      console.log("(error null", error);
      navigate(-1);
      setLoader(false);
    }
  }, [error, navigate]);

  return (
    <div className="body">
      <FormHeader
        heading={"Add New Organization"}
        form={"createOrganization"}
      />
      <form onSubmit={handleSubmit} id={"createOrganization"}>
        {loading == true ? (
          <CircularLoader display={"left"} size={"2rem"} />
        ) : (
          <FormImageHolder
            handleFiles={handleFiles}
            image={url}
            label={"Organization Logo"}
            subLabel={"upload a logo with minimum resoulation of 800*800px"}
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
          sideLabel={"Name of Organization"}
          placeHolder={"Name of Organization"}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          value={formData.name}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Email"}
          placeHolder={"Email"}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          value={formData.email}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Bio"}
          placeHolder={"Short Bio here..."}
          multiLine={true}
          onChange={(e) => {
            setFormData({ ...formData, bio: e.target.value });
          }}
          value={formData.bio}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Address"}
          placeHolder={"Address"}
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value });
          }}
          value={formData.address}
        />

        <FormSelect
          defaultValue={""}
          sideLabel={"  "}
          placeHolder={"select Country"}
          items={countries}
          onChange={(e) => {
            setFormData({ ...formData, country: e.target.value });

            const c = Countries.getCountries({
              filters: { name: e.target.value },
            })[0];

            setCities(
              Cities.getCities({
                filters: { country_code: c.iso2.toString() },
              })
            );
          }}
        />

        <FormSelect
          defaultValue={""}
          sideLabel={"  "}
          placeHolder={"select City"}
          items={cities}
          onChange={(e) => {
            setFormData({ ...formData, city: e.target.value });
          }}
        />
        <FormInput
          type={"number"}
          sideLabel={"  "}
          placeHolder={"Zip Code"}
          onChange={(e) => {
            setFormData({ ...formData, zip: e.target.value });
          }}
          value={formData.zip}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <Typography variant="h5" component={"h1"} sx={{ fontWeight: "bold" }}>
          Credentials
        </Typography>
        <FormInput
          sideLabel={"Representative Name"}
          placeHolder={"Representative Name"}
          onChange={(e) => {
            setFormData({ ...formData, repName: e.target.value });
          }}
          value={formData.repName}
        />
        <FormInput
          type={"number"}
          minLength={"11"}
          maxLength={"13"}
          sideLabel={"Representative Contact No."}
          placeHolder={"Representative Contact No."}
          onChange={(e) => {
            setFormData({ ...formData, repContactNo: e.target.value });
          }}
          value={formData.repContactNo}
        />
      </form>
    </div>
  );
}

export default CreateOrganizationPage;
