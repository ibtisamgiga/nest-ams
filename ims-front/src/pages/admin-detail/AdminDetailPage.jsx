import React, { useEffect, useState } from "react";
import DetailHeader from "../../components/shared/details-header/DetailHeader";
import ImageText from "../../components/shared/image-with-text/ImageText";
import { Divider, Typography } from "@mui/material";
import dp from "../../components/shared/image-with-text/dummy";
import LabelText from "../../components/shared/text-with-label/LabelText";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUserById } from "../../redux/users/usersAction";
import { usersData } from "../../redux/users/usersReducer";
import { useNavigate } from "react-router-dom";
function AdminDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userData = useSelector((state) => state.usersData.selectedUser);
  const [once, setOnce] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!once) {
      dispatch(fetchUserById(id));
      setOnce(true);
    }
  }, [userData]);

  return (
    <div className="body">
      <DetailHeader
        heading={"Admin Detail"}
        editAction={"/admin/edit/" + id}
        deleteAction={() => {
          dispatch(deleteUser(id));
          navigate(-1);
        }}
      />
      <ImageText
        image={userData?.image?.image}
        name={userData?.name}
        email={userData?.email}
        number={userData?.contactNo}
      />
      <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
      <Typography variant="h5" component={"h1"} sx={{ fontWeight: "bold" }}>
        Organization
      </Typography>
      <ImageText
        image={userData?.orgImage?.image}
        name={userData?.organizationName}
        email={userData?.orgEmail}
      />
      <LabelText label={"Representative Name"} content={userData?.repName} />
      <LabelText
        label={"Representative Contact No"}
        content={userData?.repContactNo}
      />
      <LabelText label={"Bio"} content={userData?.bio} />
      <LabelText label={"Address"} content={userData?.address} />
    </div>
  );
}

export default AdminDetailPage;
