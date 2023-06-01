const search = (event, tableData, setSearchText) => {
  setSearchText(event.target.value);
  const filteredRows = tableData.filter((row) => {
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
  return filteredRows;
};

export default search;
