import { useEffect, useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getItemsRequest } from "../../../redux/item/itemAction";
import { createRequest } from "../../../redux/request/requestAction";
import { useNavigate } from "react-router-dom";
import { selectRequestTypeOptions } from "../../../constants/create-request-constants";
import CircularLoader from "../../../components/shared/circular-loader/CircularLoader";

function CreateRequestPage() {

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    requestType: "",
    itemId: "",
    description: "",
  });
  const dispatch = useDispatch();
  const items = useSelector((state) => state.itemData.items);
  const error = useSelector((state) => state.requestData?.error);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLoader(true);
    dispatch(createRequest(formData));
  };
  useEffect(() => {
    if (error !== null && error !== undefined) {
      setLoader(false);
      console.log("error", error);
    } else if (formSubmitted && error === null) {
      console.log("error", error);
      navigate(-1);
      setLoader(false);
    }
  }, [error, navigate, dispatch]);
  return (
    <div className="body">
      <FormHeader heading={"Create New Request"} form={"createRequest"} />
      <form onSubmit={handleSubmit} id={"createRequest"}>
        <FormSelect
          sideLabel={"Type"}
          placeHolder={"Type"}
          items={selectRequestTypeOptions}
          onChange={(e) => {
            setFormData({ ...formData, requestType: e.target.value });
            dispatch(getItemsRequest(e.target.value));
          }}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormSelect
          keyId={1}
          sideLabel={"Item Name"}
          placeHolder={"Item Name"}
          items={items ? items : []}
          onChange={(e) => {
            setFormData({ ...formData, itemId: e.target.value });
          }}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Description"}
          placeHolder={"Enter Description Here"}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
          value={formData.description}
          multiLine={true}
        />
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default CreateRequestPage;
