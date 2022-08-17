
import React from 'react';
import { Nav, Navbar, Offcanvas} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./style.css"
import { useDispatch,useSelector } from 'react-redux';
import {retrieveItemByCat,productAction,retrieveItem} from '../../store/product-slice'
import {retrieveCategories,selectAllCategory,getCategoryStatus}  from '../../store/category-slice'
const CategoryNavbar = ()=>{
  const dispatch = useDispatch();
  const categoryStatus = useSelector(getCategoryStatus);
  const categories = useSelector(selectAllCategory);
  const filter = useSelector((state)=>state.product.filterValue);
  const handlerClick = (name,id)=>{

    if(filter !== name && name === ""){
      dispatch(productAction.setName(name))
      dispatch(retrieveItem(1));
    }
    if(filter !== name && name !== ""){
      dispatch(productAction.setName(name))
      dispatch(retrieveItemByCat({page:1,id:id}))
    }
  }
  React.useEffect(()=>{
    if(categoryStatus === 'idle'){
      dispatch(retrieveCategories())
    }
  },[dispatch])
  return (

      <Navbar  collapseOnSelect  expand='md' className="justify-content-end navbar-dark bg-dark w-100 ">
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              Categories
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='mx-auto py-1'>
         
              <Nav.Link 
                as={Link}
                to={"/"}
                onClick={()=>{handlerClick("")}}
              className='inactive border'>Home</Nav.Link>
              {categories.map(cat =>
              <Nav.Link as={Link} 
              to= {{
                pathname:"/",
                search:`?filter=${cat.categoryName}`
              }} 
              key={cat.catId} className='inactive border' onClick={()=>{handlerClick(cat.categoryName,cat.catId)}}>{cat.categoryName}</Nav.Link>
                )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        </Navbar>


  );
}

export default CategoryNavbar;
