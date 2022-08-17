import React from "react";
import { Container, Spinner } from "react-bootstrap";
import {DashboardHead} from "../../layout/header/dashboard/DashboardHeader"
import {useDispatch, useSelector } from 'react-redux';
import {getDay, getStoreId,getStatus, retrieveDataDashBoard, retrieveSummary, getHeader, retrieveSaleHistory, selectSaleHistory} from '../../store/dashboard-slice';
import {selectAllStore } from '../../store/store-slice';
import {option} from "../../Constant/filter"
import { getToken } from "../../store/auth-slice";
import MainPagination from "../../components/Pagination/Pagination";
import SaleHistoryBody from "../../layout/body/Dashboard/SaleHistoryBody";

const SaleHistory = () =>{
  const[currPage,setCurrPage]= React.useState(1)
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const store = useSelector(selectAllStore);
  const actfilter = useSelector(getDay);
  const actStore = useSelector(getStoreId);
  const token = useSelector(getToken)
  const saleData = useSelector(selectSaleHistory)
  const header = useSelector(getHeader);

  const retrieveSale=()=>{
    dispatch(retrieveSaleHistory({
      option:actfilter,
      branch:actStore.storeId,
      pageSize:20,
      pageNumber:currPage,
      token:token}))
  }
  React.useEffect(()=>{
    retrieveSale()
    dispatch(retrieveSummary({option:actfilter,branch:actStore.storeId,token:token}))
    dispatch(retrieveDataDashBoard({option:actfilter,branch:actStore.storeId,token:token}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[actfilter,actStore])
    return(
      <>
        <Container className="d-flex flex-column mt-5">
              <DashboardHead
                filter ={option}
                 store ={store}
                 selectStore={actStore}
                 selectDay={actfilter}/>
              {status.saleStatus === "succeeded" ? (
          <SaleHistoryBody 
          totalSize={header.TotalPages}
          data={saleData}/>
              ):(<div className="d-flex justify-content-center mt-5">
               <Spinner
      as="span"
      animation="border"
      size="xl"
      role="status"
      aria-hidden="true"
    />
              </div>)}
        </Container>
        
        <MainPagination
            totPages={header.TotalPages}
            currentPage={currPage}
            pageClicked={(ele) => {
              setCurrPage(ele)
              retrieveSale()
          }}
              >

          </MainPagination>
        </>
    )
}

export default SaleHistory;