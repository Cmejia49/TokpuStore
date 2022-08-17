import React from 'react'
import { View,Modal,Text,Alert,Button,StyleSheet,Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
const FilterModalMsg = (props) =>{


    return(
        <Modal
        animationType="slide"
        transparent={true}
           backdropOpacity= {1}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}  
      >

        <View style = {styles.modal}>  
            <View style={styles.modalInner}>
              <View>
              {props.children}       
              </View>

          
            </View>   
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
    justifyContent:'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
   
   },  
   modalInner: {
       flex:0.5,
       padding:16,
     borderRadius:24,
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


export default FilterModalMsg;