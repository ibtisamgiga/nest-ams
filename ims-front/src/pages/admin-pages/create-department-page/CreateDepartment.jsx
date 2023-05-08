import { useEffect, useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import { Divider } from "@mui/material";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import { useDispatch, useSelector } from "react-redux";
import { createDepartment } from "../../../redux/departments/departmentAction";
import { useNavigate } from "react-router-dom";
function CreateDepartmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
  });
  const dispatch = useDispatch();
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createDepartment(formData));
    navigate(-1)
    
  };
  const response = useSelector((state) => state.departmentData);
  useEffect(() => {}, [response]);
  return (
    <div className="body">
      <FormHeader heading={"Add Department"} form={"createDepartment"} />
      <form onSubmit={handleSubmit} id={"createDepartment"}>
        <FormInput
          sideLabel={"Name"}
          placeHolder={"Name"}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          value={formData.name}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Number"}
          placeHolder={"Number"}
          onChange={(e) => {
            setFormData({ ...formData, contactNo: e.target.value });
          }}
          value={formData.contactNo}
        />

        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Email"}
          placeHolder={"Email"}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          value={formData.email}
        />
      </form>
    </div>
  );
}

export default CreateDepartmentPage;
