import React from  'react';
import{Card, Row,Col} from 'react-bootstrap'
import styles from "./style.module.css";
import QuantityGroup from "../../../CommonComponent/Quantity/QuantityGroup.jsx"

const ItemCartCard =({item,increment,decrement,remove})=>{
    return(

      <Col className="border border-5 p-0">
    <Row className="">
      {console.log(item.img)}
      <Col  xl="3">
      <Card.Img className={styles.img}
       src={item.img}
       crossOrigin="anonymous" />
      </Col>
      <Col xl="9" xs="auto">
      <Card className='border border-0'>
        <Card.Body>
          <Row xl="auto" className="justify-content-between">
            <Col>
            <Card.Title>{item.name}</Card.Title>
            </Col>
            <Col onClick={()=>remove()} style={{cursor:"pointer"}}>
              <p>X</p>
            </Col>
          </Row>
          <Row xl="auto">
              <Card.Text><b>Price:</b>{item.price}</Card.Text>
          </Row>
          <Row xl="auto">
              <Card.Text><b>{item.variationName}</b></Card.Text>
          </Row>
          <Row>
          <Card.Text><b>Quantity:</b></Card.Text>
              <QuantityGroup
              value={item.quantity}
              increment={()=>increment()} 
              decrement={()=>decrement()}/>    
          </Row>
          <Row>
          <Card.Text><b>stock:</b>{item.stock}</Card.Text>
          </Row>
          <Row>
            <Card.Text><b>Subtotal:</b>{item.subTotal}</Card.Text>
          </Row>
        </Card.Body>
      </Card>
      </Col>
    
    </Row>
    </Col>

    )
}



export default ItemCartCard;