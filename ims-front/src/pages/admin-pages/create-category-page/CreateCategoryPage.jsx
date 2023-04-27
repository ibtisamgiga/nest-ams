import React from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormInput from "../../../components/shared/form-input/FormInput";
import { useEffect, useState } from "react";
import "./create-category.css";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import StartIconButton from "../../../components/shared/StartIconButton";
function CreateCategoryPage() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
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
      const newArr = s.slice();
       newArr[index].value = e.target.value;
       console.log(newArr);
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
                //   <input
                //     onChange={handleChange}
                //     value={item.value}
                //     id={i}
                //     type={item.type}
                //     size="40"
                //   />
                <FormInput
                  sideLabel={"sub-Category # "+(i+1)}
                  placeHolder={"sub-Category"}
                  id={i}
                  onChange={handleChange}
                  value={item.value}
                />
              );
            })}
          </div>
          <StartIconButton
            title={"Add Sub-Category"}
            onClick={addInput}
            width={11}
            left={true}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateCategoryPage;
