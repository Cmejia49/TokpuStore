import React from 'react';
import {Container,Row,Col,Button,Image } from 'react-bootstrap'
import styles from "./style.module.css"
import Carousel from '../../../Components/Carousel/Carousel.jsx';
import QuantityGroup from "../../../CommonComponent/Quantity/QuantityGroup.jsx"
import VariationBtn from '../../../Components/Variation/VariationBtn';
import SubVariationBtn from '../../../Components/SubVariation/SubVariationBtn';
import {getIndex1, getIndex2, getStock, selectDetail,getValue} from "../../../store/detail-slice"
import { detailAction } from '../../../store/detail-slice';
import { cartAction } from '../../../store/cart-slice';
import { useDispatch ,useSelector } from 'react-redux';
import SuccessModal from '../../../Components/Modal/SucessModal/SuccessModal';
import mbrok from "../../../Assets/Missing-image.png"
import { Link } from 'react-router-dom';
const DetailBody =(props)=>{
    const dispatch = useDispatch();
    const item = useSelector(selectDetail);
    const index1 = useSelector(getIndex1);
    const index2 = useSelector(getIndex2);
    const stock = useSelector(getStock);
    const value = useSelector(getValue);
        const [status, setStatus] =React.useState(false)
        const [isFailed, setIsFailed] = React.useState(false);
        const handleClose =()=>{
            
        }
        
    const addToCart = () =>{
        if(validate()){
            console.log(item.imageList[0].imageSrc)
        const cart = {
            id:item.itemId,
            img:item.imageList.length > 0 ? item.imageList[0].imageSrc : undefined ,
            name:item.itemName,
            variation:stock[0].stockIndex,
            price:stock[0].price,
            quantity:value,
            stock:stock[0].quantity
        }
        setIsFailed(true)
        dispatch(cartAction.addToCart(cart))
        return;
     }
     setIsFailed(false)
     setStatus(true)
    }
    
    const validate = ()=>{
        if(item.variantList.length === 1){
            if(index1 === "" || value === 0){
                return false
            }else{
                return true
            }
        }else if(item.variantList.length === 2){
             if(index1 === "" || index2 === "" || value === 0){
                return false
             }else{
                return true
             }
        }else{
            if(value === 0){
                return false
            }else{
                return true
            }
        }
    }
    
    React.useEffect(()=>{
        dispatch(detailAction.updateStock())
    },[dispatch,index1,index2])
    return(
<Container className="bg-light rounded-top mt-5 mb-5 border border-2" >
                <Row className='mt-4 mb-5'>
                    <Col xl="1" className={styles.container}> 
                    {item.imageList.length > 0 ? (
                   <Carousel arr={item.imageList}/>
                    ):(
                        <Image src={mbrok}
                        className="img-thumbnail"
                        style={{width:"650px" ,height:"350px"}}
                         alt='...'/>
                    )}
                    </Col>
                    <Col className={styles.container}> 
                    <h5>{item.itemName}</h5>
                    <p><b>price: <span>&#8369;</span> {stock.length > 0 ? stock[0].price : item.priceRange}</b></p>
                    <p>Description:</p>
                    <p>{item.description}</p>
                {item.variantList.length > 0 ? (
                <>
                <p>{item.variantList[0].varietyName}:</p>
                <Row>
                    <Col>
                    
                  <VariationBtn arr={item.variantList[0].options} />
                    
            
                    </Col>
      
                </Row>
                </>
                ):(<></>)}
                {item.variantList.length > 1 ? (
                    <>
                <p>{item.variantList[1].varietyName}:</p>
                <Row>
                    <Col>
                        <SubVariationBtn arr={item.variantList[1].options} />
                    </Col>
                </Row>
                    </>
                ):(<></>)}
                <Row>
                    <p>Quantity:</p>
                    <QuantityGroup 
                    value={value}
                    increment={()=>dispatch(detailAction.increment())} 
                    decrement={()=>dispatch(detailAction.decrement())}/>    
                     <p className='mx-2'>Stock:{stock.length > 0 ? stock[0].quantity : stock}
                     
                     </p>
                </Row>
                    {status ? (<><p>Select necessary detail</p></>):(<></>)}
                <Row xl="auto">
                  
                    <Button onClick={()=>{
                       addToCart();
                    }} variant='dark px-5'>Add To Cart</Button>
             
                </Row>
          </Col>
                </Row>
                <SuccessModal
                show={isFailed}
                title={"Success"}
                body={msg()}
                children={  <Button variant="secondary"  as={Link} to={"/"} >
                Ok
              </Button>}
                handleClose={()=>{handleClose()}}
                />  
             </Container>  
    )
}

const msg =()=>{
    return(
        <div>
         <p>
            Item added to cart
         </p>
        </div>
    )
}


export default DetailBody;