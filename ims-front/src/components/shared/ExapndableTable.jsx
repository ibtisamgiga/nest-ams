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
import GroupButton from "./button-group/GroupButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
export default function ExapndableTable({
  data,
  createData,
  tableHeaders,
  routes,
}) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const style = isMatch
    ? { minWidth: 500, width: "100%", display: "block", overflowX: "auto" }
    : { minWidth: 500 };

  let rows = [];
  const [open, setOpen] = React.useState(false);
  data.forEach((element) => {
    rows.push(createData(element));
  });
  console.log(rows[0].arr[0].s, "a");

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
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
                  if (key == "arr") {
                    return;
                  } else {
                    return (
                      <StyledTableCell align="center">
                        {row[key]}
                      </StyledTableCell>
                    );
                  }
                })}
                <StyledTableCell align="center">
                  {/* <Link to={routes+'/'+row.id}>view</Link> */}
                  <GroupButton />
                </StyledTableCell>

                <StyledTableCell align="center">
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>

                 
                </StyledTableCell>
                <StyledTableRow>
               <TableCell
               style={{ paddingBottom: 0, paddingTop: 0 }}
               colSpan={6}
             >
               <Collapse in={open} timeout="auto" unmountOnExit>
                 <Box sx={{ margin: 1 }}>
                   <Table size="small" aria-label="purchases">
                     <TableHead>
                       <TableRow>
                         <TableCell>sub-category</TableCell>
                         <TableCell>vendor</TableCell>
                         <TableCell align="right">Quantity</TableCell>
                       </TableRow>
                     </TableHead>
                     <TableBody>
                       {rows.map((row) => (
                         row.arr.map((data) => (
                         <TableRow key={data.s}>
                           <TableCell component="th" scope="row">
                             {data.s}
                           </TableCell>
                           <TableCell>{data.q}</TableCell>
                           <TableCell align="right">{data.v}</TableCell>
                         </TableRow>
                       ))))}
                     </TableBody>
                   </Table>
                 </Box>
               </Collapse>
             </TableCell>
             </StyledTableRow>

              </StyledTableRow>
             
            ))}
        </TableBody>
      </Table>
      <Pagination
        sx={{ position: "absolute", right: "0", marginTop: "10px" }}
        count={2}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
      />
    </TableContainer>
  );
}

// (
//   <TableCell
//     style={{ paddingBottom: 0, paddingTop: 0 }}
//     colSpan={6}
//   >
//     <Collapse in={open} timeout="auto" unmountOnExit>
//       <Box sx={{ margin: 1 }}>
//         <Table size="small" aria-label="purchases">
//           <TableHead>
//             <TableRow>
//               <TableCell>sub-category</TableCell>
//               <TableCell>vendor</TableCell>
//               <TableCell align="right">Quantity</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {row[key].map((data) => (
//               <TableRow key={data.s}>
//                 <TableCell component="th" scope="row">
//                   {data.s}
//                 </TableCell>
//                 <TableCell>{data.q}</TableCell>
//                 <TableCell align="right">
//                   {data.v}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>
//     </Collapse>
//   </TableCell>
// );
