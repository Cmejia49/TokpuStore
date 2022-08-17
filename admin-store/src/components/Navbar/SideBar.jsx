import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/auth-slice';
const SideBar = () => {
    const dispatch = useDispatch();
    const[activeId,setActiveId] = React.useState(4)
    const handClick =(id)=>{
        if(activeId !== id){
            setActiveId(id);
        }
    }
    const logout =()=>{
      dispatch(authAction.resetAll())
    }
  return (
    <CDBSidebar textColor="#fff" backgroundColor="#333" style={{display:"flex", height: '100vh',position:'fixed', overflow:'visible'}}>
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
          Sidebar
        </a>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>    
          <NavLink exact="true" to="/account" onClick={()=>{handClick(1)}}>
            <CDBSidebarMenuItem active={activeId === 1 ? true:false} icon="user">Account</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact="true" to="/dashboard" onClick={()=>{handClick(2)}}>
            <CDBSidebarMenuItem  active={activeId === 2 ? true:false} icon="chart-bar">Summary</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact="true" to="/store" onClick={()=>{handClick(3)}}>
            <CDBSidebarMenuItem  active={activeId === 3 ? true:false} icon="home">Store</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact="true" to="/product" onClick={()=>{handClick(4)}} >
            <CDBSidebarMenuItem  active={activeId === 4? true:false} icon="box">Products</CDBSidebarMenuItem>
          </NavLink>

          <NavLink exact="true" to="/"  onClick={()=>{logout();}}>
            <CDBSidebarMenuItem icon="arrow-left">Sign out</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
  
      </CDBSidebarFooter>
    </CDBSidebar>
   
  );
};

export default SideBar;