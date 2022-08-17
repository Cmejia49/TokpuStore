import React from 'react';
import {View, Text,StyleSheet,FlatList, Pressable, ActivityIndicator,Dimensions, TouchableOpacity} from 'react-native'
import RadioBtn from '../component/Button/RadioBtn';
import FilterModalMsg from '../component/Modal/FilterModalMsg';
import Calendar from '../component/Modal/Calendar';
import FlatListHeader from '../component/FlatListPart/FlatListHeader';
import { options } from '../constant/option';
import textStyle from '../styles/textStyle';
import containerStyle from '../styles/containerStyle';
import DropDownBtn from '../component/Button/DropDownBtn';
import { AntDesign } from '@expo/vector-icons'; 
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {getToken} from '../store/auth-slice'
import buttonStyle from '../styles/buttonStyle'
import SeperatorFlatlist from '../component/FlatListPart/SeperatorFlatList';
import { MaterialIcons } from '@expo/vector-icons'; 
import { singleAcoount } from '../store/auth-slice';
import { retrieveExpenses, 
        selectExpensesList,
        getStatus, 
        retrieveExpensesByDate,
        getHeader,
        expensesAction,
        getTotal} from '../store/expenses-slice';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ExpensesContent from '../component/FlatListPart/ExpensesContent';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const ExpensesScreen = ({navigation})=>{
    const dispatch = useDispatch();
    const expenses = useSelector(selectExpensesList);
    const status = useSelector(getStatus);
    const token = useSelector(getToken);
    const header = useSelector(getHeader);
    const total = useSelector(getTotal);
    const account = useSelector(singleAcoount)
    const [show,setShow] = React.useState(false);
    const [showFilter,setShowFilter] = React.useState(false);
    const [page,setPage] = React.useState(1);
    const [act,setAct] = React.useState(2);
    const [value,setValue] = React.useState("Today");
    const [dates,setDates] = React.useState("")
   

    const filterByDate = (da) =>{
      const payload = {
        id:account.store.storeId,
        type:"FILTERBYDATE",
        date:da,
        token:token,
        pageNumber:1
     }
    dispatch(retrieveExpensesByDate(payload))
    }
    const filterByDay = (day)=>{
      const payload = {
        id:account.store.storeId,
        type:"FILTERBYDAY",
        day:day,
        token:token,
        pageNumber:1
      }
      dispatch(retrieveExpenses(payload))
    }

    
    React.useEffect(()=>{ 
        const payload ={
                id:account.store.storeId,
                type:"FILTERBYDAY",
                day:value,
                token:token,
                pageNumber:page
              }
            dispatch(retrieveExpenses(payload))       
        },[])

        React.useEffect(()=>{  
          if(page <= header.TotalPages){
              if(header.Type == "FILTERBYDAY"){
                  const payload = {
                                     id:account.store.storeId,
                                     type:"FILTERBYDAY",
                                     day:value,
                                     token:token,
                                     pageNumber:page
                                  }
                  dispatch(retrieveExpenses(payload))
              }
              if(header.Type == "FILTERBYDATE"){
                const payload = {
                                   id:account.store.storeId,
                                   type:"FILTERBYDATE",
                                   date:dates,
                                   token:token,
                                   pageNumber:page
                                }
                dispatch(retrieveExpensesByDate(payload))
            }
          }          
          },[page])
        
        
        
        const onEnd = () =>{
                    setPage(page+1)        
        }
        const handleRadioBtn = (key)=>{
          setAct(2)
          if(value !== key){
            setValue(key)
            dispatch(expensesAction.reset())
            filterByDay(key)
            
            if(status !== 'loading'){
              setPage(1);
            }
          }
          setShowFilter(false)
        }
        const handleConfirm = (date)=>{
          const con = moment(date).format('MM-DD-YYYY') 
          setAct(1);
          if(dates != con){
            setDates(con);
            dispatch(expensesAction.reset())
            filterByDate(con)
 
            if(status !== 'loading'){
              setPage(1);
            }
          }
          setShow(!show)

        }
        const hideCalendar = () =>{
          setShow(!show)
        }


        React.useLayoutEffect(() => {
          navigation.setOptions({
            headerRight: () => (
                <View style={{flexDirection:'row',marginTop:5,marginRight:20}}>
                   <MaterialIcons.Button  name="add"
                 size={20}
                 backgroundColor="#fff"
                  borderWidth={1}
                 color="#000"
                 paddingVertical={0}
                 paddingHorizontal={-2}
                 iconStyle={
                 {
                     borderWidth:1,
                     marginRight:-2
                 }
                 } 
                 onPress={()=>navigation.navigate('AddExpenses')}
                 />
             
                </View>             
      
            ),
          });
        }, [navigation]);
    return(
        <View style={styles.container}>
             <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideCalendar}
      />
   <FilterModalMsg visible={showFilter}>
    {options.map((res,index) => {
     return(
          <RadioBtn
          id={res.key}
          key={res.key}
          text={res.text}
          value={value}
          onPress={()=>{handleRadioBtn(res.key)}}/>
          );        
        })}
    </FilterModalMsg>
    <View>
        <View style={containerStyle.dateContainer}>
            <View style={{marginLeft:10}}>
            <Text style={textStyle.dateLabel}>Date of Report</Text>
            </View>
            <View backgroundColor={act === 1 ? "rgba(0, 0, 0, 1)" :"rgba(0, 0, 0, 0.0)"} style={{margin:5}}>
            <TouchableOpacity  style={buttonStyle.dateBtn}  onPress={()=>hideCalendar()}>
              <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                  <AntDesign name="calendar" size={25} color="black" margin={10} />
                  <Text style={textStyle.dateTxt}>{dates}</Text>
              </View>
            </TouchableOpacity>  
            </View>
       </View>
       <View style={containerStyle.dateContainer}>
            <View style={{marginLeft:10}}>
                  <Text style={textStyle.dateLabel}>Report</Text>
            </View>
            <View  backgroundColor={act === 2 ? "rgba(0, 0, 0, 1)" :"rgba(0, 0, 0, 0.0)"} style={{margin:5}}>
                 <DropDownBtn
                 text={value}
                 onPress={()=>{setShowFilter(true)}}/>
            </View>
       </View>
        </View>
      <View style={{flex:1,flexWrap:'wrap',marginVertical:10}}>
        <FlatList contentContainerStyle={{ width:screenWidth,borderWidth:1,borderTopWidth:0}} 
           data={expenses}
           keyExtractor={(item,index) => index}  
           onEndReachedThreshold={0.2}
           onEndReached={()=>onEnd()} 
           ListHeaderComponent={<FlatListHeader value="detail">
               <Text adjustsFontSizeToFit={true} style={textStyle.headerFlatListText}>value</Text>
               <Text adjustsFontSizeToFit={true} style={textStyle.headerFlatListText}> </Text>
               <Text adjustsFontSizeToFit={true} style={textStyle.headerFlatListText}> </Text>
               <Text adjustsFontSizeToFit={true} style={textStyle.headerFlatListText}> </Text>
               <Text adjustsFontSizeToFit={true} style={textStyle.headerFlatListText}>date</Text>
           </FlatListHeader>}
           ListHeaderComponentStyle={{ borderColor: '#000', borderBottomWidth:1}}
           stickyHeaderIndices={[0]}
           ItemSeparatorComponent = {SeperatorFlatlist}
           renderItem={({item, index}) =>                        
          <ExpensesContent
          item={item}/>
       }
       ListFooterComponent={() => {
        if (status === 'loading') {
          return (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          );
        } else {
          return null
        }
      }}
         />
           </View>
           <View style={containerStyle.summaryContainer}>
        <View style={containerStyle.innerSummary}>
      <View style={{
          flex:1,
          flexWrap:'wrap',
      }}>
      <Text style={textStyle.summaryLabel} >Total</Text>
      </View>
    <View style={{
        flex:1.2,
        flexWrap:'wrap',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-evenly',
    }}>
      <Text style={textStyle.headerFlatListText}>{total}</Text>
      
    </View>
  </View>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#FFF4F4",
        paddingTop:5,
    },
    
   

})

export default ExpensesScreen;