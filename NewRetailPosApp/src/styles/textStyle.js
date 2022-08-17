import { StyleSheet } from 'react-native';


var textStyle = StyleSheet.create({
  text: {
    padding: 10,
    borderWidth: 1
  },

  titleTxt:{
    fontWeight:'bold',
    fontSize:24,
    alignContent:'center'
  },

  catText:{
    fontSize: 16,
    lineHeight: 21,
    fontFamily:'Roboto',
    fontStyle:'normal',
    color: '#000',
  },

  itemNameTxt:{               
    fontFamily:'serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 23,
   
},

itemPriceTxt:{ 
     marginTop:5,            
    fontFamily:'serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 18,
   
},
//Details
detailNameTxt:{
  fontFamily:'serif',
  fontSize:32,
  lineHeight:46,
  fontWeight:'400',
  fontStyle:'normal',
  marginHorizontal:5,
},

detailPriceTxt:{
  fontFamily:'serif',
  fontSize:18,
  lineHeight:24,
  fontWeight:'400',
  fontStyle:'normal',
  padding:5,
  marginRight:10
},

//Sale 

dateTxt:{
   fontWeight:'bold',
   fontSize:18,
   fontFamily:'Roboto', 
   marginLeft:10, 
   lineHeight:17
},

flatlistTxt:{
  color:'#000',
  fontSize:19,
  fontFamily:'Roboto',
  fontWeight:'bold',
  fontWeight:'400',

},

headerFlatListText:{
  color:'#000',
  fontSize:14,
  lineHeight:17,
  fontFamily:'Roboto',
  fontWeight:'bold',
  fontWeight:'400',

},
summaryTxt:{
  fontSize: 12,
        color:"#000",
        fontFamily:'Roboto',
        fontWeight:'700',
        lineHeight:22,
},

summaryLabel:{
    fontSize: 18,
          color:"#000",
          fontFamily:'Roboto',
          fontWeight:'700',
          lineHeight:22,
},

//cart
footerTxtWhite:{
    fontSize:24,
              fontWeight:'400',
              fontFamily:'serif',
              lineHeight:32,
              fontStyle:'normal',
              margin:10,
              color:'#FFF'
  },
  footerTxtBlack:{
    fontSize:24,
              fontWeight:'400',
              fontFamily:'serif',
              lineHeight:32,
              fontStyle:'normal',
              margin:10,
              color:'#000'
  },

//Multipuropose Filter Date Selection

dateLabel:{
  margin:5,
  fontFamily:'Roboto',
  fontSize:16, 
  fontWeight:'bold'
},

defTxt:{
  fontFamily:'Roboto',
  fontSize:18,
  lineHeight:46,
  fontWeight:'400',
  fontStyle:'normal',
  lineHeight:21,
  marginHorizontal:5,
  padding:5
},
//Multipurpose Button Text
 
 buttonTxT:{

    textAlign:'center',
    fontFamily:'Roboto',
    fontWeight:'300',
    fontStyle:'normal',
    fontSize:24,
    lineHeight:28,
    padding:10
 },

 detailTxt:{
  margin:5,
  marginVertical:10,
  fontSize: 24,
  lineHeight: 28,
  fontFamily:'Roboto',
  fontStyle:'normal',
  color: '#000',
  fontWeight:'700',
},
});


export default textStyle;