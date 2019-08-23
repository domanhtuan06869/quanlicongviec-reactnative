import React,{useState,useEffect} from 'react';
import colors from '../constants/Colors';
import MapWeb from '../components/MapWeb';
import HeaderBar from '../components/HeaderBar';
import {Image,Button, StyleSheet, TouchableOpacity, Text, View, Alert, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AnimateNumber from 'react-native-countup';
import * as firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';
import Flatlist from '../components/FlastlistProject'
import axios from 'axios';



export default function HomeScreen(props) {
  const {navigate} = props.navigation;
  const [loading,setLoading] = useState(true);
  const [listproject,setListproject]=useState()

  

async function getProject(){
  let email = await SecureStore.getItemAsync('email');
  let name = await SecureStore.getItemAsync('name');
  
  const result = await axios(
    'http://192.168.1.8:3000/project?email='+email,
  );
 //console.log(result.data)
  //console.log(email)
  setListproject(result.data)

}  
  useEffect(() => {
  getProject()
  },[]);

  return (
  
    <View style={{flex:1,backgroundColor:'#ccc'}}>
      <Flatlist listproject={listproject}  pr={props}/>
    </View>
  );
}
HomeScreen.navigationOptions = props=>{

  return{
 
  header:(
    <HeaderBar onPress={()=>{props.navigation.openDrawer()
    }} on={()=>{
       props.navigation.navigate('Addproject')
    }}/>
  ),
  
  
}};

const styles = StyleSheet.create({

});











