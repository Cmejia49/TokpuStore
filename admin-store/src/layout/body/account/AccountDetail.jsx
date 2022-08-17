import React from "react";
import {Form, Button, Dropdown, Spinner} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { getToken, registerAccount, deleteAccounts,
         getStatus,authAction } from "../../../store/auth-slice";
import { getUsername, getPassword, getRole, formAction } from "../../../store/form-slice";
import ModalMsg from "../../../components/Modal/ModalMsg";
const AccountDetail = ({user, id})=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(getUsername);
    const password = useSelector(getPassword);
    const role = useSelector(getRole);
    const token = useSelector(getToken);
    const status = useSelector(getStatus);
    const registerClick = ()=>{
        const text ={
            username: username,
            password: password,
            role:role
        }
        dispatch(registerAccount({token:token,text:text}));
    }

    const deleteClick = ()=>{
    
        dispatch(deleteAccounts({token:token,id:id}))
    }
    const cancelClick = ()=>{
        dispatch(authAction.setStatus("idle"))
        navigate(-1);
    }
    React.useEffect(()=>{
        if(user !== undefined){
            dispatch(formAction.setAccountForm(user))
        }
        return()=>{
            dispatch(formAction.reset())
        }
    },[user,dispatch])
    
    return(
        <>
        <Form autoComplete="off" className='w-50 border border-2'>
            <Form.Group className='p-3'>
                <Form.Label>Username</Form.Label>
                <Form.Control 
                 value={username}
                 placeholder='username'
                 onChange={e =>{dispatch(formAction.onChangeUsername(e.target.value))}}   
                />
            </Form.Group>
            <Form.Group className='p-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                 type="password"
                 className='w-50'
                 onChange={e =>{dispatch(formAction.onChangePassword(e.target.value))}}   
                />
            </Form.Group>
            <Form.Group className='p-3'>
            <Dropdown onSelect={e =>{dispatch(formAction.onChangeRole(e))}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {role === "" ? "Role":role}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
                    <Dropdown.Item eventKey="User">User</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            
            </Form.Group>
 
            {status.deleteStatus === "loading" || status.registerStatus === "loading" ? (
                <div className="d-flex justify-content-center">
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
                </div>
            ):(
                <div className='d-flex justify-content-around'>
                {id === undefined ?(
                    <>
                      <Button onClick={()=>{registerClick()}} variant='dark'>Register</Button>
                    </>
                ):(
                    <>
                    <Button onClick={()=>{deleteClick()}} variant='dark'>Delete</Button>
                    </>
                )}
                    <Button onClick={()=>{cancelClick()}} variant='dark'>Cancel</Button>
                </div>
            )}

                <ModalMsg
                 children={ <Button onClick={()=>{dispatch(authAction.reset());  navigate(-1);}} > Ok </Button>}
              title={"Success"}
              message={status.registerStatus === "succeeded" ? 
                "Register Success":"Delete Success"}
              show={
                    status.registerStatus === "succeeded" || 
                    status.deleteStatus === "succeeded" ? 
                    true:false}
              />  
            <ModalMsg
          children={ <Button onClick={()=>{dispatch(authAction.reset())}} > Ok </Button>}
              title={"failed"}
              message={"failed operation"}
              show={
                    status.registerStatus === "failed" || 
                    status.deleteStatus === "failed" ? 
                    true:false}
              />    
        </Form>
        </>
    )
}

export default AccountDetail;