import React from 'react'

import {Form, Button, Spinner} from 'react-bootstrap' 
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getToken } from '../../../store/auth-slice';
import { getStoreName, getUserFid, formAction } from '../../../store/form-slice';
import {putStore,createStore, getStoreStatus, deleteStores, storeAction } from '../../../store/store-slice';
import ModalMsg from '../../../components/Modal/ModalMsg';
import {  useNavigate } from 'react-router-dom';
const StoreDetail = ({data,id}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userFid = useSelector(getUserFid);
    const storeName = useSelector(getStoreName);
    const token = useSelector(getToken);
    const status = useSelector(getStoreStatus);
    const updateClick = ()=>{
        const text={
            StoreName:storeName,
            UserFid:userFid
        };
  
        dispatch(putStore({token:token,id:id,text:text}));
        
    }
    const createClick =()=>{
        const text={
            StoreName:storeName,         
        }
        console.log(id);
      dispatch(createStore({token:token,text:text}))  

    }

    const deleteClick =()=>{
        dispatch(deleteStores({token:token, id:id}))
    }
    const cancelClick = ()=>{
        navigate(-1);
    }
    React.useEffect(()=>{
        console.log(data)
        if(data !== undefined){
            dispatch(formAction.setStoreForm(data))
        }
        return()=>{
            dispatch(formAction.reset())
        }
    },[data,dispatch])
  return (
    
    <Form className='w-50 border border-2'>
       
            <Form.Group className='p-3'>
                <Form.Label>StoreName</Form.Label>
                <Form.Control 
                 value={storeName}
                 placeholder='storeName'
                 onChange={e =>{dispatch(formAction.onChangeStoreName(e.target.value))}}
                />
            </Form.Group>
            <Form.Group className='p-3'>
                <Form.Label>Seller</Form.Label>
                <Form.Control 
                 value={userFid}
                 type="number"
                 className='w-50'
                 onChange={e =>{dispatch(formAction.onChangeUseFid(e.target.value))}}
                />
            </Form.Group>

                {status.createStatus === "loading" || status.updateStatus === "loading" || status.deleteStatus === "loading" ?
                (<div className="d-flex justify-content-center">
                <Button variant="dark" disabled>
                    <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                    Loading...
                </Button>
                </div>):(
                    <div className='d-flex justify-content-around'>
                        {id === undefined ?(
                            <>
                                <Button onClick={()=>{createClick()}} variant='dark'>Create</Button>
                            </>
                        ):(
                            <>
                                <Button  onClick={()=>{updateClick()}} variant='dark'>Update</Button>
                                <Button  onClick={()=>{deleteClick()}} variant='dark'>Delete</Button>
                            </>
                        )}
                             <Button onClick={()=>{cancelClick()}} variant='dark'>Cancel</Button>
                    </div>
                )}
            <ModalMsg
            children={ <Button onClick={()=>{dispatch(storeAction.reset());  navigate(-1);}} > Ok </Button>}
              title={"Success"}
              message={"Operation Succes"}
              show={
                    status.createStatus === "succeeded" || 
                    status.updateStatus === "succeeded" || 
                    status.deleteStatus === "succeeded" ? 
                    true:false}
              />
                         <ModalMsg
              children={ <Button onClick={()=>{dispatch(storeAction.reset())}} > Ok </Button>}
              title={"Failed"}
              message={"Operation Failed"}
              show={
                    status.createStatus === "failed" || 
                    status.updateStatus === "failed" || 
                    status.deleteStatus === "failed" ? 
                    true:false}
              />
        </Form>
  )
}


export default StoreDetail;