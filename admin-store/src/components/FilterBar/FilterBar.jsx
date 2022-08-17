import React from "react";
import DropDownFilter from "./DropDownFilter";
import {Dropdown } from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import { dashboardAction } from "../../store/dashboard-slice.jsx";
const FilterBar = ({store,filter,activeStore,activeDay})=>{
    const dispatch = useDispatch();

    const storeSelect =(store)=>{
      dispatch(dashboardAction.setStore(store))
    }

    const daySelect =(day)=>{
      dispatch(dashboardAction.setDay(day))
    }

    return(
        <div className="d-flex justify-content-center">
            <div className="align-self-center mx-5">
                Filter
            </div>
            <div className="mx-5 p-2">
            Store
            <DropDownFilter title={activeStore.storeName}>
                {store.map((s,i)=>
                  <Dropdown.Item
                   onClick={()=>{storeSelect(s)}}
                   key={i} as="button">
                    {s.storeName}
                  </Dropdown.Item>
                )}
                    <Dropdown.Item
                   onClick={()=>{storeSelect({storeId:0,storeName:"all"})}}
                     as="button">
                    all
                  </Dropdown.Item>
            </DropDownFilter>
            </div>
            <div className="mx-5 p-2">
            Report
            <DropDownFilter title={activeDay}>
                {filter.map((s,i)=>
                  <Dropdown.Item 
                        onClick={()=>{daySelect(s)}}
                        key={i} as="button">
                        {s}
                  </Dropdown.Item>
                )}
            </DropDownFilter>
            </div>
        </div>
    )
}

export  default FilterBar;