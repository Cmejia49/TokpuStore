import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {detailAction} from '../../store/detail-slice'
const StoreBtn =({arr})=>{
    const [clickedId, setClickedId] =  React.useState(-1);
    const [activeId, setActiveId] =  React.useState(0);
     const dispatch = useDispatch();
  const handleClick = (id,name) => {
      setClickedId(id);
      if(clickedId !== id){

        setActiveId(1)
        dispatch(detailAction.getIndex1(name))
      
      }else{

        setActiveId(0)
        setClickedId(-1)
        dispatch(detailAction.getIndex1(""))
      }

    };
    return(
        <>
        {arr !== undefined ? (
           <>
            {arr.map((i, index) => ( 
                    
            <Button key={index} onClick={()=>{handleClick(index,i.storeName)}} variant="outline-dark" className={`${index === clickedId && activeId === 1  ? "px-md-4 m-2 active" : "px-md-4 m-2"}`}>
               {i.optionName}
            </Button>
                  
            ))}
            </>
            ):(<></>)
        }
        </>
    )
}

export default StoreBtn;