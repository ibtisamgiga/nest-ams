import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StatusHeader from '../../components/shared/header-with-status/StatusHeader'
import ImageText from '../../components/shared/image-with-text/ImageText'
import LabelText from '../../components/shared/text-with-label/LabelText'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintRequest, updateComplaint } from '../../redux/complaints/complaintAction'
function ComplaintDetailPage() {
  const { id } = useParams();
  const complainData = useSelector((state) => state.complaintData.complaint);
  const [once, setOnce] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
   // if (!once) {
      dispatch(getComplaintRequest(id));
    //   setOnce(true);
    // }
  }, [dispatch]);
  return (
    <div className='body'>
        <StatusHeader label={'Complaint ID :'}heading={complainData?.id} status={complainData?.status} 
        markResolveAction={()=>dispatch(updateComplaint({status:"Resolved"},id))}
        />
        <LabelText label={"Description"} 
        content=
        {complainData?.description}/>
         <Typography variant='h5'component={'h1'} sx={{fontWeight:'bold'}}>
          Complaint Submitted by
        </Typography>
        <ImageText image={complainData?.user?.image?.image} name={complainData?.user?.name} email={complainData?.user?.email} number={complainData?.user?.contactNo}/>
    
    </div>
  )
}

export default ComplaintDetailPage