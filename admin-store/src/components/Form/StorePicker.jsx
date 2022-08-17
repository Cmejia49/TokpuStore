import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {getSelectedStore, storeAction } from '../../store/store-slice';
import { formAction, getCat } from '../../store/form-slice';
const StorePicker = ({data})=>{
  const dispatch = useDispatch();
  const category = useSelector(getCat);
  const store = useSelector(getSelectedStore);
  const handClick =(s)=>{
    console.log(s);
      if(store.storeId !== s.storeId){
          dispatch(storeAction.getStore(s));
    }
  }
  const catClick = (cat)=>{
    if(category.catId !== cat.catId){
      dispatch(formAction.setCat(cat))
    }
  }
    return(
        <Dropdown>
        {data[0].storeId !== undefined ? (
          <>
          <Dropdown.Toggle size="sm" variant="secondary" id="dropdown-basic">
          {store.storeName}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {data.map((store, index)=>
                 <Dropdown.Item
                 onClick={()=>{handClick(store)}}
                  key={store.storeId}>{store.storeName}</Dropdown.Item>
          )}
        </Dropdown.Menu>
          </>
  
      ):(
        <>
         <Dropdown.Toggle size="sm" variant="secondary" id="dropdown-basic">
            {category.categoryName}
           </Dropdown.Toggle>
            <Dropdown.Menu>
          {data.map((i, index)=>
                 <Dropdown.Item
                 onClick={()=>{catClick(i)}}
                  key={i.catId}>{i.categoryName}</Dropdown.Item>
          )}
        </Dropdown.Menu>
        </>

      )}
      </Dropdown>
    )
    
}



export default StorePicker;