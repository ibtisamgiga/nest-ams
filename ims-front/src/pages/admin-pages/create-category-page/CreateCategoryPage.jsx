import { useEffect } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormInput from "../../../components/shared/form-input/FormInput";
import { useState } from "react";
import "./create-category.css";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../redux/category/categoryAction";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../../utils/checkScreenSize";
import Notifier from "../../../components/shared/error-meassge/Notifier";
function CreateCategoryPage() {
  const [formData, setFormData] = useState({
    name: "",
    subCategories: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [subCategoriesArray, setsubCategoriesArray] = useState([]);
  const error = useSelector((state) => state.categoryData?.error);
  const isMatch = useScreenSize();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLoader(true);
    subCategoriesArray.forEach((test) => {
      formData.subCategories.push(test.value);
    });
    setsubCategoriesArray([]);
    dispatch(createCategory(formData));
  };
  const dynamicInputArray = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [dynamicArray, setDynamicArray] = useState(dynamicInputArray);

  const addInput = () => {
    setDynamicArray((prvArray) => {
      return [
        ...prvArray,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setDynamicArray((array) => {
      let tempSubcategoriesArr = array.slice();
      tempSubcategoriesArr[index].value = e.target.value;
      setsubCategoriesArray(tempSubcategoriesArr);
      return tempSubcategoriesArr;
    });
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
      <FormHeader heading={"Add New Category"} form={"createCategory"} />
      <form onSubmit={handleSubmit} id={"createCategory"}>
        <FormInput
          sideLabel={"Category Name"}
          placeHolder={"Category Name"}
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
        <Typography
          variant="h5"
          component={"h1"}
          sx={{ fontWeight: "bold", marginTop: "2%" }}
        >
          Sub-Categories
        </Typography>
        <div className="column">
          <div className="fields">
            {dynamicArray.map((item, i) => {
              return (
                <FormInput
                  key={i}
                  sideLabel={"sub-Category # " + (i + 1)}
                  placeHolder={"sub-Category"}
                  id={i}
                  onChange={handleChange}
                  value={item.value}
                />
              );
            })}
          </div>
          {isMatch ? (
            <StartIconButton title={"Add"} onClick={addInput} right={true} />
          ) : (
            <StartIconButton
              title={"Add sub-category"}
              width={11}
              onClick={addInput}
              left={true}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateCategoryPage;
