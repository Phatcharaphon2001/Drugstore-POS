import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'action', headerName: 'Action', width: 70 },
    { field: 'id', headerName: 'Item ID',type: 'number', width: 70 },
    { field: 'productName', headerName: 'Product Name', width: 130 },
    { field: 'catagory', headerName: 'Category Full Path', width: 150 },
    { field: 'cost',headerName: 'Cost Price',type: 'number',width: 100,},
    { field: 'sell',headerName: 'Selling Price',type: 'number',width: 100,},
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  
  const rows = [
    { action: 'edit', id: 1, productName: 'Snow', catagory: 'Drug', cost: 35, sell: 100},
    { action: 'edit', id: 2, productName: 'Lannister', catagory: 'Drug', cost: 42, sell: 120 },
    { action: 'edit', id: 3, productName: 'Gaga', catagory: 'Drug', cost: 45, sell: 128 },
    { action: 'edit', id: 4, productName: 'Stark', catagory: 'Drug', cost: 16, sell: 156},
    { action: 'edit', id: 5, productName: 'Targaryen', catagory: 'Vitamin', cost: null, sell: 189 },
    { action: 'edit', id: 6, productName: 'Melisandre', catagory: null, cost: 150, sell: 200 },
    { action: 'edit', id: 7, productName: 'Clifford', catagory: 'Drug', cost: 44, sell: 85 },
    { action: 'edit', id: 8, productName: 'Frances', catagory: 'Vitamin', cost: 36, sell: 74},
    { action: 'edit', id: 9, productName: 'Roxie', catagory: 'Drug', cost: 65, sell: 10 },
  ];
  
  export default function DataTable() {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    );
    
  }

  