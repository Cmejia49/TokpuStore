import React from 'react';
import {Container,Form,Button, Spinner} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalMsg from '../components/Modal/ModalMsg';
import { getError, getStatus, loginReq } from '../store/auth-slice';
const AuthPage = ()=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [isFailed, setFailed] = React.useState(true);
  const status = useSelector(getStatus);
  const error = useSelector(getError)
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await dispatch(loginReq({Username:user,Password:pass}))
      navigate("/product",{replace:true});
    
}

 const handleClick = () => {
  setFailed(false)
 }
    return(
      
        <Container className="d-flex flex-column  min-vh-100 justify-content-center align-items-center">
          <div className=' shadow p-5 mx-5 bg-white rounded'>
              <h5 className='text-center pb-3'>Admin Login</h5>
        <Form className='mx-xl-5'  onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
            onChange={e=>setUser(e.target.value)}
            className='text-center'
             type="text" 
             placeholder="Username" />
         </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control 
            onChange={e=>setPass(e.target.value)}
            className='text-center'
             type="password" placeholder="Password" />
        </Form.Group>
        <div  className="pt-5 col-md-12 text-center" >
          {status.loginStatus === "loading" ? (
          <>               
          <Spinner
      as="span"
      animation="border"
      size="xl"
      role="status"
      aria-hidden="true"
    /></>):(
        <Button variant="dark" className='px-5' type='submit'>
            Sign in
        </Button>
          )}
        </div>
        </Form>
          
 
          </div>
         <ModalMsg
            show={error=== "ERR_BAD_REQUEST" ? isFailed : false}
            title={"Failed"}
            message={"Enter valid credential"}
            children={ <Button onClick={()=>handleClick()} >Ok </Button>}
          />
          <ModalMsg
            show={error === "ERR_NETWORK" ? isFailed : false}
            title={"Failed"}
            message={"Try Again later"}
            children={ <Button onClick={()=>handleClick()} > Ok </Button>}
          />
        </Container>
      
    )
}



export default AuthPage;