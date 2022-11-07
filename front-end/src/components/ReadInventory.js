import React from 'react';
import Button from "react-bootstrap/Button";

const ReadInventory = ({handleEditProductForm,products, }) => {
    return (
        <>
        {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.expire}</td>
              <td>{product.cost}</td>
              <td>{product.sell}</td>
              <td>{product.total}</td>
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