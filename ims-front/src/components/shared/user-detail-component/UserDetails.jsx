import { Avatar, Divider, Typography } from "@mui/material";
import React from "react";
import "./user-detail.css";
import UserDetailText from "./UserDetailText";
function UserDetails({name,email,number,desiganation,department,education,companyExp,totalExp,image}) {
  return (
    <div className="ud-content-holder">
      <Avatar
        alt="Remy Sharp"
        src={image}
        sx={{ width: 150, height: 150, borderRadius: "15px" }}
        variant="square"
      />
      <UserDetailText
        heading1={"Full Name"}
        heading2={"Email Address"}
        content1={name}
        content2={email}
      />
      <UserDetailText
        heading1={"Desiganation"}
        heading2={"Department"}
        content1={desiganation}
        content2={department}
      />
      <UserDetailText
        heading1={"Contact Number"}
        heading2={"Education"}
        content1={number}
        content2={education}
      />
      <UserDetailText
        heading1={"Company Experience"}
        heading2={"Total Experience"}
        content1={companyExp}
        content2={totalExp}
      />
      <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
    </div>
  );
}

export default UserDetails;
