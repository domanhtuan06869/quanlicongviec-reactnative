import React,{useEffect} from 'react';
import {Image, StyleSheet, Text, ActivityIndicator, View,Platform,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import *as firebase from 'firebase'
import * as SecureStore from 'expo-secure-store';

export default function Loading(props) {
  async function load() {
   let email= await SecureStore.getItemAsync('email');
  
    props.navigation.navigate(email==='null' ? 'Login' : 'Main')
   
  }
    useEffect(()=>{
        
        load()   
        
      })
      return (
        <View style={styles.container}>
        <Text style={{color:'#ffffff'}}>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
      );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5BC0FB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header:{
    justifyContent:"space-between",
    flexDirection:"row",
    backgroundColor:'#fff',
    paddingVertical:10,
    paddingHorizontal:20,
  },
});
