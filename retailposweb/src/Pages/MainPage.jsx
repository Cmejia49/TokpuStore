import React from 'react';
import MainBody from '../Layouts/Body/MainBody/MainBody';
import Footer from '../Layouts/Footer/Footer';
import { retrieveItem,getPostsStatus } from '../store/product-slice';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from 'react-ga';
const TRACKING_ID = "UA-234720492-1"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const MainPage =(props)=>{
    const pathName = window.location.pathname + window.location.search;
 const  setGA = () => {
    
    ReactGA.pageview(pathName);
  };
    const dispatch =useDispatch();
    const status = useSelector(getPostsStatus);
    React.useEffect(()=>{
        setGA();
        if(status.mainStatus === "idle"){
            dispatch(retrieveItem(1))
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])

    return(
        <>
          <MainBody/>
          <Footer/>
        </>
    )
}

export default MainPage;