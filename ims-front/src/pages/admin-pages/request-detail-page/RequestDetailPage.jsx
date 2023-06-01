import { Typography } from "@mui/material";
import { useEffect } from "react";
import StatusHeader from "../../../components/shared/header-with-status/StatusHeader";
import ImageText from "../../../components/shared/image-with-text/ImageText";
import LabelText from "../../../components/shared/text-with-label/LabelText";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequestRequest,
  updateRequest,
} from "../../../redux/request/requestAction";
import { approved, rejected } from "../../../constants/return-constants";
import { status } from "../../../utils/enums/statusEnum";
function RequestDetailPage() {
  const { id } = useParams();
  const requestData = useSelector((state) => state.requestData.request);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequestRequest(id));
  }, [dispatch]);
  return (
    <div className="body">
      <StatusHeader
        label={"Request ID :"}
        heading={requestData?.id}
        status={requestData?.status}
        date={requestData?.created_at}
        nobutton={requestData?.status == status.PENDING ? false : true}
        reject={requestData?.status == status.PENDING ? "reject" : null}
        markResolveAction={() => {
          dispatch(updateRequest(approved, id));
          navigate(-1);
        }}
        rejectAction={() => {
          dispatch(updateRequest(rejected, id));
          navigate(-1);
        }}
      />
      <LabelText
        label={"Description"}
        divider
        content={requestData?.description}
      />
      <LabelText
        label={"Item Name"}
        content={requestData?.item?.name}
        divider
      />
      <LabelText
        label={"Category"}
        content={requestData?.item?.category?.parent?.name}
        divider
      />
      <LabelText
        label={"Sub-Category"}
        content={requestData?.item?.category?.name}
        divider
      />
      <Typography variant="h5" component={"h1"} sx={{ fontWeight: "bold" }}>
        Request Submitted by
      </Typography>
      <ImageText
        image={requestData?.user.image?.image}
        name={requestData?.user?.name}
        email={requestData?.user?.email}
        number={requestData?.user?.contactNo}
      />
    </div>
  );
}

export default RequestDetailPage;
