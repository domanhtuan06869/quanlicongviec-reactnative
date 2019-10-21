import React,{useEffect,useState} from 'react';
import {Image, StyleSheet, Text, View,Platform, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/Colors';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import url from './url'
import axios from 'axios';
export default function AccoutScreen() {
const [image,setImage]=useState('')
const [email,setEmail]=useState('')
   

async function getuser(){
  let email = await SecureStore.getItemAsync('email');
  
  const result = await axios(
 url.url+'/users/getuseravatar?email='+email
  );

  setImage(result.data.avatar)
  setEmail(result.data.email)
}
async function getPermissionAsync (){
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
 async function _pickImage () {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64:true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
     setImage('data:image/jpg;base64,'+ result.base64);
     let email = await SecureStore.getItemAsync('email');
     const postData = {                                
      email:email,
      avatar:'data:image/jpg;base64,'+ result.base64
  
       };
     //  console.log(postData)
    let axiosConfig = {
      headers: {
        'Content-Type' : 'application/json; charset=UTF-8',
  
      }
    };
    
   axios({
           method: 'post',
          url:  url.url+'/users/updateavatar' ,
          headers: axiosConfig,
          data: postData
      })
      .then((res) => {
    
        if(res.data.originalError){
          console.log(res.data.originalError)
      
            Alert.alert('Có lỗi kiểm tra lại')
           
        }else{
          getuser()
        }
   
      }).catch(err=>{
        console.log(err)
      })
    }
   
  };

useEffect(()=>{
getPermissionAsync()
getuser()
},[])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{
        _pickImage()
      }} style={styles.avatar}>
          <Image source={{uri:image}} style={{width:75,height:75,borderRadius:Platform.OS==='ios'?'35%':20,marginRight:10}}/>
          <View style={{marginTop:10,}}>
            <Text style={styles.welcome_tit}>Welcome to Dust Scan</Text>
            <Text style={styles.welcome_text}>Hello A.Jensen</Text>
          </View>
      </TouchableOpacity>
      <View style={{paddingVertical:20,}}>
        <Text style={{fontSize:18,fontWeight:"bold",marginBottom:20,}}>Thông Tin Cơ Bản</Text>
        <View>
          <Text style={styles.info_user}><Text style={{fontWeight:"bold"}}>User Name:</Text> A.Jensen</Text>
          <Text style={styles.info_user}><Text style={{fontWeight:"bold"}}>Email:</Text> {email}</Text>
          <Text style={styles.info_user}><Text style={{fontWeight:"bold"}}>Address:</Text> 88 Cummings Vista Apt.101, Susanbury</Text>
          <Text style={[styles.info_user,{borderBottomColor:'transparent'}]}><Text style={{fontWeight:"bold"}}>Phone No:</Text> (+22)3504968705</Text>
        </View>
        <TouchableOpacity style={styles.edit_button}><Text style={{fontSize:15,color:'white'}}>Edit your info</Text></TouchableOpacity>
      </View>
    </View>
  );
}

AccoutScreen.navigationOptions = props=>{
  return{
  header:(
    <View style={styles.header}>
        <Ionicons onPress={()=>{props.navigation.openDrawer()}} color={'white'} size={35} name={Platform.OS=='ios'?'ios-menu':'md-menu'}/>
        <Text style={{fontSize:20,marginTop:5,color:'white',}}>ACCOUT</Text>
        <Ionicons style={{marginTop:5}} size={30} color={'white'} name={Platform.OS=='ios'?'ios-search':'md-search'}/>
    </View>
  ),
}};

const styles = StyleSheet.create({
  edit_button:{
    backgroundColor:colors.tintColor,
    width:"100%",
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:15,
  },
  info_user:{
    lineHeight:50,
    borderBottomColor: '#ccc',
    borderTopColor: '#ccc',
    borderWidth:1,
    borderRightColor:'transparent',
    borderLeftColor:'transparent',
    marginTop:10,
    paddingLeft:5,
  },
  welcome_tit:{
    color:colors.tintColor,
    fontSize:17,
  },
  avatar:{
    width:'100%',
    shadowOffset:{
      width: 20,
      height: 20,
    },
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 1,
    backgroundColor:'white',
    flexDirection:"row",
    padding:25
  },
  container: {
    flex: 1,
    padding:12,
    backgroundColor: '#fff',
  },
  header:{
    justifyContent:"space-between",
    flexDirection:"row",
    backgroundColor:colors.tintColor,
    paddingVertical:10,
    paddingHorizontal:20,
  },
});