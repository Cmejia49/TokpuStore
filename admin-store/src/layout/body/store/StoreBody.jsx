import React from 'react'
import { Link } from 'react-router-dom'
import CustomCard from '../../../components/Card/CustomCard'
import storeLogo from "../../../assets/home.png"
import {Row} from "react-bootstrap"
const StoreBody = ({data}) => {
  return (
    <>
       <Row className='justify-content-center'>
        {data.map((store,index)=>
            <CustomCard
            height={"240px"}
            as={Link}
            to={`/store/${store.storeId}`}
            title={store.storeName}
            src={storeLogo}
            key={index}
            />
        )}
        </Row>
    </>
  )
}

export default StoreBody;
