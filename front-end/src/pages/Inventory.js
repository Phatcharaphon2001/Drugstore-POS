import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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


  useEffect(() => {
    async function getProducts() {
      let data = await axios.get("http://localhost:27777/inventory/")
      .then((e)=>{return e.data})
      setProducts(data);
    }
    getProducts();
  }, []);

  //Delete Product
  const handleDelete = (e) => {
    e.preventDefault();
    const newProducts = [...addProduct];
    const formIndex = products.findIndex((product) => product.id === editId);
    newProducts.splice(formIndex, 1);
    setProducts(newProducts);
    handleCloseEdit();
  
  };

  const [addProduct, setAddProduct] = useState({
    _id: "22",
    name: "",
    type: "",
    unit: "",
    exp: "",
    amount: 20,
    price_origin: 0,
    price_sell: 0,
  });
  const navigate = useNavigate();
  const params = useParams();

  //get data from backend
  async function onSubmit(e) {
    e.preventDefault();

    const newProducts = {...addProduct};
    console.log(newProducts);
    const req = await axios.post("http://p0nd.ga:27777/inventory/add", newProducts);
    console.log(req.data);
    if (req.data) {
      setAddProduct ({ _id: "", name: "", type: "", unit: "", exp: "", amount: 0, price_origin: 0, price_sell: 0});
      navigate("/inventory");
      let data = await axios.get("http://localhost:27777/inventory/")
      .then((e)=>{return e.data})
      setProducts(data);
    }
  }

  

  //update form
  function updateProducts(value) {
    return setAddProduct((prev) => {
      return {...prev, ...value};
    });
}




  const [showADD, setShowADD] = useState(false);
  const handleCloseADD = () => setShowADD(false);
  const handleShowADD = () => setShowADD(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);


 



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
            <th scope="col">type</th>
            <th scope="col">Unit</th>
            <th scope="col">exp</th>
            <th scope="col">amount</th>
            <th scope="col">Cost Price</th> 
            <th scope="col">Sell Price</th> 
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

          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Product ID</Form.Label>
              <input
                type="text"
                className="form-control"
                id="_id"
                value={addProduct._id}
                onChange={(e)=> updateProducts({_id: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Product Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Product Name"
                value={addProduct.name}
                
                onChange={(e)=> updateProducts({name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">type</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                name="type"
                value={addProduct.type}
                
                onChange={(e)=> updateProducts({type: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">unit</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                name="unit"
                value={addProduct.unit}
                
                onChange={(e)=> updateProducts({unit: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">exp</Form.Label>
              <Form.Control
                type="date"
                className="form-control"
                name="exp"
                value={addProduct.exp}
                
                onChange={(e)=> updateProducts({exp: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">amount</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="amount"
                value={addProduct.amount}
                
                onChange={(e)=> updateProducts({amount: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">price_origin</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="price_origin"
                value={addProduct.price_origin}
                
                onChange={(e)=> updateProducts({price_origin: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">price_sell</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="price_sell"
                value={addProduct.price_sell}
                
                onChange={(e)=> updateProducts({price_sell: e.target.value})}
              />
            </Form.Group>
            <Modal.Footer> 
              <Button variant="secondary" onClick={handleCloseADD}>
                Close
              </Button>
              <Button variant="success" type="submit" onClick={handleCloseADD} >
                ADD
              </Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal>

      {/*Edit Modal */}
      <Modal className="modal-add" show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header>
          <Modal.Title >Edit Product </Modal.Title>
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
                value={editFormData._id}
                disabled
                onChange={handleEditProduct("_id")}
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
              <Form.Label className="form-label">type</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                name="type"
                required
                value={editFormData.type}
                onChange={handleEditProduct("type")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">unit</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                name="unit"
                value={editFormData.unit}
                
                onChange={(e)=> updateProducts({unit: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">exp</Form.Label>
              <Form.Control
                type="date"
                className="form-control"
                name="exp"
                value={editFormData.exp}
                
                onChange={(e)=> updateProducts({exp: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">amount</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="amount"
                value={editFormData.amount}
                
                onChange={(e)=> updateProducts({amount: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">price_origin</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="price_origin"
                value={editFormData.price_origin}
                
                onChange={(e)=> updateProducts({price_origin: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">price_sell</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                name="price_sell"
                value={editFormData.price_sell}
                
                onChange={(e)=> updateProducts({price_sell: e.target.value})}
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
