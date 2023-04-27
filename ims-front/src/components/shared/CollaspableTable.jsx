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

export default function CollapsibleTable({ tableData }) {
  const dummyData = [
    {
      id: 1,
      category: 1,
      subCategory: 2,
      vendor: 8,
      subCat: [
        {
          id: 3,
          subCategoryName: "laptop",
          vendorName: "Game Over",
          quantity: 3,
          qAssigined: 12,
          qUassigined: 2,
          qFaulty: 4,
        },
        {
          id: 5,
          subCategoryName: "mouse",
          vendorName: "ikea",
          quantity: 3,
          qAssigined: 12,
          qUassigined: 2,
          qFaulty: 4,
        },
      ],
    },

    {
      id: 2,
      category: 5,
      subCategory: 2,
      vendor: 8,
      subCat: [
        {
          id: 3,
          subCategoryName: "chair",
          vendorName: "Game Over",
          quantity: 3,
          qAssigined: 12,
          qUassigined: 2,
          qFaulty: 4,
        },
        {
          id: 5,
          subCategoryName: "table",
          vendorName: "ikea",
          quantity: 3,
          qAssigined: 12,
          qUassigined: 2,
          qFaulty: 4,
        },
      ],
    },
  ];

  function createData1(id, category, subCategory, vendor, subCat) {
    let subCatogries = [];
    subCat.forEach((element) => {
      const obj = {
        id: element.id,
        subCategoryName: element.subCategoryName,
        vendorName: element.vendorName,
        quantity: element.quantity,
        qAssigined: element.qAssigined,
        qUassigined: element.qUassigined,
        qFaulty: element.qFaulty,
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
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.id}</TableCell>
          <TableCell align="right">{row.category}</TableCell>
          <TableCell align="right">{row.subCategory}</TableCell>
          <TableCell align="right">{row.vendor}</TableCell>
          <TableCell align="right">
            {/* <Link to={routes+'/'+row.id}>view</Link> */}
            <GroupButton />
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
                    <TableRow>
                      <TableCell sx={{ color: "#5184ec" }}>
                        Sub-Category Name
                      </TableCell>
                      <TableCell sx={{ color: "#5184ec" }}>
                        Vendor Name
                      </TableCell>
                      <TableCell sx={{ color: "#5184ec" }} align="right">
                        Quantity
                      </TableCell>
                      <TableCell sx={{ color: "#5184ec" }} align="right">
                        Quantity Assigined
                      </TableCell>

                      <TableCell sx={{ color: "#5184ec" }} align="right">
                        Quantity Unassigined
                      </TableCell>
                      <TableCell sx={{ color: "#5184ec" }} align="right">
                        Quantity Faulty
                      </TableCell>
                      <TableCell sx={{ color: "#5184ec" }} align="right">
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
                        <TableCell align="right">
                          {historyRow.quantity}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.qAssigined}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.qUassigined}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.qFaulty}
                        </TableCell>
                        <TableCell align="right">{historyRow.id}</TableCell>
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
        data.category,
        data.subCategory,
        data.vendor,
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
            <TableCell align="right" sx={{ color: "white" }}>
              ID
            </TableCell>
            <TableCell align="right" sx={{ color: "white" }}>
              Number of Category
            </TableCell>
            <TableCell align="right" sx={{ color: "white" }}>
              Number of Sub-Category
            </TableCell>
            <TableCell align="right" sx={{ color: "white" }}>
              Number of Vendor
            </TableCell>
            <TableCell align="right" sx={{ color: "white", width: "0%" }}>
              Action
            </TableCell>
            <TableCell align="right" sx={{ color: "white" }}></TableCell>
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
