import React from 'react';
import MainPagination from '../../../components/Pagination/Pagination';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {retrieveItem , retrieveItemByName, retrieveItemByCat }  from "../../../store/product-slice";
const Footer =()=>{
    const dispatch = useDispatch();
    const header = useSelector((state)=>state.product.header)
    const[currPage, setCurrPage] = React.useState(1)
    return(
        <>
        <MainPagination
      totPages={header.TotalPages}
      currentPage={currPage}
      pageClicked={(ele) => {
          console.log(header);
        setCurrPage(ele);
        if(header.Type === "GETALL"){
            dispatch(retrieveItem(ele));
        }
        if(header.Type === "FILTERBYNAME"){
            dispatch(retrieveItemByName(ele));
        }
        if(header.Type === "FILTERBYCAT"){
            dispatch(retrieveItemByCat(ele));
        }
       
      }}
    >

    </MainPagination>
    <Container fluid className="bg-light  font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
    <div className="row">
        <div>
            <h5 className="text-uppercase">Footer Title</h5>
            <p>Here you can use rows and columns to organize your footer content.</p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0"/>
    </div>
</div>

<div className="footer-copyright text-center py-3">© 2022 Copyright:
    <a href="#asd"> TOPE.COM</a>
</div>
</Container>
        </>
    )
}

export default Footer;