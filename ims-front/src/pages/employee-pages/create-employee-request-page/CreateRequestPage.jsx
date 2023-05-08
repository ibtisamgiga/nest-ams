import React, { useEffect, useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getItemsRequest } from "../../../redux/item/itemAction";
import { createRequest } from "../../../redux/request/requestAction";
import { useNavigate } from "react-router-dom";

function CreateRequestPage() {
  const [formData, setFormData] = useState({
    requestType: "",
    itemId: "",
    description: "",
  });
const navigate=useNavigate()
  const dispatch = useDispatch();
  const items = useSelector((state) => state.itemData.items);
  useEffect(() => {}, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createRequest(formData));
    navigate(-1)
  };
  return (
    <div className="body">
      <FormHeader heading={"Create New Request"} form={"createRequest"} />
      <form onSubmit={handleSubmit} id={"createRequest"}>
        <FormSelect
          sideLabel={"Type"}
          placeHolder={"Type"}
          items={[
            { name: "Faulty", id: 1 },
            { name: "Acquisition", id: 2 },
          ]}
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
      </form>
    </div>
  );
}

export default CreateRequestPage;
