import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Avatar from "@mui/material/Avatar";
import { useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function MyTables({ data, createData, tableHeaders, routes,query}) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const style = isMatch
    ? { minWidth: 500, width: "100%", display: "block", overflowX: "auto" }
    : { minWidth: 500 };

  let rows = [];

  data?.forEach((element) => {
    rows.push(createData(element));
  });

  const headers = tableHeaders;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#5184ec",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
      align: "center",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  let keys = Object.keys(rows[0] ?? {});

  return (
    <TableContainer component={Paper}>
      <Table sx={style} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers.map((title) => {
              return (
                <StyledTableCell key={title} align="center">
                  {title}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(
              (page - 1) * rowsPerPage,
              (page - 1) * rowsPerPage + rowsPerPage
            )
            .map((row) => (
              // {rows.map((row) => (
              <StyledTableRow key={row.id}>
                {keys.map((key) => {
                  // if (key == "view") {
                  //   return (
                  //     <StyledTableCell align="center">
                  //       <Link to={row[key]}>view</Link>
                  //     </StyledTableCell>
                  //   );
                  // }
                  if(key == "roles"){
                    return null

                  }
                  if (key == "image") {
                    return (
                      <StyledTableCell align="center">
                        {" "}
                        <Avatar src={row[key]} />
                      </StyledTableCell>
                    );
                  } else {
                    return (
                      <StyledTableCell align="center">
                        {row[key]}
                      </StyledTableCell>
                    );
                  }
                })}

                {routes ? (
                  <StyledTableCell align="center">
                    <Link to={routes + "/" + row.id+query}>view</Link>
                  </StyledTableCell>
                ) : null}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
     <Pagination
        sx={{ position: "absolute", right: "0", marginTop: "10px" }}
        count={data.length/10}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
      />
    </TableContainer>
  );
}
MyTables.defaultProps={
  query:""
}