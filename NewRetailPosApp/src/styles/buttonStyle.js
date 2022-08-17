import { StyleSheet,Dimensions } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
var buttonStyle = StyleSheet.create({

  btn: {
    padding: 10,
    borderWidth: 1
  },

  catBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    borderWidth:1,
  },
//Detail
  variationBtn:{
    margin:5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    width:80,
    height:30,
    backgroundColor: '#FFFFFF',
    borderWidth:1,
  },

  buttonActive: {
    margin:5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,

    width:80,
    height:30,
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
    borderWidth:1,
  },

  addBtn:{
    padding:3,
    paddingHorizontal:15,
    borderWidth:1,
    borderLeftWidth:0
  },

  minusBtn:{
    padding:3,
    paddingHorizontal:15 ,
    borderWidth:1,
    borderRightWidth:0
  },

  footerBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    width:screenWidth/2,
     height:45,
    borderLeftWidth:1,
  },

  dateBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth:1.5,
    margin:5,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 5,
    
    elevation: 8,
  },
  
  cartFooterBtn:{
       alignItems: 'center',
          justifyContent: 'center',
          width:screenWidth/2.5,
          borderLeftWidth:1,
          backgroundColor:'#000',

  },

  defBtn:{
    borderWidth:1.5,
    backgroundColor:'rgba(0,0,0,0)',
  }
});

export default buttonStyle;