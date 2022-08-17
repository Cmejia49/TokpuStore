import React from "react";
import  "./style.css";
import { Button } from "react-bootstrap";

 const PageButtonRenderer = ({
    page,
    active,
    onPageChange
  }) => {
    const handleClick = (e) => {
      e.preventDefault();
      onPageChange=(page)=>{
    
      } 
    };
    const activeStyle = {};
    if (active) {
      activeStyle.backgroundColor = '#000';
      activeStyle.color = '#fff';
    } else {
      activeStyle.backgroundColor = '#fff';
      activeStyle.color = '#000';
    }
    if (typeof page === 'string') {
      activeStyle.backgroundColor = '#fff';
      activeStyle.color = '#000';
    }
    return (
      <li key={page} className="page-item">
       <Button style={activeStyle} onClick={handleClick} variant="dark">{page}</Button>
      </li>
    );
  };
  
  export default PageButtonRenderer;