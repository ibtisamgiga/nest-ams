import { useEffect, useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import { Divider } from "@mui/material";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDepartment,
  getDepartmentRequest,
  updateDepartment,
} from "../../../redux/departments/departmentAction";
function EditDepartmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const department = useSelector((state) => state.departmentData?.department);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: formData.name,
      contactNo: formData.contactNo,
      email: formData.email,
    };
    dispatch(updateDepartment(body, id));
    navigate(-1);
  };
  useEffect(() => {
    dispatch(getDepartmentRequest(id));
    setFormData({ ...formData, ...department });
  }, [dispatch]);
  return (
    <div className="body">
      <FormHeader heading={"Edit Department"} form={"editDepartment"} />
      <form onSubmit={handleSubmit} id={"editDepartment"}>
        <FormInput
          sideLabel={"Name"}
          placeHolder={"Name"}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          defaultValue={department?.name}
        />
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Number"}
          placeHolder={"Number"}
          onChange={(e) => {
            setFormData({ ...formData, contactNo: e.target.value });
          }}
          defaultValue={department?.contactNo}
        />

        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Email"}
          placeHolder={"Email"}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          defaultValue={department?.email}
        />
      </form>
    </div>
  );
}

export default EditDepartmentPage;
