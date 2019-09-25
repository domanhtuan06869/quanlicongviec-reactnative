import React,{useEffect} from 'react';
import {Image, StyleSheet, Text, View,Platform, ActivityIndicator,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/Colors';
import * as firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';
export default function TabChartSceen(props) {
  async function logout() {
    await SecureStore.setItemAsync('email', 'null');
    await SecureStore.setItemAsync('name', 'null');
    let email= await SecureStore.getItemAsync('email');
    if(email=='null'){
      props.navigation.navigate('Login')
    }
  }
useEffect(()=>{
logout()

})

  return (
    <View style={styles.container}>
   <ActivityIndicator size="large" color={colors.tintColor} />
    </View>
  );
}

TabChartSceen.navigationOptions = props=>{
  return{
  header:(
    <View style={styles.header}>
        <Ionicons onPress={()=>{props.navigation.openDrawer()}} color={'white'} size={35} name={Platform.OS=='ios'?'ios-menu':'md-menu'}/>
        <Text style={{fontSize:20,marginTop:5,color:'white',}}>Logout</Text>
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
