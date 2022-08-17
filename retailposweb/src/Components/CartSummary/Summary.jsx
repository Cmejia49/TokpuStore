import React from 'react';
import{ Button, Container, Row,Col} from 'react-bootstrap'
const Summary =({checkout, numOfItem,total})=>{
    return(
            <>
            <Col>
            <Container className="bg-light rounded-top">
              <div>
                <h5 className='text-center'>Summary</h5>
              </div>
              <Row>
                  <p><b>number of items: </b> {numOfItem}</p>
              </Row>
              <Row>
                 <p><b>total: </b>${total}</p>
              </Row>
              <Row className='justify-content-center'>
                <Button onClick={()=>checkout()} variant='outline-dark' className='m-md-3'>Checkout</Button>
              </Row>
            </Container>
            </Col>
      
            </>
    )
}

export default Summary;