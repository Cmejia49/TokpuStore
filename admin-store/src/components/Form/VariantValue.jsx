import React from 'react';
import { InputGroup, Form,Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { formAction } from '../../store/form-slice';
const VariantValue = ({value,index,id})=>{
    const dispatch = useDispatch();
    
    return(
        <InputGroup className='mb-2'>
        <Form.Control 
        value={value}
        onChange={e => {dispatch(formAction.onChangeVariantValue({index:index, id:id, value:e.target.value}))}} 
        type="text" placeholder="variant value" />
        <Button onClick={()=>{dispatch(formAction.removeVariantValue({index:index, id:id}))}}
         variant='outline-dark ' className="px-2">x</Button>
     </InputGroup>
    )
}

export default VariantValue;