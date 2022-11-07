import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import ReadInventory from "../components/ReadInventory";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


const Inventory = () => {
  const [products, setProducts] = useState([]);


  //Delete Product
  const handleDelete = (e) => {
    e.preventDefault();
    const newProducts = [...products];
    const formIndex = products.findIndex((product) => product.id === editId);
    newProducts.splice(formIndex, 1);
    setProducts(newProducts);
    handleCloseEdit();
  
  };

  //get data from backend
  const fecthUrl = "http://localhost:3000/product";
  useEffect(() => {
    async function fecthData() {
      const data = await axios.get(fecthUrl);
      setProducts(data.data);
      //console.log(data);
    }
    fecthData();
  }, []);
 

  const [showADD, setShowADD] = useState(false);
  const handleCloseADD = () => setShowADD(false);
  const handleShowADD = () => setShowADD(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [addProduct, setAddProduct] = useState({
    id: 11,
    name: "",
    expire: "",
    cost: "",
    sell: "",
    total: 6,
  });

  //get ID
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: 12,
    name: "",
    expire: "",
    cost: "",
    sell: "",
    total: 6,
  });

//get Form values
  const handleAddProduct = (input) => (e) => {
    e.preventDefault();
    console.log(addProduct);
    setAddProduct({ ...addProduct, [input]: e.target.value });
  };

//add product to table
const handleToTable = (e) => {
  e.preventDefault();
  const newProduct = {
    id: addProduct.id,
    name: addProduct.name,
    expire: addProduct.expire,
    cost: addProduct.cost,
    sell: addProduct.sell,
    total: addProduct.total,
  };
  const newProducts = [...products, newProduct];
  setProducts(newProducts);
}

  //Edit Data values
  const handleEditProduct = (input) => (e) => {
    e.preventDefault();
    console.log(editFormData);
    setEditFormData({ ...editFormData, [input]: e.target.value });
  };

  //edit modal data
  const handleEditProductForm = (e, product) => {
    e.preventDefault();
    setEditId(product.id);
    const  formVlues = {
      id: product.id,
      name: product.name,
      expire: product.expire,
      cost: product.cost,
      sell: product.sell,
      total: product.total,
    }
    setEditFormData(formVlues);
    handleShowEdit();
  };

  //save form data
  const handleFormSave = (e) => {
    e.preventDefault();
    const saveProduct = {
      id: editId,
      name: editFormData.name,
      expire: editFormData.expire,
      cost: editFormData.cost,
      sell: editFormData.sell,
      total: editFormData.total,
    }
    const newProducts = [...products];
    const formIndex = products.findIndex((product) => product.id === editId);
    newProducts[formIndex] = saveProduct;
    setProducts(newProducts);
    setEditId(null);
  };

  //Search Filter Data
  const [searchQuery, setSearchQuery] = useState("");
  function search() {
    return products.filter(row => row.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1);
  };

  return (
    <>
      <Container className="mt-3">
        <Row className="justify-content-md-end">
          <Col md="auto">
            <Button variant="primary" onClick={handleShowADD}>
               ADD Product +
            </Button>
          </Col>
        </Row>
      </Container>


        <Form className="row g-3 ms-auto">
          <div className="col-auto">
            <Form.Control
              type="text"
              className="form-control ms-auto"
              placeholder="search product name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Expire</th>
            <th scope="col">Cost Price</th>
            <th scope="col">Sell Price</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <ReadInventory
          products={search(products)}
          handleEditProductForm={handleEditProductForm}
          /> 
        </tbody>
      </Table>

      {/*Add Modal */}
      <Modal className="modal-add" show={showADD} onHide={handleCloseADD}>
        <Modal.Header>
          <Modal.Title>ADD Product</Modal.Title>
        <Button
          type="button"
          className="btn-close"
          onClick={handleCloseADD}
        ></Button>
        </Modal.Header>
        <div className="modal-body">
          <Form onSubmit={handleToTable}>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Product ID</Form.Label>
              <input
                type="text"
                className="form-control"
                name="id"
                required
                onChange={handleAddProduct("id")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Product Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                name="name"
                placeholder="title"
                required
                onChange={handleAddProduct("name")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Expire</Form.Label>
              <Form.Control
                type="date"
                className="form-control"
                name="expire"
                required
                onChange={handleAddProduct("expire")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Cost Price</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="cost"
                required
                onChange={handleAddProduct("cost")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Sell Price</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="sell"
                required
                onChange={handleAddProduct("sell")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Total</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="total"
                required
                onChange={handleAddProduct("total")}
              />
            </Form.Group>
            <Modal.Footer> 
              <Button variant="secondary" onClick={handleCloseADD}>
                Close
              </Button>
              <Button variant="success" type="submit">
                ADD
              </Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal>

      {/*Edit Modal */}
      <Modal className="modal-add" show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header>
          <Modal.Title>Edit Product</Modal.Title>
        <Button
          type="button"
          className="btn-close"
          onClick={handleCloseEdit}
        ></Button>
        </Modal.Header>
        <div className="modal-body">
          <Form onSubmit={handleFormSave}>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Product ID</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                name="id"
                required
                value={editFormData.id}
                disabled
                onChange={handleEditProduct("id")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Product Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                required
                value={editFormData.name}
                onChange={handleEditProduct("name")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Expire</Form.Label>
              <Form.Control
                type="date"
                className="form-control"
                name="expire"
                required
                value={editFormData.expire}
                onChange={handleEditProduct("expire")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Cost Price</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="cost"
                required
                value={editFormData.cost}
                onChange={handleEditProduct("cost")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Sell Price</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="sell"
                required
                value={editFormData.sell}
                onChange={handleEditProduct("sell")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Total</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="total"
                required
                value={editFormData.total}
                onChange={handleEditProduct("total")}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="danger" onClick={handleDelete} type="submit">
                Delete Product
              </Button>
              <Button variant="success" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default Inventory;
