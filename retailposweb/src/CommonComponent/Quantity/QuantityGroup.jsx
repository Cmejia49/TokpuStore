import React from 'react';
import {Button,InputGroup, FormControl } from 'react-bootstrap'

import { PlusLg, DashLg } from 'react-bootstrap-icons';
import styles from "./styles.module.css"
const QuantityGroup = ({increment,decrement,value})=>{

    return(
      <>
             
              <InputGroup className={styles.inputGroup}>
              <Button onClick={()=>decrement()} size="xs" variant="outline-dark" className={styles.btn}>
                  <DashLg size={25} className="px-1"/>
                </Button>
                <FormControl
                            type="number"
                            value={value}
                            className={styles.input}
                            readOnly={true}
                          />
                          <Button onClick={()=>increment()} size="xs" variant="outline-dark" className={styles.btn}>
                              <PlusLg size={25} className="px-1"/>
                          </Button>
                </InputGroup>
      </>
    )
  }

  export default QuantityGroup;