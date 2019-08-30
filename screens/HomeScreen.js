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
import Spinner from 'react-native-loading-spinner-overlay';



export default function HomeScreen(props) {
  const {navigate} = props.navigation;
  const [load,setLoad] = useState(true);
  const [listproject,setListproject]=useState([])

  

async function getProject(){
  let email = await SecureStore.getItemAsync('email');
  let name = await SecureStore.getItemAsync('name');
  
  const result = await axios(
    'https://project-tuan.herokuapp.com/project?email='+email,
  );
 //console.log(result.data)
  //console.log(email)
  setListproject(result.data)

}

async function deleteproject(idproject){
 
  const deleteproject = await axios(
    'https://project-tuan.herokuapp.com/project/deleteproject?id='+idproject,
  ).then(()=>{
    getProject()
  })
  const deleteMbproject = await axios(
    'https://project-tuan.herokuapp.com/project/deletemenberproject?idproject='+idproject,
  );
  const deletework = await axios(
    'https://project-tuan.herokuapp.com/work/deletework?idproject='+idproject,
  );
  const deleteworkmenber = await axios(
    'https://project-tuan.herokuapp.com/work/deletemenberwork?idproject='+idproject,
  );

}

  useEffect(() => {
  getProject().then(()=>{
    setLoad(false)
  })
  },[]);

  setTimeout(()=>{
    setLoad(false)
  },10000)
  return (
  
    <View style={{flex:1,backgroundColor:'#ccc'}}>
         <Spinner visible={load}
                   color='blue'>                  
                   </Spinner>
      <Flatlist listproject={listproject} deletefun={deleteproject}  pr={props} />
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











