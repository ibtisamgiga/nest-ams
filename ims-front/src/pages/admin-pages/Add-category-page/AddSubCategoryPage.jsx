import React from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import FormInput from "../../../components/shared/form-input/FormInput";
import { useEffect, useState } from "react";
import "./add-sub-category.css";
import { useTheme, useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import StartIconButton from "../../../components/shared/StartIconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategoryRequest,
  updateCategory,
} from "../../../redux/category/categoryAction";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LabelText from "../../../components/shared/text-with-label/LabelText";
function AddSubCategoryPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    subCategories: [],
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const check = queryParams.get("edit");
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

    dispatch(updateCategory(formData, id));
    // dispatch(createCategory(formData));
    navigate(-1);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    dispatch(updateCategory({ name: editFormData?.name }, id));
    navigate("/categories");
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
  useEffect(() => {
    dispatch(getCategoryRequest(id));
    setEditFormData({ ...editFormData, ...category });
  }, [dispatch]);
  const category = useSelector((state) => state.categoryData?.category);
  return (
    <div className="body">
      <FormHeader heading={"Add New Category"} form={"createCategory"} />
      {check ? (
        <form
          onSubmit={check ? handleEdit : handleSubmit}
          id={"createCategory"}
        >
          <FormInput
            sideLabel={"Category"}
            placeHolder={"Category"}
            onChange={(e) => {
              setEditFormData({ ...editFormData, name: e.target.value });
            }}
            defaultValue={category?.name}
          />
          <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
        </form>
      ) : (
        <form onSubmit={handleSubmit} id={"createCategory"}>
          <LabelText label={"Category Name"} content={category?.name} />
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
              {category?.subcategories.map((item, i) => {
                return (
                  <>
                    <LabelText
                      label={"Category Name # " + i}
                      content={item?.name}
                    />
                    <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
                  </>
                );
              })}
              <div className="fields">
                {arr.map((item, i) => {
                  return (
                    <FormInput
                      sideLabel={
                        "sub-Category # " + (i + category?.subcategories.length)
                      }
                      placeHolder={"sub-Category"}
                      id={i}
                      onChange={handleChange}
                      value={item.value}
                    />
                  );
                })}
              </div>
            </div>
            {isMatch ? (
              <StartIconButton title={"Add"} onClick={addInput} right={true} />
            ) : (
              <StartIconButton
                title={"Add"}
                width={11}
                onClick={addInput}
                left={true}
              />
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default AddSubCategoryPage;
