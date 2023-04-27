import * as React from "react";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { defaultImage, AvatarInput } from "../../constants/organizationConst";
import FormHeader from "../../components/shared/form-header/FormHeader";
import FormImageHolder from "../../components/shared/form-image/FormImageHolder";
import FormInput from "../../components/shared/form-input/FormInput";
import { Countries, States, Cities } from "countries-states-cities-service";
import FormSelect from "../../components/shared/form-select/FormSelect";
import { useParams } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import {
  fetchOrgaizationList,
  getOrganizationRequest,
  updateOrganization,
} from "../../redux/organization/organizationAction";
import imageUploadHelper from "../../utils/imageUpload";
import { useDispatch, useSelector } from "react-redux";

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
  const { id } = useParams();
  const [once, setOnce] = useState(false);
  const orgData = useSelector((state) => state.organizationData.organization);
  const [url, setUrl] = useState(formData?.image?.image);
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentCountry, setCurrentCountry] = useState({});
  const handleFiles = async (files) => {
    //formData.image.image=files.base64
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
    dispatch(updateOrganization(formData, id));
    console.log(formData);
  };

  console.log(orgData, "edit");
  useEffect(() => {
    if (!once) {
      dispatch(getOrganizationRequest(id));
      setCountries(Countries.getCountries());
      setFormData({ ...formData, ...orgData });
      setUrl(orgData.image.image);
      setOnce(true);
    }
  }, [orgData]);

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
          defaultValue={orgData?.name}
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
          defaultValue={orgData?.email}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Bio"}
          placeHolder={"Short Bio here..."}
          multiLine={true}
          onChange={(e) => {
            setFormData({ ...formData, bio: e.target.value });
          }}
          defaultValue={orgData?.bio}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Address"}
          placeHolder={"Address"}
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value });
          }}
          defaultValue={orgData?.address}
        />

        <FormSelect
          sideLabel={"  "}
          placeHolder={"select Country"}
          items={countries}
          onChange={(e) => {
            setFormData({ ...formData, country: e.target.value });
            //console.log(formData.country);

            const c = Countries.getCountries({
              filters: { name: e.target.value },
            })[0];
            //console.log(c.iso2.toString())
            setCities(
              Cities.getCities({ filters: { country_code: c.iso2.toString() } })
            );
            //console.log(c,"current country")
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
          defaultValue={orgData?.zip}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Representative Name"}
          placeHolder={"Representative Name"}
          onChange={(e) => {
            setFormData({ ...formData, repName: e.target.value });
          }}
          defaultValue={orgData?.repName}
        />
        <FormInput
          sideLabel={"Representative Contact No."}
          placeHolder={"Representative Contact No."}
          onChange={(e) => {
            setFormData({ ...formData, repContactNo: e.target.value });
          }}
          defaultValue={orgData?.repContactNo}
        />
      </form>
    </div>
  );
}

export default EditOrganizationPage;
