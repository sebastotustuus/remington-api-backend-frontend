/* eslint-disable no-unused-vars */
import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicModal from "./Modal";

function createData(name, stock) {
  return { name, stock };
}

const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 237),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
];

export default function ProductsTable() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("CREATE");
  const [products, setProducts] = useState([]);
  const [loadProduct, setLoadProduct] = useState({});

  useEffect(() => {
    fetchData()
  }, []);

  const handleOpenModal = (product) => {
    setOpenModal(true);
    setModalType("EDIT");
    setLoadProduct(product);
  };

  const resetStateTable = () => {
    setOpenModal(false);
    setModalType("CREATE");
    setLoadProduct({});
  };

  const fetchData = () => {
    axios.get("http://localhost:8000/api/v1/products").then((response) => {
      setProducts(response.data);
    });
  };

  return (
    <>
      <BasicModal
        openModal={openModal}
        resetStateTable={() => resetStateTable()}
        modalType={modalType}
        loadProduct={loadProduct}
        fetchData={() => fetchData()}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre del Producto</TableCell>
              <TableCell align="right">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                className="table-cell"
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleOpenModal(row)}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
