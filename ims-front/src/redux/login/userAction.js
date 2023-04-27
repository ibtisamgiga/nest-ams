import { SIGIN_IN } from "../constants"

export const siginIn=(data)=>{
    //let data='sigin in'
    console.log('sigin in action',data)
    return ({
        type:SIGIN_IN,
        data

    })
}