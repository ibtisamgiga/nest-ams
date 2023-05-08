import { useEffect, useState } from "react";
import FormHeader from "../../../components/shared/form-header/FormHeader";
import { Divider } from "@mui/material";
import FormInput from "../../../components/shared/form-input/FormInput";
import FormSelect from "../../../components/shared/form-select/FormSelect";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest } from "../../../redux/category/categoryAction";
import { useNavigate, useParams } from "react-router-dom";
import { createItem, getItemRequest, updateItem } from "../../../redux/item/itemAction";
function EditItemPage() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const categories = useSelector((state) => state.categoryData.categories);
  const item = useSelector((state) => state.itemData?.item);
  const { id } = useParams();
  const cat = categories.filter((obj) => obj.parent === null);
  const [current, setCurrent] = useState(cat[0]); //cat.filter(obj => obj.parent === null);
  const [currSubCat,setCurrSubCat]=useState(cat[0]?.children[0]?cat[0]?.children[0]:[{}])
  useEffect(() => {
    dispatch(getCategoriesRequest());
    dispatch(getItemRequest(id))
    //setCurrent(cat[0]);
    setFormData({ ...formData, ...item });
  }, [dispatch]);

 
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    description: "",
    vendorId: null,
    price: null,
    categoryId: null,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: formData.name,
      serialNumber: formData.serialNumber,
      description: formData.description,
      vendorId: formData.vendorId,
      price: formData.price,
      categoryId:formData.categoryId
    };
    dispatch(updateItem(body,id))
    navigate(-1)
   // dispatch(createItem(formData))
   
  };

  
  return (
    <div className="body">
      <FormHeader heading={"Edit Item"} form={"editItem"} />
      <form onSubmit={handleSubmit} id={"editItem"}>
        <FormInput
          sideLabel={"Item Name"}
          placeHolder={"Item Name"}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
         defaultValue={item?.name}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Serial Number"}
          placeHolder={"Serial Number"}
          onChange={(e) => {
            setFormData({ ...formData, serialNumber: e.target.value });
          }}
          defaultValue={item?.serialNumber}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"Description"}
          placeHolder={"Enter Description Here..."}
          multiLine={true}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
         defaultValue={item?.description}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormSelect
        defaultValue={item?.category?.parent?.id}
          sideLabel={"Select Category "}
          placeHolder={"select Category"}
          items={cat}
          keyId={1}
          onChange={(e) => {
            setFormData({ ...formData, categoryId: e.target.value });
            setCurrent(...cat.filter((obj) => obj.id == e.target.value));
          }}
        />
        <FormSelect
          defaultValue={item?.category?.id}
          sideLabel={"Select Sub-Category "}
          placeHolder={"select Sub-Category"}
          items={current?.children}//current[0]?.children
          keyId={1}
          onChange={(e) => {
            setFormData({ ...formData, categoryId: e.target.value });
            setCurrSubCat(...current.children.filter((obj) => obj.id == e.target.value));
          }}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormInput
          sideLabel={"price"}
          placeHolder={"price"}
          onChange={(e) => {
            setFormData({ ...formData, price: e.target.value });
          }}
          defaultValue={item?.price}
        />
        <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
        <FormSelect
        defaultValue={item?.vendor?.id}
          sideLabel={"Select Vendor  "}
          placeHolder={"select Vendor"}
          items={currSubCat.vendors.length==0?[]:currSubCat.vendors}
          keyId={1}
          onChange={(e) => {
            setFormData({ ...formData, vendorId: e.target.value });
          }}
        />
      </form>
    </div>
  );
}

export default EditItemPage;
