import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { DataGrid } from '@mui/x-data-grid';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';



export default class Sales extends Component {
  render() {

    const columns = [
      { field: 'id', headerName: 'Item ID',type: 'number', width: 70 },
      { field: 'productName', headerName: 'Product Name', flex: 1 },
      { field: 'catagory', headerName: 'Category Full Path', flex: 1 },
      { field: 'sell',headerName: 'Price',type: 'number',width: 70},
      { field: 'total',headerName: 'Total',type: 'number',width: 70},
    ];
    
    const rows = [
      {  id: 1, productName: 'Snow', catagory: 'Drug', sell: 100, total: 2},
      {  id: 2, productName: 'Lannister', catagory: 'Drug',  sell: 120,total: 2},
      {  id: 3, productName: 'Gaga', catagory: 'Drug', sell: 128,total: 1 },
    ];

    return (
      <Container className="p-3">
        <h1>Sales</h1>
        <Row>
        <Col style={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          
          //checkboxSelection
        />
        </Col>
        <Card style={{ width: '25em' }} className=''>
          <Card.Body>
        <Col className=''>
          <Form>
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="item-code"><b>Item Code</b></InputGroup.Text>
          <Form.Control autoFocus
            type="text" required="required" defaultValue="9999999999"
            aria-label="Large"
            aria-describedby="item-code"
          />
        </InputGroup>
        <Row className="mb-3">
          <Col md="4" xs="6">
            <img src="https://via.placeholder.com/150" className="img-fluid"/>
          </Col> 
          <Col md="8" xs="6">
            <span><b>Lorem ipsum dolor sit amet</b><br/><b>Stock:</b> 30 Pack<br/><b>Price:</b> 20 THB / Pack</span>
          </Col>
        </Row>
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="item-code"><b>Amount</b></InputGroup.Text>
          <Form.Control type="number" min="1" step="1" defaultValue="1"
            aria-label="Large" required="required"
            aria-describedby="item-code"
          />
        </InputGroup>
        <div className='btn-group-1 d-flex justify-content-md-around mb-2'>
        <Button variant="danger" size="lg">Cancel</Button>{' '}
        <Button variant="warning" size="lg">Clear</Button>{' '}
        <Button variant="primary" size="lg" type="submit" >ADD to cart</Button>{' '}
        </div>
        <hr/>
        <h2 className='fw-bold text-center'>Total</h2>
        <h2 className='total-price display-1 text-center mb-0'>568.00</h2>
        <div className='text-center mt-0 fw-italic mb-3'>(ห้าร้อยหกสิบแปดบาทถ้วน)</div>
        <button class="btn btn-success" style={{width: '100%', height: '80px', fontSize: '40px'}}>SUMMARY BILL</button>
        </Form>
        </Col>
        </Card.Body>
        </Card>
      </Row>
      </Container>
    
    )
  }
}
