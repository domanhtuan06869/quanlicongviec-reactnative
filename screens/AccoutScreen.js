import React from 'react';
import {Image, StyleSheet, Text, View,Platform, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/Colors';
import url from './url'
export default function AccoutScreen(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatar}>
          <Image source={{uri:'https://i.pravatar.cc/300?5559'}} style={{width:75,height:75,borderRadius:Platform.OS==='ios'?37:75,marginRight:10}}/>
          <View style={{marginTop:10,}}>
            <Text style={styles.welcome_tit}>Welcome to Dust Scan</Text>
            <Text style={styles.welcome_text}>Hello A.Jensen</Text>
          </View>
      </TouchableOpacity>
      <View style={{paddingVertical:20,}}>
        <Text style={{fontSize:18,fontWeight:"bold",marginBottom:20,}}>Thông Tin Cơ Bản</Text>
        <View>
          <Text style={styles.info_user}><Text style={{fontWeight:"bold"}}>User Name:</Text> A.Jensen</Text>
          <Text style={styles.info_user}><Text style={{fontWeight:"bold"}}>Email:</Text> Jensen2482@gmail.com</Text>
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
        <Ionicons style={{marginTop:5}} size={30} color={'white'} name={Platform.OS=='ios'?'ios-search':'md-add'}/>
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
