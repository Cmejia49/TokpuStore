import React from 'react'
import { Navbar, InputGroup, FormControl, Button,Row,Col } from 'react-bootstrap';
import { CartFill,Search } from 'react-bootstrap-icons';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalQuantity } from '../../store/cart-slice';
import {retrieveItemByName,productAction} from '../../store/product-slice'
import "./style.css"
const SearchBar = ()=>{
    const [searchParams, setSearchParams] = React.useState("");
    const dispatch = useDispatch();
    const filter = useSelector((state)=>state.product.filterValue);
    const total = useSelector(getTotalQuantity)
    const onChange=(event)=>{
        setSearchParams(event.target.value)     
      }
      const handleSearch=()=>{
        if(filter !== searchParams){
            dispatch(productAction.setName(searchParams))
            dispatch(retrieveItemByName({page:1,name:searchParams}))
        }

    }
    return(
        <>
         <Row  className='border-bottom border-1.5 border-dark w-100'>
            <Navbar  expand='xl' className="navbar-light bg-light py-3">
                <Col className='d-flex justify-content-xl-center'>

                    <InputGroup className='w-50'>
                        <FormControl
                          type="search"
                          onChange={onChange}
                          placeholder="Search"
                          aria-label="Search"
                          className=''
                        />
                        <Button as={Link}    
                        to={"/?filter="+ searchParams}  onClick={()=>{handleSearch()}} variant="outline-dark">
                        <Search/> 
                        </Button>
                    </InputGroup>
                    </Col>
                    <Col xs="1" className='d-flex mx-2'>
                        <Button as={Link} to={"/cart"} variant="outline-dark" className=''>
                            <CartFill/> {/* Icon component from react-bootstrap */}
                            <span>{total}</span>
                        </Button>
                    </Col>
            </Navbar>
         </Row>
        </>
    )
}

export default SearchBar;