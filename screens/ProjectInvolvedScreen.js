import React,{useState,useEffect} from 'react';

import {Image,Button, StyleSheet, TouchableOpacity,Platform, Text,FlatList, View, Alert, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AnimateNumber from 'react-native-countup';
import * as firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import icon from '../config/Iconitem'
import url from './url'

export default function ProjectInvoled(props) {
  const {navigate} = props.navigation;
  const [loading,setLoading] = useState(true);
  const [listproject,setListproject]=useState([])


  

async function getProject(){
  let email = await SecureStore.getItemAsync('email');
  let name = await SecureStore.getItemAsync('name');
  
  const result = await axios(
    url.url+'/project/getprojectlienquan?email='+email,
  );
 console.log(result.data)
  console.log(email)
 // setListproject(result.data)
 setListproject(result.data)
  

}  
async function deleteprojectInvolved(idproject){
  let email = await SecureStore.getItemAsync('email');
  let name = await SecureStore.getItemAsync('name');
  const update = await axios(
    'https://project-tuan.herokuapp.com/project/deletemenberproject?idproject='+idproject+'&email='+email,
  );
  

}  


  useEffect(() => {
    getProject()

  },[]);
function searchFor(toSearch,objects) {
  var results = [];
  toSearch = trimString(toSearch); // trim it
  for(var i=0; i<objects.length; i++) {
    for(var key in objects[i]) {
      if(objects[i][key].indexOf(toSearch)!=-1) {
        if(!itemExists(results, objects[i])) results.push(objects[i]);
      }
    }
  }
  return results;
}

function trimString(s) {
  var l=0, r=s.length -1;
  while(l < s.length && s[l] == ' ') l++;
  while(r > l && s[r] == ' ') r-=1;
  return s.substring(l, r+1);
}

function compareObjects(o1, o2) {
  var k = '';
  for(k in o1) if(o1[k] != o2[k]) return false;
  for(k in o2) if(o1[k] != o2[k]) return false;
  return true;
}

function itemExists(haystack, needle) {
  for(var i=0; i<haystack.length; i++) if(compareObjects(haystack[i], needle)) return true;
  return false;
}

function toSreenDetail(id){
props.navigation.navigate('ProjectDetail',{id:id})
}


  return (
  
    <View style={{flex:1}}>
    <SwipeableFlatList
        
            data={listproject}
            renderItem={({ item }) => (
              <View style={{backgroundColor:'#fff',marginTop:1,height: 68}}>
                <TouchableOpacity style={{height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}} onPress={()=>{
                  toSreenDetail(item.id)
                }}
                
                >
                <Text style={{backgroundColor:'#fff',fontSize:17,color:'red',fontWeight:'bold'}}>Dự án {item.tenduan}</Text>
                <Text style={{backgroundColor:'#fff',fontSize:17}}>ID {item.id}</Text>
                </TouchableOpacity>
                </View>
            )}
         
        
            renderRight={({ item }) => (
            <View  style={{ width: 70 ,height:68,flexDirection:'row',marginTop:1,alignItems:'center'}}>
               <TouchableOpacity onPress={()=>{
                      deleteprojectInvolved(item.id).then(()=>{
                        getProject()
                      })
               }} style={{marginLeft:10}}>
                 <Image style={{width:25,height:25}} source={{uri:icon.deleteitem}}></Image>
               </TouchableOpacity>
               </View>
            )}
            keyExtractor={item => item.id}
            itemBackgroundColor={'#ccc'}
            backgroundColor={'#ccc'}
       
        />
        <View style={{backgroundColor:'gray',height:2}}/>
  </View>
  );
}

ProjectInvoled.navigationOptions = props=>{

  return{
 
    header:(
      <View style={{  justifyContent:"space-between",
      flexDirection:"row",
      backgroundColor:'#2f95dc',
      paddingVertical:10, 
      paddingHorizontal:20,}}>
          <Ionicons onPress={()=>{props.navigation.openDrawer()}} color={'white'} size={Platform.OS==='ios'?40:35} name={Platform.OS=='ios'?'ios-menu':'md-menu'}/>
          <Text style={{fontSize:20,marginTop:5,color:'white',}}>Dự án liên quan</Text>
          <Ionicons style={{marginTop:5}} size={30} color={'white'} name={Platform.OS=='ios'?'ios-search':'md-search'}/>
      </View>
    ),
  
  
}};

const styles = StyleSheet.create({
  
});

