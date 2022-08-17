import React from 'react';
import styles from './style.module.css';
import CatBar from '../../../components/Catbar/CatBar';
import SearchForm from '../../../components/Searchbar/SearchForm';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { retrieveItemByName,productAction } from '../../../store/product-slice';
const ProductHeader =()=>{
    const dispatch = useDispatch();
    return(
        <div>
         <CatBar/>
         <div className='mt-5 d-flex justify-content-center'>
            <SearchForm
            onChange={e =>{dispatch(productAction.setName(e.target.value))}}
            searchClick={()=>{dispatch(retrieveItemByName(1))}}
            />
          <Button as={Link} to={"/product/addProduct/"} variant='outline-dark' className={styles.custonAddBtn + " mx-3"}>Add New </Button>
         </div>
  
        </div>
    )
}

export default ProductHeader;