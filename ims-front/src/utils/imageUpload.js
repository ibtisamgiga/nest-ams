const imageUploadHelper=(body)=>{
return fetch("https://api.cloudinary.com/v1_1/dntzlt0mt/image/upload",{
    method:"POST",
    body:body
}).then((res)=>res.json())
.catch((err)=>{
    console.log(err)
})
}
export default
    imageUploadHelper
