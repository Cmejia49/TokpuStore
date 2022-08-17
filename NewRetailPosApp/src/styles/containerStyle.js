import { StyleSheet,Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
var containerStyle = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#F0F0F0",
        paddingTop:5,
     
    },
    //Header
    headerContainer:{
        flexDirection:'row'
    },
    fadingContainer: {
        flexDirection:'row',
      },
      //Main Menu
    catContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5
     
    },
    ProductContainer:{
        flex:1.5,
        justifyContent: "space-between",
        backgroundColor: "#F0F0F0",
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center',
    },
    cardContainer:{
        width:screenWidth/2.1,
        height:screenHeight/3,
        borderRadius:6,
        backgroundColor:"#FFFFFF",
        marginTop:10,
        margin:5,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height:4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },

    cardImgContainer:{
        borderRadius:6,
        borderWidth:1,
        backgroundColor:'#fff',
    },

    cardInfoContainer:{
        justifyContent: "space-between",
        padding:5,
        marginTop:5,
    },
    //End main menu

    //Detail 
    detailContainer:{
        flex:1,
        justifyContent:'space-evenly',
        alignContent:'space-between',
        margin:2,
        backgroundColor:'#FFFFFF',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height:4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4, 
    },

    footerContainer:{
        flex:0,
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'flex-end',
    },
    //MultiPurpose Flatlist
    flHeaderContainer:{
        flex:1,
        flexWrap:'wrap',
      borderTopWidth:1,
      height: 45,
      width: "100%",
      backgroundColor: "#FFF",
      alignItems: 'center',
      flexDirection:'row',
      alignContent:'center',
      justifyContent:'space-between'
    },

    flContentContainer:{
        flex:1,
        flexWrap:'wrap',
        height: screenHeight/10,
        width: "100%",
        backgroundColor: "#FFF",
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
    },

    summaryContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#FFFFFF',
        margin:5,
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height:4,
        },
        shadowOpacity: 0.30,
        shadowRadius:4 ,
        elevation:8,
    },

    innerSummary:{
        flex:1,
        flexWrap:'wrap',
      marginLeft:5,
      height: 45,
      width: "100%",
      backgroundColor: "#FFF",
      alignItems: 'center',
      flexDirection:'row',
      justifyContent:'space-between',
      alignContent:'center',
    },

    //Cart 
    cartCardContainer: {
        flexDirection:'row',
        width:screenWidth/1.1,
        height:screenHeight/4,
        borderRadius:6,
        backgroundColor:"#FFFFFF",
        marginTop:15,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height:4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        elevation: 4,
        
    },

    carCardInfoContainer:{
        //borderWidth:1,
        justifyContent: "space-between",
        padding:5,
        marginTop:5,
    },

    //DateContainer multi Purpose
    dateContainer:{
        flex:0,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#FFFFFF',
        margin:5,
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height:4,
        },
        shadowOpacity: 0.30,
        shadowRadius:4 ,
        elevation:5,
    },
    cartFooterContainer:{
        flex:0,
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1.5,
        shadowColor: "#000",
           shadowOffset: {
               width: 4,
               height:4,
           },
           shadowOpacity:1,
           shadowRadius:4,
           elevation:5, 
       },
 
       bottomBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        width:screenWidth/2.5,
        borderLeftWidth:1,

    },

    //MultiPurpos Middle Container
    middleContainer:{
        flex:3,
        justifyContent:'space-between',
        marginTop:10,
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
});

export default containerStyle;