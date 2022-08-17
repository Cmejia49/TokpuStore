import React from 'react';
import {Container} from 'react-bootstrap'
import StoreBody  from '../../layout/body/store/StoreBody';
import {useDispatch,useSelector } from 'react-redux';
import { getStoreStatus, selectAllStore,retrieveStore } from '../../store/store-slice';
import StoreHeader from '../../layout/header/store/StoreHeader';
import { getToken } from '../../store/auth-slice';
const StorePage = ()=>{
    const dispatch = useDispatch();
    const store = useSelector(selectAllStore);
    const status = useSelector(getStoreStatus);
    const token = useSelector(getToken);
    React.useEffect(()=>{
        if(status.getAllStatus === 'idle'){
            dispatch(retrieveStore(token));
        }
    },[dispatch,token,status])
    return(
        <Container>
            <StoreHeader/>
            {status.getAllStatus === "succeeded" ? (
            <StoreBody data={store}/>
            ):(<>
            <div>loading</div>
            </>)}
        </Container>
    )
}



export default StorePage;