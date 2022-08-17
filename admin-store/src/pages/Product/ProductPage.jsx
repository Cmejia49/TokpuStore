import React from "react";
import ProductHeader from "../../layout/header/product/ProductHeader";
import ProductBody from "../../layout/body/product/ProductBody";
import Footer from "../../layout/footer/product/Footer";
import { retrieveItem, getPostsStatus } from "../../store/product-slice"
import {retrieveStore, getStoreStatus} from '../../store/store-slice'
import { getToken } from "../../store/auth-slice";
import { useDispatch, useSelector } from 'react-redux';
const ProductPage = ()=>{
    const dispatch =useDispatch();
    const productStatus = useSelector(getPostsStatus);
    const storeStatus = useSelector(getStoreStatus);
    const token = useSelector(getToken);
    React.useEffect(()=>{
        if(productStatus.getAllStatus === 'idle'){
            dispatch(retrieveItem(1))
        }
        if(storeStatus.getAllStatus === 'idle'){
            dispatch(retrieveStore(token));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div className="w-100">
            <div>
                <ProductHeader/>
            </div>
            <div>
                {productStatus.getAllStatus === 'succeded' ?(
                      <ProductBody/>
                ):(<>Loading</>)}
            </div>
            <div>
                <Footer/>
            </div>
        </div>

    )
}

export default ProductPage;