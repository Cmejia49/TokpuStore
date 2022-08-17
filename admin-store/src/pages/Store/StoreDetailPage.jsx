import React from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useParams } from 'react-router-dom';
import StoreDetail from '../../layout/body/store/StoreDetail';
import {retrieveStoreById,getStore,getStoreStatus } from '../../store/store-slice'; 
import {getToken} from '../../store/auth-slice'
const StoreDetailPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const status = useSelector(getStoreStatus)
  const token = useSelector(getToken);
  const store = useSelector(getStore);

  React.useEffect(()=>{
      dispatch(retrieveStoreById({token:token, id:id}))
    
  },[dispatch,id,token])
  return (
    <div  className='d-flex justify-content-center mt-5 mb-5'>
          {status.getStatus === 'succeeded'?(
          <StoreDetail data={store}id={id}/>
          ):(
            <>{status.getStatus}</>
          )}
    </div>
  )
}
export default StoreDetailPage;