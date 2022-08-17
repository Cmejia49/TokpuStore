import React from 'react';
import MainPagination from '../../Components/Pagination/Pagination';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {retrieveItem,retrieveItemByName,retrieveItemByCat } from  '../../store/product-slice';

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
    <Container fluid className="bg-dark  font-small pt-2">
    <div className="d-flex justify-content-center">
        <div>
            <h5 style={{color:'#fff'}} className="text-center text-uppercase">Tokpu Store</h5>
            <p style={{color:'#fff'}} > Pricelist Page for Tokpu Store</p>
            <p className='text-center'><a href="https://www.facebook.com/people/Tokpu-Store/100084319177964/">Tokpu Store</a></p>
        </div>
    </div>


<div style={{color:'#fff'}}  className="footer-copyright text-center py-3">© 2022 Copyright:

</div>
</Container>
        </>
    )
}

export default Footer;