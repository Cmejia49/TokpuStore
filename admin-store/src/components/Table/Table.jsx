import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import styles from "./style.module.css";
import  "./style.css";

const CaptionElement = ({title}) => (
    <h3 className="w-50 align-self-center mt-5"
      style={{
        borderRadius: "0.25em",
        textAlign: "center",
        color: "purple",
        border: "1px solid purple",
        padding: "0.5em"
      }}
    >
      {title}
    </h3>
  );
const Table =({keyField,columns,data,title})=>{

     
    return(
              <div className="d-flex flex-column">
                <CaptionElement title={title}/>
                <div className={styles.expandedcontainer}>
                <BootstrapTable
                  keyField={keyField}
                  data={ data }
                  columns={ columns }
                />
                </div>
                <div className="d-flex justify-content-end">
                </div>
              </div>

    )
}


export default Table;