import React from 'react'
import { Container } from 'react-bootstrap'
import AccountBody from '../../layout/body/account/AccountBody';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus, getToken, retrieveAccount, selectAccount } from '../../store/auth-slice';
import AccountHeader from '../../layout/header/account/AccountHeader';
const AccountPage = ()=>{
    const dispatch = useDispatch();
    const status = useSelector(getStatus);
    const account = useSelector(selectAccount); 
    const token = useSelector(getToken);

    React.useEffect(()=>{
        if(status.getAllStatus === 'idle'){
            dispatch(retrieveAccount(token));
        }
    },[status,dispatch,token,account])

    return(
        <Container>
            <div>
                <AccountHeader/>
            </div>
            {status.getAllStatus === 'succeeded' ? (
                <AccountBody data={account}/>
            ):(<>loading</>)
            }
        </Container>
    )
}

export default AccountPage;