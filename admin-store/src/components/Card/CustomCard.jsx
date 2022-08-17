import React from 'react';
import{Card} from 'react-bootstrap'
import styles from "./style.module.css";
const CustomCard =(props)=>{

    return(

<Card  as={props.as} to={props.to} style={{ width: '16rem', cursor:"pointer", textDecoration:'none', color:'black'}} className={styles.custom + ' m-3'} >
  <Card.Img className='align-self-center mt-2' style={{height:props.height , width:props.width}} variant="top" src={props.src} />
  <Card.Body>
    <Card.Title className='text-center'>{props.title}</Card.Title>
  </Card.Body>
</Card>

    )
}

export default CustomCard;