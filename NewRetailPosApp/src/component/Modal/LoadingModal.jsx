import React, { useEffect } from 'react'
import { View,Modal,Text,Alert,Button,StyleSheet,Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const LoadingModal = ({visible}) =>{
//ios-checkmark-outline
    return(
        <Modal
        animationType="slide"
        transparent={true}
           backdropOpacity= {1}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}  
      >
            <View style = {styles.modal}>  
            <ActivityIndicator size="large" color="#0000ff" />
          </View>  
        </Modal>
    )
}

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    alignItems: 'center',  
    justifyContent: 'center',  
    backgroundColor: '#ecf0f1',  
  },  
  modal: {  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
   
   },  
   modalInner: {
    flex:0.5,
    borderRadius:24,
   height: 310,
   width: 310,
   alignContent:'center',
   backgroundColor: '#FFF',
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
  },
   text: {  
      color: '#3f2949',  
      marginTop: 10  
   }  
});  


export default LoadingModal;