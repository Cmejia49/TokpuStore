import React from 'react'
import { View,Pressable,Text, TouchableOpacity } from 'react-native'
import buttonStyle from "../../styles/buttonStyle";
import { useDispatch } from 'react-redux';
import { detailAction } from '../../store/detail-slice';

const VariationBtn = ({data}) =>{
    const [clickedId, setClickedId] =  React.useState(-1);
    const [activeId, setActiveId] =  React.useState(0);
     const dispatch = useDispatch();
    const handleClick = (name, id) => {
      setClickedId(id);
      if(clickedId != id){
        setActiveId(1)  
        dispatch(detailAction.getIndex1(name))
      }else{

        setActiveId(0)
        setClickedId(-1)
        dispatch(detailAction.getIndex1(""))
      }

    };
    return (
      <>
      {data != undefined ? (
        <>
      {data.map((i,index) => (
          <TouchableOpacity
            key={i.optionID}
            onPress={(event) => {
              handleClick(i.optionName, index)
            }}
            style={(index == clickedId && activeId == 1 )? buttonStyle.buttonActive : buttonStyle.variationBtn}
          >
             <Text>{i.optionName}</Text>
          </TouchableOpacity>
        ))}
        </>
        ):(
          <></>)}
      </>
    ) 
}

export default VariationBtn;