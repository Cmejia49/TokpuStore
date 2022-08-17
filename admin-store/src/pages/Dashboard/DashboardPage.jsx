import React from 'react';
import {Container} from 'react-bootstrap'
import DashboardBody from '../../layout/body/Dashboard/DashboardBody';
import DashboardFooter from '../../layout/footer/dashboard/DashboardFooter';
import {DashboardHead} from '../../layout/header/dashboard/DashboardHeader';
import {useDispatch, useSelector } from 'react-redux';
import {getDay, getStoreId,getStatus, retrieveDataDashBoard, retrieveSummary} from '../../store/dashboard-slice';
import {selectAllStore } from '../../store/store-slice';
import {option} from "../../Constant/filter"
import { getToken } from '../../store/auth-slice';
const DashboardPage = ()=>{
    const dispatch = useDispatch();
    const status = useSelector(getStatus);
    const store = useSelector(selectAllStore);
    const actfilter = useSelector(getDay);
    const actStore = useSelector(getStoreId);
    const token = useSelector(getToken)
    React.useEffect(()=>{
      dispatch(retrieveSummary({option:actfilter,branch:actStore.storeId,token:token}))
      dispatch(retrieveDataDashBoard({option:actfilter,branch:actStore.storeId,token:token}))
  },[actfilter, dispatch, actStore, token])

    return(
        <Container className='mt-5'>
            <div className='my-3'>
            <DashboardHead
                filter ={option}
                 store ={store}
                 selectStore={actStore}
                 selectDay={actfilter}/>
            </div>     
            <div>
            <DashboardBody 
                summaryStatus={status.summaryStatus}
                chartStatus={status.dataDashBoardStatus}/>
            </div>
            <div>
            <DashboardFooter/>
            </div>
      
        </Container>
    )
}



export default DashboardPage;