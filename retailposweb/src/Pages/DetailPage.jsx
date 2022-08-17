import React from 'react';
import DetailBody from '../Layouts/Body/DetailBody/DetailBody';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getDetailStatus,retrieveDetail,detailAction } from '../store/detail-slice';
import { useParams } from 'react-router-dom';
const DetailPage = ()=>{
  const id = useParams();
  const dispatch = useDispatch();
  const status = useSelector(getDetailStatus);
  React.useEffect(()=>{
    if(status === 'idle'){
      dispatch(retrieveDetail(id))
    }
    return () => {
       dispatch(detailAction.reset())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch,id])

    return(
          <>
            {status === 'succeeded' ?( 
            <DetailBody/>
            ):(<>{status}</>)}
          </>
    )
}



export default DetailPage;