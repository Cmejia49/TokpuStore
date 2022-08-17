import React from 'react';
import CustomCard from '../../../components/Card/CustomCard';
import user from '../../../assets/user.png'
import {Row} from 'react-bootstrap'
import { Link } from 'react-router-dom';
const AccountBody = ({data})=>{
    return(
        <>
      <Row className='justify-content-center mt-5'>
        {data.map((acc, i)=>
        <CustomCard
        width={"15rem"}
        height={"200px"}
        title={acc.id + " " +acc.userName}
        src={user}
        as={Link}
        to={`/account/${acc.id}`}
        key={i}/>
        
        )}
        </Row>
        </>
    )
}

export default AccountBody;