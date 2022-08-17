import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ProductDetail } from '../../layout/body/product/ProductDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getItem,singleProduct,getPostsStatus } from '../../store/product-slice';
const ProductDetailPage = () =>{
    const dispatch = useDispatch();
    const product = useSelector(singleProduct);
    const status = useSelector(getPostsStatus);
    const { id } = useParams();
    React.useEffect(()=>{
        if(status.getStatus === 'idle'){
            dispatch(getItem(id))
        }
       
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch,id])
    return(
        <Container>
            <div  className='d-flex justify-content-center mt-5 mb-5'>
                {status.getStatus ==='succeded' ?
                (<ProductDetail data={product}/>):(<>
                    loading
                </>)}
            </div>
        </Container>
    )
}

export default ProductDetailPage;