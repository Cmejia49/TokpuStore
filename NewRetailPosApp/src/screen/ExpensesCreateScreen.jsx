import React from "react";
import containerStyle from "../styles/containerStyle";
import textStyle from "../styles/textStyle";
import textInputStyle from '../styles/textInputStyle'
import buttonStyle from "../styles/buttonStyle";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet,Text,
        View,
        Pressable,
        KeyboardAvoidingView,
        TouchableWithoutFeedback, 
        TextInput,
        Keyboard, 
        TouchableOpacity} from 'react-native';
import { createExpenses, getStatus } from "../store/expenses-slice";
import { getToken } from "../store/auth-slice";


const ExpensesCreateScreen = ()=>{
    const date =  moment().format('MM/DD/YYYY')
    const token = useSelector(getToken)
    const dispatch = useDispatch()
    const status = useSelector(getStatus);
    const [amt,setAmt] = React.useState("");
    const [detail,setDetail] = React.useState("");
    const addExpenses = ()=>{
        
       if(amt !== "" && detail !== ""){
        const expenses = {
            Value:amt*1,
            Detail:detail
        }
        dispatch(createExpenses({data:expenses,token:token}))
       }
    }
    
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "margin" : "height"}
        style={styles.container}
      >
          
            <View style={{flex:1, margin:20}}>
                <View style={containerStyle.dateContainer}>
                    <Text style={textStyle.defTxt}>Date: {date}</Text>
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={containerStyle.middleContainer}>
                        <TextInput 
                         onChangeText={(e)=>{setAmt(e)}} 
                         value={amt}     
                         placeholder='ENTER AMOUNT'
                         keyboardType="numeric"
                         style={textInputStyle.inputTxt} />
                        <TextInput   
                            placeholder='ENTER DETAIL'
                            onChangeText={(e)=>{setDetail(e)}}
                            numberOfLines={4}
                            maxLength={40}
                            style={textInputStyle.multiLineInput}/>
                    </View>
        </TouchableWithoutFeedback>
            </View>
    
        
            <View style={styles.bottomContainer}>
          <View style={{flex:1}}backgroundColor={'#000'}>
              <TouchableOpacity
               onPress={()=>{addExpenses()}}
               style={styles.bottomBtn}>
        <Text style={{
                fontSize:24,
                fontWeight:'400',
                lineHeight:32,
                fontStyle:'normal',
                color:'#fff',
                padding:10,
                
            }}>Save</Text>
                </TouchableOpacity>
        </View>
    </View>
        </KeyboardAvoidingView>
    )
}         
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F0F0',
    },

    dateContainer:{
        flex:0,
        margin:2,
        marginVertical:10,
        backgroundColor:'#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height:4,
        },
        shadowOpacity:0.25,
        shadowRadius: 4,
        elevation: 4, 
    },
    dateTxt:{
        fontFamily:'Roboto',
        fontSize:18,
        lineHeight:46,
        fontWeight:'400',
        fontStyle:'normal',
        lineHeight:21,
        marginHorizontal:5,
        padding:5
    },
    summaryContainer:{
        flex:2,
        margin:2,
        backgroundColor:'#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height:4,
        },
        shadowOpacity:0.25,
        shadowRadius: 4,
        elevation: 4, 
    },
    summaryTxt:{
        margin:5,
        marginVertical:10,
        fontSize: 24,
        lineHeight: 28,
        fontFamily:'Roboto',
        fontStyle:'normal',
        color: '#000',
        fontWeight:'700',
    },
    inputTxt: {
        margin:10,
        height:52,
        borderWidth:1,
        fontSize: 24,
        lineHeight: 32,
        fontFamily:'Roboto',
        fontStyle:'normal',
        color: '#000',
        fontWeight:'500',
        textAlign:'center',
      },


      bottomContainer:{
       flex:0,
       flexDirection:'row',
       justifyContent:'space-between',
       borderWidth:1.5,
       shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height:-6,
          },
          shadowOpacity:1,
          shadowRadius:4,
          elevation:5, 
      },
      bottomBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#000',
      },
  });
export default ExpensesCreateScreen;