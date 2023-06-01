import * as React from "react";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormImageHolder from "../../../components/shared/form-image/FormImageHolder";
import FormInput from "../../../components/shared/form-input/FormInput";
import { Countries, Cities } from "countries-states-cities-service";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import { useParams } from "react-router-dom";
import {
  getOrganizationRequest,
  updateOrganization,
} from "../../../redux/organization/organizationAction";
import imageUploadHelper from "../../../utils/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import createImageHelper from "../../../utils/createImageHelper";
function EditOrganizationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    repName: "",
    repContactNo: "",
    repName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    bio: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [once, setOnce] = useState(false);
  const organizationData = useSelector(
    (state) => state.organizationData.organization
  );
  const [url, setUrl] = useState(formData?.image?.image);
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const handleFiles = async (files) => {
    const imgdata = createImageHelper(files);
    const imageuploaded = await imageUploadHelper(imgdata);
    formData.image.image = imageuploaded.url;
    setUrl(imageuploaded.url);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateOrganization(formData, id));
    navigate(-1);
  };

  useEffect(() => {
    if (!once) {
      dispatch(getOrganizationRequest(id));
      setCountries(Countries.getCountries());
      setFormData({ ...formData, ...organizationData });
      setUrl(organizationData.image.image);
      setOnce(true);
    }
  }, [organizationData]);

  return (
    <div className="body">
      <FormHeader heading={"Edit Organization"} form={"editOrganization"} />
      <form onSubmit={handleSubmit} id={"editOrganization"}>
        <FormImageHolder
          handleFiles={handleFiles}
          image={url}
          label={"Organization Logo"}
          subLabel={"upload a logo with minimum resoulation of 800*800px"}
        />
        <FormInput
          defaultValue={organizationData?.name}
          sideLabel={"Name of Organization"}
          placeHolder={"Name of Organization"}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Email"}
          placeHolder={"Email"}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          defaultValue={organizationData?.email}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Bio"}
          placeHolder={"Short Bio here..."}
          multiLine={true}
          onChange={(e) => {
            setFormData({ ...formData, bio: e.target.value });
          }}
          defaultValue={organizationData?.bio}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Address"}
          placeHolder={"Address"}
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value });
          }}
          defaultValue={organizationData?.address}
        />

        <FormSelect
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
          defaultValue={organizationData?.zip}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Representative Name"}
          placeHolder={"Representative Name"}
          onChange={(e) => {
            setFormData({ ...formData, repName: e.target.value });
          }}
          defaultValue={organizationData?.repName}
        />
        <FormInput
          sideLabel={"Representative Contact No."}
          placeHolder={"Representative Contact No."}
          onChange={(e) => {
            setFormData({ ...formData, repContactNo: e.target.value });
          }}
          defaultValue={organizationData?.repContactNo}
        />
      </form>
    </div>
  );
}

export default EditOrganizationPage;
