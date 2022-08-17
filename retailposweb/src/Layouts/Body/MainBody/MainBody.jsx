import React from "react";
import ProductCard from "../../../Components/Card/MainCard/ProductCard";
import {Row, Container, Spinner } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectAllPosts , getPostsStatus } from "../../../store/product-slice";
import { Link } from "react-router-dom";
import mbrok from "../../../Assets/Missing-image.png"
const MainBody =()=>{
  //const products = useSelector((state) => state.product.productList);
  const products = useSelector(selectAllPosts);
  const filter = useSelector((state)=>state.product.filterValue);
    const status = useSelector(getPostsStatus);
    return(
        <Container className="mt-4" id="zero-pad">
            {filter !=="" ?(<h5>Search:{filter}</h5>):( <></> )}
        <Row xs={1} md={4} className="justify-content-center">
            {status.searchStatus === "loading" || 
            status.catStatus === "loading" || 
            status.mainStatus === "loading" 
            ? (<Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>):(
            <>
            {products.map(item => 
                    <ProductCard 
                    range ={item.priceRange}
                    descipt={item.description}
                    imgSrc={item.imageList.length > 0 ? item.imageList[0].imageSrc :mbrok}
                    as={Link}
                    to={`detail/${item.itemId}`}
                    replace ={true} 
                    title={item.itemName}
                    key={item.itemId}
             />
         )}
            </>
            )}
        </Row>
        </Container>
    )
}

export default MainBody;