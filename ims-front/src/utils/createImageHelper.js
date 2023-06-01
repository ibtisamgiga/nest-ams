const createImageHelper = (files) => {
  const imgdata = new FormData();
  imgdata.append("file", files.fileList[0]);
  imgdata.append("upload_preset", "fqje0r0l");
  imgdata.append("cloud_name", "dntzlt0mt");
  return imgdata;
};
export default createImageHelper;
