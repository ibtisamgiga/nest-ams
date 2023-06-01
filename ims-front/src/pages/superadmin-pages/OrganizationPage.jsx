import { useEffect, useState } from "react";
import SearchField from "../../components/shared/SearchField";
import SelectField from "../../components/shared/SelectField";
import StartIconButton from "../../components/shared/StartIconButton";
import MyTables from "../../components/shared/MyTable";
import { getOrganizationsRequest } from "../../redux/organization/organizationAction";
import { useDispatch, useSelector } from "react-redux";
import CircularLoader from "../../components/shared/circular-loader/CircularLoader";
import search from "../../utils/search";
import { SuperAdminOrganizationHeader } from "../../constants/table-constants/tableConstants";
import useScreenSize from "../../utils/checkScreenSize";
import extractValue from "../../utils/objectValueExtractor";

function OrganizationPage() {
  const tableData = useSelector(
    (state) => state.organizationData?.organizations
  );
  const dispatch = useDispatch();
  const isMatch = useScreenSize();
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");
  let locationResult = extractValue(tableData, "location");
  useEffect(() => {
    dispatch(getOrganizationsRequest());
    //locationResult = extractValue(tableData, "location");
  }, [dispatch]);

  const handleSearch = (event) => {
    setFilteredData(search(event, tableData, setSearchText));
  };
  return (
    <div className="body">
      <div className={isMatch ? "uppersection-md" : "uppersection"}>
        <div>
          <h1>Organizations</h1>
        </div>
        <SearchField setSearchData={handleSearch} />
        <SelectField
          fieldName={"Location"}
          items={locationResult?locationResult:[]}
          handleSelect={handleSearch}
        />
        <StartIconButton title={"add"} to="/organization/create" />
      </div>
      {tableData.length != 0 ? (
        <MyTables
          data={filteredData ? filteredData : tableData}
          tableHeaders={SuperAdminOrganizationHeader}
          routes={"/organization/detail"}
        />
      ) : (
        <CircularLoader />
      )}
    </div>
  );
}

export default OrganizationPage;
