import React from 'react';
import { Pressable, View, Text } from 'react-native';
import buttonStyle from '../../styles/buttonStyle';
import { useDispatch } from 'react-redux';
import {retrieveItem, retrieveItemByCat,productAction} from '../../store/product-slice'
const CatBtnGrp =({cat})=>{
   const dispatch = useDispatch();
   const [clickedId, setClickedId] =  React.useState(-1);
   const [activeId, setActiveId] =  React.useState(1);

 const handleClick = (clickid,catId) => {
     setClickedId(clickid);
     if(clickedId !== clickid){
       setActiveId(1)    
       dispatch(productAction.reset())
       if(catId === 0){
        dispatch(retrieveItem(1))
       }else{
       dispatch(retrieveItemByCat({page:1, id:catId}));
       }
      }

   }

    return(
      <>
       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
            <Pressable 
               onPress={() =>{
                handleClick(-1,0)
               }}
               style={(-1 == clickedId && activeId == 1 )? buttonStyle.buttonActive : buttonStyle.variationBtn}>
               <Text>All</Text>
            </Pressable>
         </View>
      {cat.map((i,index)=>(
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
            <Pressable 
               onPress={() =>{
               handleClick(index, i.catId);
               }}
               style={(index == clickedId && activeId == 1 )? buttonStyle.buttonActive : buttonStyle.variationBtn}>
               <Text adjustsFontSizeToFit={true}>{i.categoryName}</Text>
            </Pressable>
         </View>
      ))}
      </>
    )
}
export default CatBtnGrp;