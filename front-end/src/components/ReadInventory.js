import React from 'react';
import Button from "react-bootstrap/Button";

const ReadInventory = ({handleEditProductForm,products, }) => {
    return (
        <>
        {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>{product.unit}</td>
              <td>{product.exp}</td>
              <td>{product.amount}</td>
              <td>{product.price_origin}</td>
              <td>{product.price_sell}</td>
              <td>
                <Button variant="warning" onClick={(e) => handleEditProductForm(e, product)} >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
            
        </>
    )
}
export default ReadInventory;