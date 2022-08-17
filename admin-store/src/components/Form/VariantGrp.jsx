import React from 'react';
import{Button, Form} from 'react-bootstrap';
import VariantValue from './VariantValue';
import { useDispatch,useSelector } from 'react-redux';
import { formAction, getVariantList } from '../../store/form-slice';
import styles from './style.module.css';
const VariantGrp = ({value,index, id})=>{

    const dispatch = useDispatch();
    const variantList = useSelector(getVariantList);

    return(
        <div className='border border-1 mb-3'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
       
            <div className='d-flex justify-content-between'>
                <Form.Label>Variant Name</Form.Label>
                <Button onClick={()=>{dispatch(formAction.removeVariantGrp(id))}} className={styles.customCloseBtn + ' btn-close'}></Button>
            </div>
        <div className='p-2'>
            <Form.Control 
            value={value}
            onChange={e => {dispatch(formAction.onChangeVariantGrp({id:id,value:e.target.value}))}} 
            type="text" placeholder="variant name" />
        </div>
        </Form.Group>
        <Form.Group className="px-3 mb-3" controlId="formBasicEmail">
        <Form.Label>Variant value</Form.Label>
        <div className='border border-2 p-2'>
            {variantList[index].options.map((v, i)=>{
                return <VariantValue value={v.optionName} key={i} index={index} id={v.optionID}/>;
            })}
    
            <Button 
                onClick={()=>{dispatch(formAction.addVariantValue({index:index,id:variantList[index].options.length+1,value:''}))}}
                style={{backgroundColor:"#fff" ,color:"blue", textDecoration:'underline', borderWidth:"0"}}>
                add more value
            </Button>
        </div>

        </Form.Group>
        </div>
    )
}

export default VariantGrp;