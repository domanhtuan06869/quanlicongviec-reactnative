import React from 'react';
import {Image, StyleSheet, Text, View,Platform,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/Colors';
import icon from './Iconitem'
export default function AboutScreen(props) {
  return (
    <View style={styles.container}>
      <View style={[styles.list_admin]}>
        <TouchableOpacity style={[styles.admin]}>
          <Image source={{uri:icon.anh}} style={{width:90,height:90,borderRadius:30,marginRight:15}}/>
          <View>
            <Text>Name: Đỗ Mạnh Tuân</Text>
            <Text>Age: 22</Text>
            <Text>Phone: 0353003430</Text>
          </View>
        </TouchableOpacity>
      
      </View>
      <View style={{alignItems:"center"}}>
        <Text style={[styles.text_about,{fontWeight:"bold",color:colors.tintColor}]}>Version: 1.0.0</Text>
        <Text style={[styles.text_about]}>Copyright © 2019  Team</Text>
        <Text style={[styles.text_about]}>Email: Tuan@gmail.com</Text>
      </View>
    </View>
  );
}

AboutScreen.navigationOptions = props=>{
  return{
  header:(
    <View style={styles.header}>
        <Ionicons onPress={()=>{props.navigation.openDrawer()}} color={'white'} size={35} name={Platform.OS=='ios'?'ios-menu':'md-menu'}/>
        <Text style={{fontSize:20,marginTop:5,color:'white',}}>ABOUT US</Text>
        <Ionicons style={{marginTop:5}} size={30} color={'white'} name={Platform.OS=='ios'?'ios-search':'md-search'}/>
    </View>
  ),
}};

const styles = StyleSheet.create({
  admin:{
    shadowOffset:{
      width: 10,
      height: 10,
    },
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 1,
    backgroundColor:'white',
    padding:10,
    flexDirection:'row',
    marginBottom:10,
  },
  text_about:{
    lineHeight:40,
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
