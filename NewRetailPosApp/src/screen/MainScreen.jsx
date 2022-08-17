import React, { useRef, useState } from "react";
import { View,Animated,FlatList,ActivityIndicator, ScrollView,Text } from 'react-native';
import containerStyle from '../styles/containerStyle';
import * as SecureStore from 'expo-secure-store';

import { useSelector, useDispatch } from 'react-redux';
import {productAction,getHeader, getStatus, retrieveItem,selectAllProduct,getPage, retrieveItemByCat, retrieveItemByName} from  '../store/product-slice'
import {retrieveCategories, selectAllCategory, getCatStatus} from '../store/category-slice'
import MainHeader from "../component/Header/MainHeader";
import SearchForm from "../component/Form/SearchForm";
import CatBtnGrp from "../component/Button/CatBtnGrp";
import CardCustom from "../component/Card/CardCustom";
import { getAccount, getId, getToken } from "../store/auth-slice";
const MainScreen = ({navigation})=>{
    const dispatch = useDispatch();
    const prodStatus = useSelector(getStatus);
    const catStatus = useSelector(getCatStatus);
    const product = useSelector(selectAllProduct);
    const cat = useSelector(selectAllCategory);
    const header = useSelector(getHeader);
    const page = useSelector(getPage);
    const userId = useSelector(getId)
    const token = useSelector(getToken)
    const [isClicked, setisClicked] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const onEnd = () => {
      if(page < header.TotalPages && header.HasNext == true){
        if(header.Type == "GETALL"){

          dispatch(productAction.setPage(page+1));
        }
      

        if(header.Type =="FILTERBYCAT"){

          dispatch(productAction.setPage(page+1));
        }
      
        if(header.Type =="FILTERBYNAME"){
          dispatch(productAction.setPage(page+1));
          
        }
      }
    }

    React.useEffect(()=>{
        if(prodStatus.getAllStatus === 'idle'){
            dispatch(retrieveItem(1))
        }
        if(catStatus === 'idle'){
            dispatch(retrieveCategories());
        }
        dispatch(getAccount({token:token,id:userId}));

 
        save();
    },[])


    React.useEffect(()=>{
      if(header.Type == "GETALL"){
        dispatch(retrieveItem(page))
      }
    

      if(header.Type =="FILTERBYCAT"){
        dispatch(retrieveItemByCat(page))
      }
    
      if(header.Type =="FILTERBYNAME"){
        dispatch(retrieveItemByName(page))
        
      }
    },[page])

    const save = async()=>{
      let result = await SecureStore.getItemAsync("Token");
      if(result === null){
        const acc = {
          token:token,
          id:userId
        }
        await SecureStore.setItemAsync("Token", JSON.stringify(acc));
      }
    }
    const showSearch = () =>{
      setisClicked(true)
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }).start();
    }
  
    const hideSearch = () =>{
      setisClicked(false)
      Animated.timing(fadeAnim,{
        toValue:0,
        duration:500,
        useNativeDriver: true
      }).start();
    }
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <View>
            <MainHeader 
              cartPress={()=>{navigation.navigate("Cart")}}
              searchPress={isClicked != true ? showSearch:hideSearch}/>
          </View>
  
        )
       })
    }, [navigation, isClicked]);


    return(
        <Animated.View
      flex={1}
      style={[
        containerStyle.fadingContainer,
        {
          transform: [{
            translateY:fadeAnim.interpolate({
              inputRange: [0,1],
              outputRange: [-50,0] 
            }),
          }],
        }
      ]}>
         
        <View style={containerStyle.container}>  
        <View style={{marginTop:0, justifyContent:'center'}}>
        <SearchForm/>
        <ScrollView style={{marginTop:5}}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
            justifyContent:"space-between",
         }}
            horizontal={true}
            alwaysBounceHorizontal={true}>
     <View style={containerStyle.catContainer}>
            {catStatus === "succeeded" ? (
                <>
                  <CatBtnGrp cat={cat}/>
                </>
            ):(
              <>
              <View>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
              </>
            )}
     </View>
     </ScrollView>
     </View>

          <View style={containerStyle.ProductContainer}>
          <FlatList contentContainerStyle={{alignContent:'center',alignItems:'center',}} 
                   showsVerticalScrollIndicator={false}
            data={product}
            initialNumToRender={10}
            onEndReachedThreshold={0.3}
            onEndReached={onEnd}
            numColumns={2} 
            renderItem={({item, index}) => (
            <CardCustom 
            key={index}
            item={item}
            onPress={()=>{ navigation.navigate("Detail",{paramKey:item.itemId})}}/> 
        )}
        ListFooterComponent={() => {
          if (prodStatus.getAllStatus === "loading" || 
          prodStatus.catFilterStatus === "loading"||
          prodStatus.filterStatus === "loading" ) {
            return (
              <View>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            );
          } else {
            return null
          }
        }}
            keyExtractor={(item) => item.itemId}
              />
          </View>
        </View>
        </Animated.View>
    )   
}




export default MainScreen;