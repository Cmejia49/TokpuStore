import React from 'react';
import { useScreenshot,createFileName } from "use-react-screenshot";
import{Container, Row,Col, Button} from 'react-bootstrap'
import Summary from '../../../Components/CartSummary/Summary';
import ItemCartCard from '../../../Components/Card/ItemCartCard/ItemCartCard';
import {useDispatch,useSelector } from 'react-redux';
import { getItemList, cartAction } from '../../../store/cart-slice';
import SuccessModal from '../../../Components/Modal/SucessModal/SuccessModal';
const CartBody = ()=>{
const ref = React.createRef(null);
const dispatch = useDispatch();
const itemList = useSelector(getItemList);
const [show,setShow] = React.useState(false);
// eslint-disable-next-line no-unused-vars
const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });
const calculation = React.useMemo(() => getTotal(itemList), [itemList]);

const handleClose=()=>{
  setShow(false)
}

const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
    return(
    <>
      <Container ref={ref} className="rounded-top mt-5" id="zero-pad">
          <Row className="d-flex justify-content-center">
            <Col lg="9">
                <Container  className="bg-light rounded-top">
                    <div  className="d-flex flex-column pt-4">
                        <div>
                            <h5 className="text-uppercase font-weight-normal">shopping bag</h5>
                        </div>
                            <div className="font-weight-normal">{itemList.length} items</div>
                    </div>
                    <Row  xs={1} md={1} className="d-flex flex-row justify-content-between align-items-center pt-lg-4 pt-2 pb-3 border-bottom mobile g-4">
                         {itemList.map((item, idx) => (
                         <ItemCartCard 
                         key={idx}
                         item={item}
                         remove={()=>{dispatch(cartAction.removeFromCart(item.id))}}
                         increment={()=>{dispatch(cartAction.increment(item.id))}}
                         decrement={()=>{dispatch(cartAction.decrement(item.id))}}/>
                        ))}
                    </Row>
                </Container>
            </Col>
            <Summary 
            numOfItem={itemList.length}
            total={calculation}
            checkout={()=>{
               setShow(true);
              downloadScreenshot()
              }}/>
        </Row>  
        <SuccessModal
                show={show}
                title={"Instruction"}
                body={msg()}
                children={  <Button variant="secondary" onClick={()=>{handleClose()}}>
                OK
              </Button>}
                handleClose={()=>{handleClose()}}
                />  
     </Container>  
    </>
    )
}

const msg =()=>{
  return(
    <>
    <div>
      <p>
        Kindly message the screen shot of the car on our fb page <br></br>
        <a href ="www.facebook.com" className='text-center'>www.fb.com</a>
      </p>
    </div>
    </>
  )
}

const getTotal = (itemList)=>{
    var count=0;
    for (var i=itemList.length; i--;) {
      count+=itemList[i].subTotal;
    }
   return count;
  }

export default CartBody;