import React from 'react';
import { Table, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {formAction,getStockList } from '../../store/form-slice';
const TableForm = ({itemName,singleStore}) =>{
  const dispatch = useDispatch();
  const stock = useSelector(getStockList);


    return(
<Table striped bordered hover>
  <thead>
    <tr>
      <th></th>
      <th>Stock</th>
      <th>Price</th>
      <th>Cost</th>
    </tr>
  </thead>
  <tbody>   
   
        {stock.filter(p => p.storeFid === singleStore.storeId).map((filtered,index)=>
        <tr key={index}>
            <td>
                {filtered.stockIndex}    
            </td>
            <td>
              <Form.Control value={filtered.quantity} onChange={e =>{dispatch(formAction.onChangeQuantity({id:filtered.stockId, value:e.target.value}))}} className="w-50" type="number" placeholder="0" />
            </td>
            <td>
              <Form.Control value={filtered.price} onChange={e =>{dispatch(formAction.onChangePrice({id:filtered.stockId, value:e.target.value}))}} className="w-50" type="text" placeholder="0" />
            </td>
            <td>
              <Form.Control value={filtered.itemCode}  onChange={e =>{dispatch(formAction.onChangeCost({id:filtered.stockId, value:e.target.value}))}}  className="w-50" type="text" placeholder="0" />
            </td>
          </tr>
          )}
          
      
  </tbody>
</Table>
    )
}

export default TableForm;