import * as React from "react";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { defaultImage, AvatarInput } from "../../../constants/organizationConst";
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
function CreateOrganizationPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [url, setUrl] = useState(defaultImage);
  const [loading, setLoading] = useState(false);
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
    image: "",
  });
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentCountry, setCurrentCountry] = useState({});
  const response = useSelector((state) => state.organizationData);
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
    //setUrl(files.base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createOrganization(formData));
    setError(response?.error);
    navigate(-1);
  };
  useEffect(() => {
    setCountries(Countries.getCountries());
  }, [response]);

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
        {error && <div>{error}</div>}
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
              Cities.getCities({ filters: { country_code: c.iso2.toString() } })
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
          sideLabel={"  "}
          placeHolder={"Zip Code"}
          onChange={(e) => {
            setFormData({ ...formData, zip: e.target.value });
          }}
          value={formData.zip}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Representative Name"}
          placeHolder={"Representative Name"}
          onChange={(e) => {
            setFormData({ ...formData, repName: e.target.value });
          }}
          value={formData.repName}
        />
        <FormInput
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
// if (response.error) {
//   setError(response.error);
// } else {
//   setError(null);
// }
