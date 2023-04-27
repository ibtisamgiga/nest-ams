import React from "react";
import DetailHeader from "../../../components/shared/details-header/DetailHeader";
import MyTables from "../../../components/shared/MyTable";
import LabelText from "../../../components/shared/text-with-label/LabelText";

function VendorDetailPage() {
  const Data = [
    {
      id: 1,
      name: "zain",
      email: "hello@gmail.com",
      number: "923342251274",
      department: "HR",
    },

    {
      id: 2,
      name: "mustafa",
      email: "next@gmail.com",
      number: "11111122222222",
      department: "DEV",
    },
  ];
  const header = [
    "ID",
    "Name",
    "Email",
    "Contact Number",
    "Department",
  ];
  return (
    <div className="body">
      <DetailHeader />
      <LabelText label={"Name"} content={"john Doe"} divider />
      <LabelText label={"Contact Number"} content={"12354628"} divider />
      <LabelText label={"Category"} content={"Electronics"} divider />
      <LabelText label={"Recent Orders"} />
      <MyTables
        data={Data}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
      />
    </div>
  );
}

export default VendorDetailPage;
