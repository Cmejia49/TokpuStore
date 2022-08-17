import * as React from 'react';
import { View, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';     
import textInputStyle from '../../styles/textInputStyle';
import { useDispatch } from 'react-redux';
import { retrieveItemByName } from '../../store/product-slice';
const SearchForm  = () =>{
    const dispatch = useDispatch();
    const [name, setName] =React.useState();
    const [prev,setprev] = React.useState();
    const handlerSearch = ()=>{
        if(prev !== name){
            setprev(name);
           dispatch(retrieveItemByName({page:1,name:name}))
            }
    }
    return(
        <View style={{flexDirection:'row'}}>
          <AntDesign.Button
     name = {"search1"}
     size={24} 
     backgroundColor = 'rgba(255, 255, 255,0.65)'
     color='black'
     iconStyle={
     {marginRight: 0,
      fontWeight:'bold',
     }
    }
    onPress={()=>{handlerSearch()}}
    />
            <TextInput style={textInputStyle.srchTxtInput} 
             placeholder="Search for..."
             onChangeText={(e)=>{setName(e)}}
             />
        </View>
    )
}

export default SearchForm;