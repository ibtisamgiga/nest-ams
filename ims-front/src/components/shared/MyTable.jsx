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
import CircleIcon from "@mui/icons-material/Circle";
import { colorEnum, status } from "../../utils/enums/statusEnum";
import useScreenSize from "../../utils/checkScreenSize";
import {
  tableStyle,
  tableStyleMd,
} from "../../constants/table-constants/tableConstants";
export default function MyTables({
  data,
  noPagination,
  tableHeaders,
  routes,
  query,
}) {
  const isMatch = useScreenSize();
  const style = isMatch ? tableStyleMd : tableStyle;
  // createData,
  let rows = [];
  const createData = (Data) => {
    return { ...Data };
  };
  data?.forEach((element) => {
    rows?.push(createData(element));
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
            {headers?.map((title) => {
              return (
                <StyledTableCell key={title} align="center">
                  {title}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.slice(
              (page - 1) * rowsPerPage,
              (page - 1) * rowsPerPage + rowsPerPage
            )
            .map((row) => (
              // {rows.map((row) => (
              <StyledTableRow key={row.id}>
                {keys?.map((key) => {
                  if (key == "roles") {
                    return null;
                  }
                  if (key == "status") {
                    return (
                      <StyledTableCell align="center">
                        <span>
                          <CircleIcon
                            sx={{
                              marginRight:1,
                              fontSize: 12,
                              color:
                                row[key] == status.REJECTED
                                  ? colorEnum.Reject
                                  : row[key] == status.APPROVED
                                  ? colorEnum.approve
                                  : row[key] == status.RESOLVED
                                  ? colorEnum.resolved
                                  : colorEnum.default,
                            }}
                          />
                          {row[key]}
                        </span>
                      </StyledTableCell>
                    );
                  }
                  if (key == "image") {
                    return (
                      <StyledTableCell
                        sx={{ textAlign: "-webkit-center" }}
                        textAligin="-webkit-center"
                      >
                        <Avatar
                          src={row[key]}
                          variant="square"
                          sx={{
                            height: 40,
                            width: 40,
                            textAligin: "-webkit-center",
                          }}
                        />
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

                {routes ?  (
                  <StyledTableCell align="center">
                    <Link style={{ textDecoration: 'none' }} to={routes + "/" + row.id + query}>view</Link>
                  </StyledTableCell>
                ) : null}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {noPagination ? null : (
        <Pagination
          sx={{ position: "absolute", right: "0", marginTop: "10px" }}
          count={data.length / 10}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
      )}
    </TableContainer>
  );
}
MyTables.defaultProps = {
  query: "",
  noPagination: false,
};
