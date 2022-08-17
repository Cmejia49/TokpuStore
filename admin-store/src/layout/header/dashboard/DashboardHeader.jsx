import React from "react";
import FilterBar from "../../../components/FilterBar/FilterBar";
import styles from './style.module.css'
const DashboardHeader =({filter, store,selectStore,selectDay})=>{
    return(
      <div className={styles.customShadow + " d-flex justify-content-center"}>
        <FilterBar 
          filter={filter} 
          activeStore ={selectStore}
          activeDay ={selectDay}
          store={store}/>
      </div>  
    )
}

export const DashboardHead = React.memo(DashboardHeader);