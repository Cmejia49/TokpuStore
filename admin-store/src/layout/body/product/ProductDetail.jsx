import React from 'react';
import {Button, Form,Spinner} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import {formAction, getVariantList, getImg, getStatus, 
  getItemName, getDescription, getPriceRange, getStockList, getCat} from '../../../store/form-slice';
import VariantGrp from '../../../components/Form/VariantGrp';  
import UploadBtn from '../../../components/Form/UploadBtn';
import StorePicker from '../../../components/Form/StorePicker';
import TableForm from '../../../components/Form/TableForm';
import { selectAllStore,getSelectedStore } from '../../../store/store-slice';
import { postItem, putItem,getPostsStatus, deleteItem, productAction } from '../../../store/product-slice';
import { getToken } from '../../../store/auth-slice';
import { useNavigate, useParams} from 'react-router-dom';
import ModalMsg from '../../../components/Modal/ModalMsg';
import { selectAllCategory } from '../../../store/category-slice';

export const ProductDetail = ({data}) => {
    const navigate = useNavigate();
    const {id} = useParams()
    const dispatch = useDispatch();
    const store = useSelector(selectAllStore);
    const selectedStore = useSelector(getSelectedStore);
    const variantList = useSelector(getVariantList);
    const img = useSelector(getImg)
    const itemName = useSelector(getItemName);
    const description = useSelector(getDescription);
    const priceRange = useSelector(getPriceRange);
    const status = useSelector(getStatus);
    const stockList =useSelector(getStockList);
    const token = useSelector(getToken);
    const productStatus = useSelector(getPostsStatus);
    const cat = useSelector(selectAllCategory);
    const catFid = useSelector(getCat);
    const [isVariety, setIsVariety] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const handleClick=()=>{
        dispatch(formAction.addStock(store))
   
    }
    const checkHandle=(e)=>{
      if(e === false){
        dispatch(formAction.setStatus("single"));    
        dispatch(formAction.resetVariantList());
        setIsVariety(e);
      }else{
        dispatch(formAction.setStatus("failed"))

        setIsVariety(e);
      }
 
    }
    const submitHandle=()=>{
      const text = {
        ItemName:itemName,
        Description:description,
        priceRange:priceRange,
        VariantList:variantList,
        StockList:stockList,
        CatFId:catFid.catId
    };

      dispatch(postItem({text:text,img:img,token:token}))
    }

    const updateHandle=()=>{
      const text = {
        ItemName:itemName,
        Description:description,
        priceRange:priceRange,
        VariantList:variantList,
        StockList:stockList,
        CatFId:1
    };
    dispatch(putItem({text:text,token:token,id:id}))
    }

    
    const deleteHandle=()=>{
    dispatch(deleteItem({id:id,token:token}))
    }

    const cancelHandle=()=>{
      dispatch(productAction.setStatus('idle'))
     navigate(-1);
    }
    React.useEffect(()=>{
      if(id === undefined){
        if(status === "single"){
          dispatch(formAction.addStock(store));
  
          }
        }else{
          dispatch(formAction.setForm(data));
          setIsVariety(true);
          setEdit(true);
          dispatch(formAction.setStatus("success"));    
          console.log("hey")
        }
        return ()=>{
          dispatch(formAction.reset());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[dispatch,store,data,id])

  return (
        <Form className='w-50'>
        <Form.Group className="border border-2 p-3 mb-3" controlId="formBasicEmail">
        <Form.Label>Item Name</Form.Label>
        <Form.Control 
          value={itemName}
          onChange={e=>{dispatch(formAction.onChangeItemName(e.target.value))}} 
          type="text" 
          placeholder="Name" />
        <Form.Label>Description</Form.Label>
            <Form.Control 
              value={description}
              onChange={e=>{dispatch(formAction.onChangeDescription(e.target.value))}} 
              as="textarea" 
              rows="3" />

        <Form.Label>Price-Range</Form.Label>
        <Form.Control 
              value={priceRange}
             onChange={e=>{dispatch(formAction.onChangePriceRange(e.target.value))}} 
          type="text" 
          placeholder="Price-Range" />
        </Form.Group>
        
        <Form.Group  className="border border-2 p-3 mb-3">
        <Form.Label>Category</Form.Label>
          <StorePicker data={cat}/>
        </Form.Group>

        {isEdit === false ? (
        <Form.Group className="border border-2 p-3 mb-4" controlId="formBasicEmail">
        <Form.Label className='mb-2'>Images</Form.Label>
        <div className='d-flex flex-row overflow-scroll'>
        {img.map((v,index)=>{
          return <UploadBtn imgSrc={typeof(v.imageSrc) === "object" ? v.imgData : v.imageSrc} id={v.imageId} remove={()=>{dispatch(formAction.removeImg(v.imageId))}} key={index}/>
        })}
         <UploadBtn imgSrc={""} id={img.length+1} remove={()=>{dispatch(formAction.removeImg(img.imageId))}}/>
        </div>

        </Form.Group>
        ):(<></>)}



        <Form.Group className="border border-2 p-3 mb-3 " controlId="formBasicEmail">
  
        <Form.Label>Variety</Form.Label>
        <Form.Check type="checkbox" label="Check me out" checked={isVariety} onChange={e=>{checkHandle(e.target.checked)}} />
        
        {isVariety === true ? (
            <>
          <fieldset disabled={status === 'success' ? true : false}>
        {variantList.map((v, i)=>{
                return <VariantGrp value={v.varietyName} key={i} index={i} id={v.varietyId}/>
            })}
            <div>
              {variantList.length <2 ? (
                <>
                  <Button
                    onClick={()=>{dispatch(formAction.addVariantGrp({varietyId:variantList.length+1, varietyName:'',options:[{optionID:1,optionName:''}]}))}} 
                    style={{backgroundColor:"#fff" ,color:"blue", textDecoration:'underline', borderWidth:"0"}}>
                      add more variety
                    </Button>
                </>
              ):(
                  <>
                  </>
              )}
          
            </div>
            </fieldset>
            {status === "failed" ?(
        <div>Check your input correctly</div>
        ):(<></>)}
            {status === "failed" ? (
            <Button  onClick={()=>{handleClick()}} variant='dark'>
              Done  
            </Button>
            ):(
              <Button  onClick={()=>{dispatch(formAction.setStatus("failed"))}} variant='dark'>
                Edit  
            </Button>
            )}
       </>
        ):(<></>)}
     
        </Form.Group>
        
        {status === "success" || status === "single" ? (
        <Form.Group className="border border-2 p-3 mb-3" controlId="formBasicEmail">
        <div className="d-flex justify-content-between">
          <Form.Label>Inventoring</Form.Label>
           <div>{selectedStore.storeName}</div> 
          <StorePicker data={store}/>     
        </div>
        <TableForm  itemName={itemName} singleStore={selectedStore}/>
      
        </Form.Group>
          ):(<></>)}
          <div className='d-flex justify-content-around'>
            {isEdit === true ? (
              <>
                 <Button
             disabled={status === 'failed' ? true : false}
             onClick={()=>{updateHandle()}} variant="dark" type="button">
                Update
            </Button>
            <Button
             disabled={status === 'failed' ? true : false}
             onClick={()=>{deleteHandle()}} variant="dark" type="button">
                Delete
            </Button>
            <Button
             disabled={status === 'failed' ? true : false}
             onClick={()=>{cancelHandle()}} variant="dark" type="button">
                Cancel
            </Button>
              </>
            ):(
              <>
              {productStatus.updateStatus === "loading" ||
               productStatus.deleteStatus === "loading" ||
               productStatus.createStatus === "loading" ? (
              <>
               <Button variant="dark" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>
          
              </>
              ):(
                <>
                  <Button
             disabled={status === 'failed' ? true : false}
             onClick={()=>{submitHandle()}} variant="dark" type="button">
                Submit
            </Button>
            <Button
             onClick={()=>{cancelHandle()}} variant="dark" type="button">
                Cancel
            </Button>
                </>

              )}
              </>
            )}
          </div>
              <ModalMsg
              title={"Success"}
              message={productStatus.deleteStatus === "succeded"? "Deleted Successful": "Insert Successful"}
              show={productStatus.updateStatus === "succeded" ||
              productStatus.deleteStatus === "succeded" ||
              productStatus.createStatus === "succeded" ? true:false}
              children={ <Button onClick={()=>{dispatch(productAction.reset());  navigate(-1);}} > Ok </Button>}
              />

            <ModalMsg
              title={"Failed"}
              message={"Failed Operation"}
              show={productStatus.updateStatus === "failed" ||
              productStatus.deleteStatus === "failed" ||
              productStatus.createStatus === "failed" ? true:false}
              children={ <Button onClick={()=>{dispatch(productAction.reset())}} > Ok </Button>}
             />
            </Form>

  )
}
