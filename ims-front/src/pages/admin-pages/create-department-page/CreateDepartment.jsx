import { useEffect, useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import { Divider } from "@mui/material";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import { useDispatch, useSelector } from "react-redux";
import { createDepartment } from "../../../redux/departments/departmentAction";
import { useNavigate } from "react-router-dom";
import Notifier from "../../../components/shared/error-meassge/Notifier";
function CreateDepartmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const error = useSelector((state) => state.departmentData?.error);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLoader(true);
    dispatch(createDepartment(formData));
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
        {error && formSubmitted ? (
          <div>
            <Notifier error={error} success={false} />
          </div>
        ) : formSubmitted ? (
          <Notifier error={error} success={true} />
        ) : null}
        <FormInput
          type={"number"}
          sideLabel={"Number"}
          placeHolder={"Number"}
          onChange={(e) => {
            setFormData({ ...formData, contactNo: e.target.value });
          }}
          value={formData.contactNo}
        />

        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        <FormInput
          type={"email"}
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
