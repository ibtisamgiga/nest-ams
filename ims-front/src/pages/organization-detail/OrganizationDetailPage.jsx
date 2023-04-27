import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import DetailHeader from "../../components/shared/details-header/DetailHeader";
import ImageText from "../../components/shared/image-with-text/ImageText";
import LabelText from "../../components/shared/text-with-label/LabelText";
import TabsVertical from "../../components/shared/verticat-tabs/TabVertical";
import MyTables from "../../components/shared/MyTable";
import { useParams } from "react-router-dom";
import {
  deleteOrganization,
  fetchOrgaizationList,
  getOrganizationRequest,
} from "../../redux/organization/organizationAction";
import { useDispatch, useSelector } from "react-redux";
function OrganizationDetailPage() {
  const [index, setIndex] = React.useState(0);
  const { id } = useParams();

  const header = ["ID", "Image", "Name", "Email", "Contact No.", "Action"];
  const orgData = useSelector((state) => state.organizationData.organization);
  const Data = orgData?.admins?.filter((user) => user.roles == "admin");
  console.log(Data,'s')
  const [once, setOnce] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!once) {
      dispatch(getOrganizationRequest(id));
      setOnce(true);
    }
  }, [orgData]);

  return (
    <div className="body">
      <DetailHeader editAction={"/organization/edit/"+id} deleteAction={()=>dispatch(deleteOrganization(id))} />
      <Divider
        orientation="vertical"
        sx={{ borderRightWidth: "4px", marginTop: "20px" }}
      />
      <Box sx={{ display: "flex" }}>
        <TabsVertical
          tab1={"General Information"}
          tab2={"Admins"}
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
        ) : Data?.length==0?(<Box>NO ADMINS</Box>):
        (
          <Box sx={{ width: "70%", marginLeft: "4%" }}>
            <MyTables
              data={Data}
              tableHeaders={header}
              createData={(Data) => {
                return { ...Data };
              }}
              routes={"/admin/detail"}
            />
          </Box>
        ) }
      </Box>
    </div>
  );
}

export default OrganizationDetailPage;
