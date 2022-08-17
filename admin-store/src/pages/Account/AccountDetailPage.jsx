import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import AccountDetail from '../../layout/body/account/AccountDetail';
import { getAccount, getStatus, getToken,singleAcoount } from '../../store/auth-slice';

const AccountDetailPage = ()=>{
    const dispatch = useDispatch()
    const {id} = useParams();
    const status = useSelector(getStatus);
    const token = useSelector(getToken);
    const user = useSelector(singleAcoount);
    React.useEffect(()=>{
        if(status.getStatus === 'idle'){
            dispatch(getAccount({token:token,id:id}))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch, id, token])
    return(
        <div className='min-vh-100 d-flex flex-column justify-content-center align-items-center '>
            {status.getStatus ==='succeeded'?(
                <AccountDetail user={user} id={id}/>
            ):(<>loading</>)}
        </div>
    )
}

export default AccountDetailPage;