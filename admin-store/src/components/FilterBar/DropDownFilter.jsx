import React from 'react';
import {DropdownButton } from 'react-bootstrap';
import "./style.css"
const DropDownFilter =({children, title})=>{
    return(
<DropdownButton variant='secondary' title={title}>
        {children}
</DropdownButton>
    )
}

export default DropDownFilter;