import React, { useEffect, useState } from "react";
import SearchField from "../../components/shared/SearchField";
import SelectField from "../../components/shared/SelectField";
import MyTables from "../../components/shared/MyTable";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintsRequest } from "../../redux/complaints/complaintAction";
import CircularLoader from "../../components/shared/circular-loader/CircularLoader";
import { getOrganizationsRequest } from "../../redux/organization/organizationAction";
import extractValue from "../../utils/objectValueExtractor";
import search from "../../utils/search";
import { SuperAdminComplainHeader } from "../../constants/table-constants/tableConstants";
import useScreenSize from "../../utils/checkScreenSize";
import { status } from "../../utils/enums/statusEnum";
function ComplaintsPage() {
  const { complaintData, organizationData } = useSelector((state) => state);
  const tableData = complaintData?.complaints;
  const organizations = organizationData?.organizations;
  const organizationsSelectData = extractValue(organizations, "name");
  const dispatch = useDispatch();
  const isMatch = useScreenSize();
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getComplaintsRequest());
    dispatch(getOrganizationsRequest());
  }, [dispatch]);

  const handleSearch = (event) => {
    setFilteredData(search(event, tableData, setSearchText));
  };

  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Complaints</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Organization"}
          items={organizationsSelectData}
          handleSelect={handleSearch}
        />
        <SelectField
          fieldName={"Status"}
          items={[status.PENDING, status.RESOLVED]}
          handleSelect={handleSearch}
        />
      </div>
      {tableData.length != 0 ? (
        <MyTables
          data={filteredData ? filteredData : tableData}
          tableHeaders={SuperAdminComplainHeader}
          routes={"/complaints/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default ComplaintsPage;
