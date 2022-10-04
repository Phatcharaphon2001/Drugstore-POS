import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { DataGrid } from '@mui/x-data-grid';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
      { field: 'productName', headerName: 'Product Name', width: 130 },
      { field: 'catagory', headerName: 'Category Full Path', width: 150 },
      { field: 'sell',headerName: 'Price',type: 'number',width: 70,},
      { field: 'total',headerName: 'Total',type: 'number',width: 70,},
    ];
    
    const rows = [
      {  id: 1, productName: 'Snow', catagory: 'Drug', sell: 100, total: 2},
      {  id: 2, productName: 'Lannister', catagory: 'Drug',  sell: 120,total: 2},
      {  id: 3, productName: 'Gaga', catagory: 'Drug', sell: 128,total: 1 },
 
    ];
    return (
      <Container >
        <h1>Sales</h1>
        <Row className="justify-content-md-center">
        <Col style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        </Col>
        <Card style={{ width: '25em' }} className=''>
          <Card.Body>
        <Col className=''>
        <h2>Code : </h2>
        <input class="form-control" type="text" placeholder="Default input" ></input>
        <h2 className='mt-5'>Total Amount : </h2>
        <h2 className='total-price mb-3 mt-3'>200 </h2>
        <div className='btn-group-1 d-flex justify-content-md-around mb-5 '>
        <Button variant="danger">Cancel</Button>{' '}
        <Button variant="warning">Clear</Button>{' '}
        <Button variant="primary">ADD to cart</Button>{' '}
        </div>
        <button type="button" class="btn btn-success" style={{width: '100%', height: '80px', fontSize: '40px'}}>SUMMARY BILL</button>
        </Col>
        </Card.Body>
        </Card>
      </Row>

      
      
      </Container>
    
    )
  }
}
