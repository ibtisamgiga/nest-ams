const formBody = (formData) => {
  return {
    name: formData.name,
    privateEmail: formData.privateEmail,
    contactNo: formData.contactNo,
    organizationId: formData.organizationId,
    designation: formData.designation,
    education: formData.education,
    totalExp: formData.totalExp,
    compExp: formData.companyExperience,
    image: formData?.image,
  };
};
export { formBody };
