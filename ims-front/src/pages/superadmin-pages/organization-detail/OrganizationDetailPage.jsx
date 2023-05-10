import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import DetailHeader from "../../../components/shared/details-header/DetailHeader";
import ImageText from "../../../components/shared/image-with-text/ImageText";
import LabelText from "../../../components/shared/text-with-label/LabelText";
import TabsVertical from "../../../components/shared/verticat-tabs/TabVertical";
import MyTables from "../../../components/shared/MyTable";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  deleteOrganization,
  fetchOrgaizationList,
  getOrganizationRequest,
} from "../../../redux/organization/organizationAction";
import { useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SuperAdminOrganizationDetailHeader } from "../../../constants/table-constants/tableConstants";
function OrganizationDetailPage() {
  const [index, setIndex] = React.useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const orgData = useSelector((state) => state.organizationData.organization);
  const tableData = orgData?.admins?.filter((user) => user.roles == "admin");
  const [once, setOnce] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!once) {
      dispatch(getOrganizationRequest(id));
      setOnce(true);
    }
  }, [orgData]);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className="body">
      <DetailHeader
        editAction={"/organization/edit/" + id}
        deleteAction={() => {
          dispatch(deleteOrganization(id));
          navigate(-1);
        }}
      />
      <Divider
        orientation="vertical"
        sx={{ borderRightWidth: "4px", marginTop: "20px" }}
      />
      <Box sx={{ display: "flex", flexDirection: isMatch ? "column" : "row" }}>
        <TabsVertical
          tab1={"General Information"}
          tab2={"Admins"}
          display={isMatch ? "horizontal" : "vertical"}
          index={index}
          onChange={(event, value) => setIndex(value)}
        />

        {index == 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ImageText
              name={orgData?.name}
              email={orgData?.email}
              image={orgData?.image?.image}
            />
            <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />

            <LabelText label={"Bio"} content={orgData?.bio} />
            <LabelText label={"Address"} content={orgData?.address} />
            <LabelText
              label={"Representative Name"}
              content={orgData?.repName}
            />
            <LabelText
              label={"Representative Contact No"}
              content={orgData?.repContactNo}
            />
          </Box>
        ) : tableData?.length == 0 ? (
          <Box>NO ADMINS</Box>
        ) : (
          <Box sx={{ width: "70%", marginLeft: "4%" }}>
            <MyTables
              data={tableData}
              tableHeaders={SuperAdminOrganizationDetailHeader}
              routes={"/admin/detail"}
            />
          </Box>
        )}
      </Box>
    </div>
  );
}

export default OrganizationDetailPage;
