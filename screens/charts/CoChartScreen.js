import React,{useState,useEffect} from 'react';
import {Image, StyleSheet, Text, View,Platform,WebView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/Colors';
export default function DustChartScreen(props) {

  return (
    <View style={{flex:1,padding:10,}}>
      <Text>Today statistics</Text>
      <WebView source={{uri:'http://52.221.226.126/chart/hour/co/1'}}/>
      <Text>This month statistics</Text>
      <WebView source={{uri:'http://52.221.226.126/chart/day/co/1'}}/>
    </View>
  );
}

DustChartScreen.navigationOptions = props=>{
  return{
  header:(
    <View style={styles.header}>
        <Ionicons onPress={()=>{props.navigation.openDrawer()}} color={'white'} size={35} name={Platform.OS=='ios'?'ios-menu':'md-menu'}/>
        <Text style={{fontSize:20,marginTop:5,color:'white',}}>CO Chart</Text>
        <Ionicons style={{marginTop:5}} size={30} color={'white'} name={Platform.OS=='ios'?'ios-search':'md-search'}/>
    </View>
  ),
}};

const styles = StyleSheet.create({
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
