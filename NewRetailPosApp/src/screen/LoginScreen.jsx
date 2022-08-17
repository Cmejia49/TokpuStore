import * as React from 'react';
import {StyleSheet,Text,View,TextInput,
         TouchableOpacity,StatusBar, Button} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from 'react-redux';
import { getId, getStatus, getToken, loginReq } from '../store/auth-slice';
const LoginScreen = ()=>{
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    const id = useSelector(getId)
    const status = useSelector(getStatus);
    const [name,setName] = React.useState("");
    const [pass, setPass] = React.useState("");

    React.useEffect(()=>{

    },[])
  const handleLogin = async()=>{
    const req = {
        Username:name,
        Password:pass
    }

    dispatch(loginReq(req));

  }
    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username."
              placeholderTextColor="#000"
              onChangeText={(e) => setName(e)}
            />
          </View>
     
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(e) => setPass(e)}
            />
          </View>
     
      {status.loginStatus === "failed" ? (<Text>Check Credential or Try Again Later</Text>):(<>
      </>)}
          <TouchableOpacity onPress={()=>handleLogin()} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      );
}

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
   
    image: {
      marginBottom: 40,
    },
   
    inputView: {
      backgroundColor: "#fff",
      borderWidth:1.5,
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
   
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#000",
    },

    loginText:{
      color:"#fff"
    }
  });

  export default LoginScreen;