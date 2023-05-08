import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import DetailHeader from "../../../components/shared/details-header/DetailHeader";
import ImageText from "../../../components/shared/image-with-text/ImageText";
import LabelText from "../../../components/shared/text-with-label/LabelText";
import TabsVertical from "../../../components/shared/verticat-tabs/TabVertical";
import MyTables from "../../../components/shared/MyTable";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUserById } from "../../../redux/users/usersAction";
function EmployeeDetailPage() {
  const [index, setIndex] = useState(0);
  const { id } = useParams();
  const userData = useSelector((state) => state.usersData.selectedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch]);
  const Data = [];

  const header = [
    "ID",
    "Item Name",
    "Category",
    "Sub-Category",
    "Assigined Date",
    "Assigined By",
  ];
  const Iheader = [
    "ID",
    "Item Name",
    "Category",
    "sub-category",
    "Status",
    "Action By",
  ];
  return (
    <div className="body">
      <DetailHeader
        editAction={"/employee/edit/" + id}
        deleteAction={() => {
          dispatch(deleteUser(id));
          navigate(-1);
        }}
      />
      <Divider
        orientation="vertical"
        sx={{ borderRightWidth: "4px", marginTop: "20px" }}
      />
      <Box sx={{ display: "flex" }}>
        <TabsVertical
          tab1={"General Information"}
          tab2={"Inventory"}
          tab3={"Request"}
          index={index}
          onChange={(event, value) => setIndex(value)}
        />
        {index == 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              marginLeft: "2%",
            }}
          >
            <ImageText image={userData?.image?.image} name={userData?.name} />
            <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />

            <LabelText
              label={"Email Address"}
              content={userData?.email}
              divider
            />
            <LabelText
              label={"Contact Number"}
              content={userData?.contactNo}
              divider
            />
            <LabelText label={"Department"} content={userData?.department} />
          </Box>
        ) : index == 1 ? (
          <Box sx={{ width: "70%", marginLeft: "4%" }}>
            <MyTables
              data={userData?.items}
              tableHeaders={header}
              createData={(Data) => {
                return { ...Data };
              }}
            />
          </Box>
        ) : (
          <Box sx={{ width: "70%", marginLeft: "4%" }}>
            <MyTables
              data={userData?.requests}
              tableHeaders={Iheader}
              createData={(Data) => {
                return { ...Data };
              }}
              //routes={"/admin/detail"}
            />
          </Box>
        )}
      </Box>
    </div>
  );
}

export default EmployeeDetailPage;
