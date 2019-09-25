import React,{useState,useEffect} from 'react';
import {Image, StyleSheet, Text,FlatList, View,Platform,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/Colors';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import url from './url'
export default function ContactScreen(props) {
  const[listworkmenber,setListworkmenber]=useState([])
  async function getWorkMenber(){

  let email = await SecureStore.getItemAsync('email');
 // let name = await SecureStore.getItemAsync('name');
  
  const result = await axios(
    url.url+'/work/getworkwithmenber?email='+email,
  );
 console.log(result.data)
  //console.log(email)
 setListworkmenber(result.data)


  }


useEffect(()=>{
getWorkMenber()
},[])



  return (
    <View style={styles.container}>

            <FlatList
          contentContainerStyle={{
        width:'100%'
        
          
        }}
      
          data={listworkmenber}
       
          renderItem={({item}) =>  <View style={{width:'100%'}}>
            <View  style={{marginVertical:1,width:'100%',backgroundColor:'#fff'}}>
              <TouchableOpacity onPress={()=>{
                props.navigation.navigate('WorkDetail')
              }} style={{width:'100%',alignItems:'center'}}>
              <Text style={{color:'blue',fontSize:16}}>ID {item._id}</Text>
              <Text style={{color:'red',fontSize:16}}>Tên {item.name}</Text>
               <Text style={{fontSize:16}}> Thuộc dự án {item.idproject}</Text>
              </TouchableOpacity>
        
              
            </View>

              </View>
          }
          keyExtractor={item => item.id}
        />
    </View>
  );
}

ContactScreen.navigationOptions = props=>{
  return{
  header:(
    <View style={styles.header}>
        <Ionicons onPress={()=>{props.navigation.openDrawer()}} color={'white'} size={35} name={Platform.OS=='ios'?'ios-menu':'md-menu'}/>
        <Text style={{fontSize:20,marginTop:5,color:'white',}}>Công việc của tôi</Text>
        <Ionicons style={{marginTop:5}} size={30} color={'white'} name={Platform.OS=='ios'?'ios-search':'md-search'}/>
    </View>
  ),
}};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCC',
  },
  header:{
    justifyContent:"space-between",
    flexDirection:"row",
    backgroundColor:colors.tintColor,
    paddingVertical:10,
    paddingHorizontal:20,
  },
});
