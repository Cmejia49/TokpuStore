import React from 'react'
import SearchForm from '../../../components/Searchbar/SearchForm'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const StoreHeader = () => {
  return (
    <div className='m-5'>
        <div className='d-flex flex-row justify-content-between'>
            <div><h5>Locations</h5></div>
            <div>
            <Button as={Link} to={"/store/addStore/"} variant='dark'>Create Store</Button>
            </div>
        </div>
        <div className='d-flex justify-content-center mt-5'>
            <SearchForm />
        </div>
    </div>
  )
}
export default StoreHeader;