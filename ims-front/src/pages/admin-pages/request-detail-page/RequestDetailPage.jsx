import { Typography } from '@mui/material'
import React from 'react'
import StatusHeader from '../../../components/shared/header-with-status/StatusHeader'
import ImageText from '../../../components/shared/image-with-text/ImageText'
import LabelText from '../../../components/shared/text-with-label/LabelText'

function RequestDetailPage() {
  return (
    <div className='body'>
        <StatusHeader label={'Request ID :'}heading={'123'} status={'Pending'} date={'11/12/22'} reject={'reject'}/>
        <LabelText label={"Description"} 
        divider
        content=
        {'lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum lorem ispsum'}/>
        <LabelText label={'Item Name'} content={'MacBook Pro'} divider/>
        <LabelText label={'Category'} content={'Electronics'} divider/>
        <LabelText label={'Sub-Category'} content={'Mouse'} divider/>
        <Typography variant='h5'component={'h1'} sx={{fontWeight:'bold'}}>
         Request Submitted by
        </Typography>
        <ImageText image={''} name={"Empery Siphron"} email={"ali@gmail.com"} number={"02345677537"}/>
       
    </div>
  )
}

export default RequestDetailPage