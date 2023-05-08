import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GroupButton from "./button-group/GroupButton";
import { Link } from "react-router-dom";

export default function CollapsibleTable({ tableData }) {
  function createData1(id, category, subCategory, vendor, subCat) {
    let subCatogries = [];
    subCat.forEach((element) => {
      const obj = {
        id: element.id,
        subCategoryName: element.name,
        vendorName: element.vendorName,
        quantity: element.quantity,
        qAssigined: element.assigined,
        qUassigined: element.unAssigned,
        qFaulty: element.faulty,
      };
      subCatogries.push(obj);
    });
    return {
      id,
      category,
      subCategory,
      vendor,
      subCatogries,
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow key={row.id} sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="center">{row.id}</TableCell>
          <TableCell align="center">{row.category}</TableCell>
          <TableCell align="center">{row.subCategory}</TableCell>
          <TableCell align="center">{row.vendor}</TableCell>
          <TableCell align="center">
            {/* <Link to={routes+'/'+row.id}>view</Link> */}
            <GroupButton id={row.id} />
          </TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow >
                      <TableCell sx={{ color: "#5184ec" }}>
                        Sub-Category Name
                      </TableCell>
                      <TableCell sx={{ color: "#5184ec" }}>
                        Vendor Name
                      </TableCell>
                      <TableCell sx={{ color: "#5184ec" }} align="center">
                        Quantity
                      </TableCell>
                      <TableCell sx={{ color: "#5184ec" }} align="center">
                        Quantity Assigined
                      </TableCell>

                      <TableCell sx={{ color: "#5184ec" }} align="center">
                        Quantity Unassigined
                      </TableCell>
                      <TableCell sx={{ color: "#5184ec" }} align="center">
                        Quantity Faulty
                      </TableCell>
                      <TableCell sx={{ color: "#5184ec" }} align="center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.subCatogries.map((historyRow) => (
                      <TableRow key={historyRow.id}>
                        <TableCell component="th" scope="row">
                          {historyRow.subCategoryName}
                        </TableCell>
                        <TableCell>{historyRow.vendorName}</TableCell>
                        <TableCell align="center">
                          {historyRow.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {historyRow.qAssigined}
                        </TableCell>
                        <TableCell align="center">
                          {historyRow.qUassigined}
                        </TableCell>
                        <TableCell align="center">
                          {historyRow.qFaulty}
                        </TableCell>
                        <TableCell align="center">
                        <Link to={"/category/detail" + "/" + historyRow.id}>view</Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  //const rows = [createData(1, 3, 4, 6)];
  const rows = [];
  tableData.forEach((data) => {
    rows.push(
      createData1(
        data.id,
        data.name,
        data.numberOfSubcat,
        data.numberOfvendors,
        data.subCat
      )
    );
  });
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ background: "#5184ec", color: "white" }}>
          <TableRow>
            <TableCell />
            <TableCell align="center" sx={{ color: "white" }}>
              ID
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Category Name
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Number of Sub-Category
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Number of Vendors
            </TableCell>
            <TableCell align="center" sx={{ color: "white", width: "0%" }}>
              Action
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
