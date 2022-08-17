import React from 'react';
import { Nav, Navbar, Offcanvas} from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import {retrieveItemByCat,productAction,retrieveItem} from '../../store/product-slice'
import {retrieveCategories,selectAllCategory,getCategoryStatus}  from '../../store/category-slice'
import { Link } from 'react-router-dom';
import styles from './catBar.module.css'
const CatBar = ()=>{
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
  },[categoryStatus,dispatch])
    return(
        <div className={styles.customCatBar + ' w-100'}>
        <Navbar className={styles.customNavbar + ' justify-content-end'}  collapseOnSelect  expand='md' >
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
            <Nav className='mx-auto'>
              <Nav.Link as={Link} to={"/product"} 
                 onClick={()=>{handlerClick("")}}
              className='text-dark'>Home</Nav.Link>
              {categories.map(cat =>
              <Nav.Link as={Link} 
              to= {{
                pathname:"/product",
                search:`?filter=${cat.categoryName}`
              }} 
              key={cat.catId} className='text-dark' onClick={()=>{handlerClick(cat.categoryName,cat.catId)}}>{cat.categoryName}</Nav.Link>
                )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        </Navbar>

        </div>

    );
}

export default CatBar;