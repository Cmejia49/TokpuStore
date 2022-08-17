import React from 'react';
import {Form,InputGroup, Button } from 'react-bootstrap';
import styles from './searchBar.module.css';
import "./style.css"


const SearchForm = ({searchClick, onChange, path})=>{
    return(
        <>

            <InputGroup className='w-50'>
            <Form.Control
                         type="search"
                         placeholder="Search"
                         aria-label="Search"
                         onChange={onChange}
                       />
                <Button onClick={()=>searchClick()} className={styles.customBtn }  variant='outline-dark'>Search</Button>
            </InputGroup>
       </>
   )
    
}

export default SearchForm;