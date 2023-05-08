import React from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormInput from "../../../components/shared/form-input/FormInput";
import { useEffect, useState } from "react";
import "./create-category.css";
import { useTheme, useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../redux/category/categoryAction";
import { useNavigate } from "react-router-dom";
function CreateCategoryPage() {
  const [formData, setFormData] = useState({
    name: "",
    subCategories: [],
  });
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [testArr, setTestArr] = useState([]);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const handleSubmit = async (e) => {
    e.preventDefault();

    testArr.forEach((test) => {
      formData.subCategories.push(test.value);
    });
    setTestArr([]);
    dispatch(createCategory(formData));
    navigate(-1);
  };
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
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
    setArr((s) => {
      let newArr = s.slice();
      newArr[index].value = e.target.value;
      setTestArr(newArr);
      return newArr;
    });
  };
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
        <Typography
          variant="h5"
          component={"h1"}
          sx={{ fontWeight: "bold", marginTop: "2%" }}
        >
          Sub-Categories
        </Typography>
        <div className="column">
          <div className="fields">
            {arr.map((item, i) => {
              return (
                <FormInput
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
            <StartIconButton title={"Add sub-category"} width={11} onClick={addInput} left={true} />
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateCategoryPage;
