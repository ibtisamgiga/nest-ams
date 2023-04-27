import React, { useState } from "react";
import SearchField from "../components/shared/SearchField";
import SelectField from "../components/shared/SelectField";
import StartIconButton from "../components/shared/StartIconButton";
import MyTables from "../components/shared/MyTable";
import AddIcon from "@mui/icons-material/Add";
import { useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../redux/users/usersAction";
import { useEffect } from "react";

function AdminPage() {
  // const Data = [
  //   {
  //     id: 1,
  //     image: "https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png",
  //     name: "zain",
  //     organization: "gigalabs",
  //     email: "hello@gmail.com",
  //     number: "923342251274",

  //   },

  //   {
  //     id: 2,
  //     image: "https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png",
  //     name: "mustafa",
  //     organization: "I2C",
  //     email: "next@gmail.com",
  //     number: "11111122222222",

  //   },
  //   {
  //     id: 3,
  //     image: "https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png",
  //     name: "Ali",
  //     organization: "tanbits",
  //     email: "next@gmail.com",
  //     number: "11111122222222",

  //   },
  // ];
  const header = [
    "ID",
    "Image",
    "Name",
    "Organization",
    "Email",
    "Contact No.",
    "Action",
  ];
  const Data = useSelector((state) => state.usersData.userList);
  const [once, setOnce] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [filteredData, setFilteredData] = useState(Data);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchUserList());
    console.log(Data)
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    const filteredRows = Data?.filter((row) => {
      let shouldInclude = false;
      Object.values(row).forEach((value) => {
        if (
          typeof value === "string" &&
          value.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
          shouldInclude = true;
        }
      });
      return shouldInclude;
    });
    setFilteredData(filteredRows);
  };

  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Admins</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Organization"}
          items={["gigalabs", "tanbits", "I2C"]}
          handleSelect={handleSearch}
        />
        <StartIconButton title={"add"} to="/create/admin" />
      </div>
      <MyTables
        data={filteredData}
        tableHeaders={header}
        createData={(Data) => {
          return { ...Data };
        }}
        routes={"/admin/detail"}
      />
    </div>
  );
}

export default AdminPage;
