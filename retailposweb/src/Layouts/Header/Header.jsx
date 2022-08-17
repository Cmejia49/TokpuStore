import React from 'react';
import CategoryNavbar from '../../Components/CategoryNavbar/CategoryNavbar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { Navbar} from 'react-bootstrap';
const Header = ()=>{
    return(


     <>
          <Navbar  sticky="top" expand='xl' className="flex-column py-0">
            <CategoryNavbar/>
            <SearchBar/>
          </Navbar>
          
     </>

    )
}


export default Header;