import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Table from 'react-bootstrap/Table';

const Sales = () => {

  const [addProduct, setAddProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const queryData = (e) => {
    e.preventDefault();
  };


  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target[0].value);
     await axios.get(`http://p0nd.ga:27777/inventory/id/${e.target[0].value}`)
    .then((response) => {
      return response.data[0];
    }).then((e)=>{
      setAddProduct(e);
    if (e.length !== 0) {
      document.getElementById("item_data").innerHTML =
        "<p><b>Name</b> : " +
        e.name +
        "<br/>" +
        "<b>Type : </b>" +
        e.type +
        "<br/>" +
        "<b>Amount : </b>" +
        e.amount +
        "<br/>" +
        "<b>Price : </b>" +
        e.price_sell +
        "</p>";
    } else {
      document.getElementById("item_data").innerHTML = "ID NOT FOUND";
    }
    console.log(addProduct);
  })}


 
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(e.target[0].value);
  //   await axios
  //     .get(`http://p0nd.ga:27777/inventory/id/${e.target[0].value}`)
  //     .then((response) => {
  //       if (response.data.length !== 0) {
  //         setAddProduct(response.data[0]);
  //         document.getElementById("item_data").innerHTML =
  //           "<p><b>Name</b> : " +
  //           response.data[0].name +
  //           "<br/>" +
  //           "<b>Type : </b>" +
  //           response.data[0].type +
  //           "<br/>" +
  //           "<b>Amount : </b>" +
  //           response.data[0].amount +
  //           "<br/>" +
  //           "<b>Price : </b>" +
  //           response.data[0].price_sell +
  //           "</p>";
  //       } else {
  //         document.getElementById("item_data").innerHTML = "ID NOT FOUND";
  //       }
  //     });
  //   console.log(addProduct);
  // }

  const addProductToCart = async(addProduct) => {
    //console.log(addProduct);
    let findProductInCart = await cart.find(i=>{
      return i._id === addProduct._id;
    });
  
  if(findProductInCart){
      let newCart = [];
      let newItem;
    
      cart.forEach(cartItem => {
        if(cartItem._id === addProduct._id){
          newItem = {
            ...cartItem,
            amount: cartItem.amount + 1,
            totalAmount: cartItem.price_sell * (cartItem.amount + 1)
          }
          newCart.push(newItem);
        }else{
          newCart.push(cartItem);
        }
      });
     setCart(newCart);
    }else if (addProduct.amount > 0 && addProduct.amount !== undefined) {

      let addingProduct = {
        ...addProduct,
        'amount': 1,
        'totalAmount': addProduct.price_sell,
      }
      setCart([...cart, addingProduct]);
    }else if(addProduct.amount === 0){
      alert("No more items in stock");
    }
  }

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach(cartItem => {
      newTotalAmount += parseInt(cartItem.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  const removeProductFromCart = async(addProduct) => {
    const newCart = cart.filter((cartItem) => cartItem._id !== addProduct._id);
    setCart(newCart);
  }
  console.log(cart);

  const handleCheckout = async() => {
    let newCart = {};
    cart.forEach(cartItem => {
      newCart[cartItem._id] = cartItem.amount;
    });
    axios.post('http://p0nd.ga:27777/sale/submit',{item: newCart})
    .then((response) => {
      console.log(response.data);
      document.getElementById("saleRightMenu").innerHTML = `<img src="${response.data.qr}" style={width: 100%}><br>`
      document.getElementById("saleRightMenu").innerHTML += `<h2 className="fw-bold text-center" align="center">Total</h2><h2 align="center" className="total-price display-1 text-center mb-0" >${totalAmount}฿</h2>`;
      document.getElementById("saleRightMenu").innerHTML += `<Button variant="warning" onClick="window.location.reload(false);">Next</Button>`;
    });
  }
 
  return (
    <Container className="p-3">
      <h1>Sales</h1>
      <Row>
        <Col style={{ height: 400 }}>
          <Table className="table table-responsive">
          <thead>
          <tr>
            <th>#</th>
            <th scope="col">Product Name</th>
            <th scope="col">type</th>
            <th scope="col">amount</th>
            <th scope="col">Price</th> 
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cart ? cart.map((cartProduct, key) => <tr key={key}>
            <td>{key+1}</td>
            <td>{cartProduct.name}</td>
            <td>{cartProduct.type}</td>
            <td>{cartProduct.amount}</td>
            <td>{cartProduct.totalAmount}</td>
            <td>
              <button className="btn btn-danger btn-sm" onClick={() => removeProductFromCart(cartProduct)}>Remove</button>
            </td>
          </tr>): 'No Item in Cart'}
        </tbody>
        </Table>
        </Col>
        <Card style={{ width: "25em" }} className="" id="saleRightMenu">
          <Card.Body>
            <Col className="">
              <Form onSubmit={handleSubmit}>
                <InputGroup size="lg" className="mb-3">
                  <InputGroup.Text onKeyDown={queryData} id="item-code">
                    <b>Item Code</b>
                  </InputGroup.Text>
                  <Form.Control
                    autoFocus
                    type="text"
                    required="required"
                    defaultValue="1"
                    aria-label="Large"
                    aria-describedby="item-code"
                  />
                </InputGroup>
                <Row className="mb-3" id="item_data"></Row>

                <InputGroup size="lg" className="mb-3">
                  <InputGroup.Text id="item-code">
                    <b>Amount</b>
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    min="1"
                    step="1"
                    defaultValue="1"
                    aria-label="Large"
                    aria-describedby="item-code"
                  />
                </InputGroup>
                <div className="btn-group-1 d-flex justify-content-md-around mb-2">
                  <Button variant="danger" size="lg">
                    Cancel
                  </Button>{" "}
                  <Button variant="warning" size="lg">
                    Clear
                  </Button>{" "}
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    onClick={() => addProductToCart(addProduct)}
                  >
                    ADD to cart
                  </Button>{" "}
                </div>
                <hr />
                <h2 className="fw-bold text-center">Total</h2>
                <h2 className="total-price display-1 text-center mb-0" >
                  {totalAmount}฿
                </h2>
                <button
                  class="btn btn-success"
                  style={{ width: "100%", height: "80px", fontSize: "40px" }}
                  onClick={() => handleCheckout()}
                >
                  SUMMARY BILL
                </button>
              </Form>
            </Col>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};
export default Sales;
