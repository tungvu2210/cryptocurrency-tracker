import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Tên" },
  {
    id: "current_price",
    label: "Giá hiện tại",
    align: "center",
  },
  {
    id: "price_change_percentage_24h",
    label: "Biến động 24h qua",
    align: "center",
  },
  {
    id: "market_cap",
    label: "Vốn hóa thị trường",
    align: "center",
  },
  {
    id: "option",
    label: "Lựa chọn",
    align: "center",
  },
];

export default function StickyHeadTable({ rows, searchTerm }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  rows = rows.filter((row) =>
    searchTerm === ""
      ? true
      : row.name.toLowerCase().indexOf(searchTerm) !== -1 ||
        row.symbol.toLowerCase().indexOf(searchTerm) !== -1
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        mt: 2,
      }}
    >
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    backgroundColor: "#ffcf00",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const change24h = row.price_change_percentage_24h;
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        gap: 15,
                      }}
                    >
                      <img src={row?.image} alt={row.name} height="50" />
                      <div>
                        <p
                          style={{
                            textTransform: "uppercase",
                            fontSize: 22,
                          }}
                        >
                          {row.symbol}
                        </p>
                        <p style={{ color: "darkgrey" }}>{row.name}</p>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {`${row.current_price.toLocaleString()} VNĐ`}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: change24h > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {change24h > 0
                        ? `+${change24h.toFixed(2).toLocaleString()} %`
                        : `${change24h.toFixed(2).toLocaleString()} %`}
                    </TableCell>
                    <TableCell align="center">{`${row.market_cap.toLocaleString()} VNĐ`}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        onClick={() => navigate(`detail/${row.id}`)}
                      >
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
