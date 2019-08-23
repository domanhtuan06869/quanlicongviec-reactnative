import React,{useEffect} from 'react';
import {Image, StyleSheet, Text, View,Platform,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import *as firebase from 'firebase'

export default function Loading(props) {
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user => {
            props.navigation.navigate(user ? 'Main' : 'Login')
          })
      })
      return (
        <View style={styles.container}>
            <Text>load</Text>
        </View>
      );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:12,
    backgroundColor: '#fff',
  },
  header:{
    justifyContent:"space-between",
    flexDirection:"row",
    backgroundColor:'#fff',
    paddingVertical:10,
    paddingHorizontal:20,
  },
});
