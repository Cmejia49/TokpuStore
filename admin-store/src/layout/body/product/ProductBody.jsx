import React from 'react';
import {Container,Row} from 'react-bootstrap'
import CustomCard from '../../../components/Card/CustomCard'
import {useSelector } from 'react-redux';
import { selectAllProduct,getFilterValue } from "../../../store/product-slice"
import { Link } from 'react-router-dom';
const ProductBody = ()=>{
    const products = useSelector(selectAllProduct);
    const filter = useSelector(getFilterValue);
    return(
        <Container className='d-flex flex-column'>
             {filter !=="" ?(<h5>Seach:{filter}</h5>):( <></> )}
            
        <Row className='justify-content-center'>
        {products.map((item,index) => 
                       <CustomCard 
                       height={"256px"}
                    as={Link}
                    to={`/product/${item.itemId}`}
                    src={item.imageList.length > 0 ? item.imageList[0].imageSrc : ""}
                    replace ={true} 
                    title={item.itemName}
                    key={item.itemId}
                    />
                
             
         )}
        
        </Row>
        </Container>
    )
}


export default ProductBody;