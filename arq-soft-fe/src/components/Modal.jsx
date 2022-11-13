/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ProductButton from "./Button";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  paddingBottom: "0.8rem",
};

export default function BasicModal({
  openModal,
  resetStateTable,
  modalType,
  loadProduct,
  fetchData,
}) {
  const [open, setOpen] = useState(() => openModal ?? false);
  const [modalState, setModalState] = useState(modalType);
  const [form, setForm] = useState({
    name: "",
    stock: 0,
  });

  useEffect(() => {
    if (openModal && modalType) {
      setOpen(true);
      setModalState(modalType);
    }
  }, [openModal, modalType]);

  useEffect(() => {
    if (modalType === "EDIT") {
      setForm(loadProduct);
    }
  }, [loadProduct, modalType]);

  const handleOpen = () => {
    setOpen(true);
    setModalState("CREATE");
  };
  const handleClose = () => {
    resetStateTable();
    setOpen(false);
    setForm({
      name: "",
      stock: 0,
    });
  };

  const handleProduct = async () => {
    if (modalType === "EDIT") {
      await axios.patch(
        `http://localhost:8000/api/v1/products/${form.id}`,
        form
      );
    } else {
      await axios.post(`http://localhost:8000/api/v1/products/`, form);
    }
    fetchData();
    handleClose();
  };

  const handleDeleteProduct = async () => {
    await axios.delete(`http://localhost:8000/api/v1/products/${form.id}`);
    fetchData();
    handleClose();
  };
  

  const handleOnChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <ProductButton label="Crear Producto" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Crear Producto
          </Typography>
          <div className="inputs-container">
            <TextField
              id="standard-basic"
              label="Nombre Producto"
              variant="standard"
              name="name"
              value={form.name}
              onChange={handleOnChangeForm}
            />
            <TextField
              id="standard-basic"
              label="Stock Disponible"
              variant="standard"
              name="stock"
              value={form.stock}
              onChange={handleOnChangeForm}
            />
          </div>
          <div className="container-form-buttons">
            <ProductButton
              label={
                modalState === "CREATE" ? "Crear Producto" : "Editar Producto"
              }
              onClick={handleProduct}
            />
            {modalState === "EDIT" && (
              <ProductButton
                label="Eliminar Producto"
                onClick={handleDeleteProduct}
                color="error"
              />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
