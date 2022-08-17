import React from "react";
import {Image,Button} from "react-bootstrap";
import { useSwipeable } from "react-swipeable";
import {Row} from "react-bootstrap"
import "./Carousel.css";


const Carousel = ({arr}) => {

  const [activeIndex, setActiveIndex] = React.useState(0);
  // eslint-disable-next-line no-unused-vars
  const [paused, setPaused] = React.useState(false);

  const updateIndex = React.useCallback((newIndex) => {
    if (newIndex < 0) {
      newIndex = arr.length-1;
    } else if (newIndex >= arr.length) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  },[arr.length]);

  /*React.useEffect(()=>{
    if(index1 === undefined){
      updateIndex(0)
    }else{
      updateIndex(index1)
    }
  },[index1, updateIndex])*/

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  return (
    <div
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
        <Row>
      <div className="inner" >
      {arr.map((item, index) => {
        //use the lenth to devide the offset of carousel 
          return (
            <div key={index} className="carousel-item border border-dark" style={ index !== activeIndex ? { visibility:"hidden" } : {visibility:"visible"}}>
                <Image   
                 src={item.imageSrc}
                 className="img-thumbnail"
                 style={{width:"650px" ,height:"350px"}}
                  alt='...'/>
             </div>
          );
        })}
      </div>
      </Row>
      <div className="outer-box">
        <div className="arrow">
        <Button variant="dark"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </Button>
        </div>

      <div
      className="indicators">

         <div
          className="inn"
          style={activeIndex <= arr.length-4 ? {transform: `translateX(-${(activeIndex) * 17.5}%)`}:{transform: `translateX(-${(arr.length-5) * 17}%)`}}>
         {arr.map((item, index) => {
          return (
            <button
              key={index}
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              <Image src={item.imageSrc}
      alt='...'
      style={{ maxWidth: '5rem' }}/>
            </button>
          );
        })}
        
         </div>
         
    
  
      </div>
      <div className="arrow">
      <Button variant="dark"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </Button>
      </div>
 
      </div>
      
      
    </div>
  );
};

export default Carousel;
