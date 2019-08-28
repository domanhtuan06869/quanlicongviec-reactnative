import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View,Alert, TextInput,SafeAreaView, Platform,Button ,Image,TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import *as firebase from 'firebase'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';


export default function Login() {
const [username,setUserName]=useState()
const [password,setPassWord]=useState()
const [load,setLoad] = useState(false);  
      // APi firebase
      async function  _save  (email,name) {
        await SecureStore.setItemAsync('email', email);
        await SecureStore.setItemAsync('name', name);
       
      };
      async function  getUser() {
        const result = await axios(
          'https://project-tuan.herokuapp.com/users?email='+username,
        );
       var key=result.data;
      
       _save(key.email,key.name)

      }
    async function login() {
      
          setLoad(true)
    
           firebase
          .auth()
          .signInWithEmailAndPassword(username, password)
          .then(() => props.navigation.navigate('Main'),
          createuser(),setLoad(false)
          )
          .catch(()=>alert('hgf'))
      
         
        }
  async   function createuser(){
      let details = {
        email:username,

 
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  fetch('https://project-tuan.herokuapp.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: formBody,
  }).then((response) => response.text())
   .then((responseData) => {
 getUser()
  })
   .catch((err) => { console.log(err); });

}
     


    return (
<SafeAreaView style={styles.layout}>

         < KeyboardAvoidingView behavior='padding' style={styles.layout}>
         <Spinner visible={load}
                   color='blue'>                  
                   </Spinner>
            <View style={styles.layout}>
              <Text style={{
                fontSize: 50, fontWeight: 'bold', textAlign: 'center', marginTop:Platform.OS==='ios'?40: 25, color: 'white', textShadowColor: 'rgba(255, 255, 255, 1)',
                textShadowOffset: { width: 2, height: 1 }, textShadowRadius: 5
              }}>WELCOME</Text>
              
         
        
      
                  {/*nhap du lieu dang nhap*/}
              <View style={styles.textinput}>
                <TextInput style={styles.text}  onChangeText={(user) => setUserName(user.toLocaleLowerCase())} placeholder='Email'></TextInput>
                <TextInput style={styles.text} 	secureTextEntry={true} onChangeText={(password) => setPassWord( password )} placeholder='Mật khẩu'></TextInput>
          
              </View>
             
              {/*dang nhap*/}
              <Text style={{ backgroundColor: '#058CDB',color:'#fff', width: 200, height: 40, textAlign: 'center', borderRadius:10, paddingTop: 10,marginTop:30, }}
                onPress={()=>
                  login()
                }>Đăng nhập</Text>
      
              <View style={styles.chuacotk}>
                <Text style={{color:'#ffff'}}>Chưa có tài khoản ?</Text>
      
                {/*chuyển đăng kí*/}
                <Text style={styles.dk} onPress={() => navigate('Dangki')} >Đăng kí</Text>
              </View>
      
            </View>
           </KeyboardAvoidingView>
      
            </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor: '#33B2FC',
      alignItems: 'center',
      justifyContent: 'center'
  
  
    },
    text: {
      marginTop:20,
      paddingLeft: 10,
      borderRadius: 10,
      backgroundColor: '#ffff',
      height: 40,
      margin: 7,
      width: 300,
    },
  
    chuacotk: {
  
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: 5,
    },
    dk: {
      marginLeft: 10,
      color: 'blue'
  
    },
    textinput: {
    marginTop:Platform.OS==='ios'?130:80,
   
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  
  
  });