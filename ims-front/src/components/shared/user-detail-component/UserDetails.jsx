import { Avatar, Divider, Typography } from "@mui/material";
import React from "react";
import "./user-detail.css";
import UserDetailText from "./UserDetailText";
function UserDetails() {
  return (
    <div className="ud-content-holder">
      <Avatar
        alt="Remy Sharp"
        src={""}
        sx={{ width: 150, height: 150, borderRadius: "15px" }}
        variant="square"
      />
      <UserDetailText
        heading1={"Full Name"}
        heading2={"Email Address"}
        content1={"Amir"}
        content2={"amir@gigalabs.co"}
      />
      <UserDetailText
        heading1={"Desiganation"}
        heading2={"Department"}
        content1={"Jnr Software Eng"}
        content2={"Engineerning"}
      />
      <UserDetailText
        heading1={"Contact Number"}
        heading2={"Education"}
        content1={"43231415624243"}
        content2={"Bs Computer Science"}
      />
      <UserDetailText
        heading1={"Company Experience"}
        heading2={"Total Experience"}
        content1={"2 Years"}
        content2={"2 Years"}
      />
      <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
    </div>
  );
}

export default UserDetails;
