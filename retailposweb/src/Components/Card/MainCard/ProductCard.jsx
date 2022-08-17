import React from 'react';
import{Card} from 'react-bootstrap'
import styles from "./style.module.css";
const ProductCard =(props)=>{
    return(
<>
<Card as={props.as} to={props.to} style={{ width: '18rem', cursor:"pointer", textDecoration:'none', color:'black'}} className={styles.custom + ' m-3'} >
  <Card.Img variant="top" className='pt-2'  style={{maxHeight:"40rem"}} src={props.imgSrc} alt="" />
  <Card.Body>
    <div className="d-flex  justify-content-between align-items-center">
    <Card.Title><h5>{props.title}</h5></Card.Title>
    <Card.Title style={{fontSize:"14px"}} className="text-center"> <span>&#8369;</span> {props.range}</Card.Title>
    </div>
    <Card.Text>
      {props.descipt}
    </Card.Text>
  </Card.Body>
</Card>
</>
    )
}

export default ProductCard;