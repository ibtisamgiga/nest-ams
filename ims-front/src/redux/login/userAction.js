import { SEND_OTP, SIGIN_IN } from "../constants"

export const siginIn=(data)=>{
    //let data='sigin in'
   
    return ({
        type:SIGIN_IN,
        data

    })
}

