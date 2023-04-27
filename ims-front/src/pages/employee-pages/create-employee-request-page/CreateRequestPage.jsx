import React from 'react'
import FormHeader from '../../../components/shared/form-header/FormHeader'
import FormInput from '../../../components/shared/form-input/FormInput'
import FormSelect from '../../../components/shared/form-select/FormSelect'
import { Divider } from '@mui/material'

function CreateRequestPage() {
  return (
    <div className='body'>
       <FormHeader heading={"Create New Request"} form={"createRequest"} />
       <form onSubmit={null} id={"createRequest"}>
       <FormInput sideLabel={"Item Name"}
          placeHolder={"Item Name"}/>
               <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
          <FormSelect sideLabel={"Category"}
          placeHolder={"Category"}
          items={[
            { name: "gigalabs", id: 1 },
            { name: "tanbits", id: 2 },
            { name: "I2C", id: 3 },
          ]}/>
               <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
            <FormSelect sideLabel={"Sub-Category"}
          placeHolder={"Sub-Category"}
          items={[
            { name: "gigalabs", id: 1 },
            { name: "tanbits", id: 2 },
            { name: "I2C", id: 3 },
          ]}/>
               <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
          <FormSelect sideLabel={"Type"}
          placeHolder={"Type"}
          items={[
            { name: "gigalabs", id: 1 },
            { name: "tanbits", id: 2 },
            { name: "I2C", id: 3 },
          ]}/>
          
          <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
<FormInput sideLabel={"Description"}
          placeHolder={"Enter Description Here"} multiLine={true}/>
          </form>
    </div>
  )
}

export default CreateRequestPage