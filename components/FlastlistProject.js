

import React,{useEffect,useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,Alert,
  View,FlatList,Button, TextInput,RefreshControl,TouchableOpacity

} from 'react-native';
import icon from '../config/Iconitem'
import Modal from "react-native-modal";
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
import { Dimensions } from 'react-native';
import TagInput from 'react-native-tag-input';
export default function FlastlistProject(props)  {

  const [id,setId]=useState('')

          return(
            <View  style={{flex:1}}>
                
                  <SwipeableFlatList
        
        data={props.listproject}
        renderItem={({ item }) => (
          <View  style={{backgroundColor:'#fff',marginTop:1 ,minHeight:139,flexDirection:'row'}}>
   
          <View style={{flexDirection:'column',marginLeft:10,width:'97%'}}>
            <TouchableOpacity onPress={()=>{
              props.pr.navigation.navigate('ProjectDetail',{id:item.id,nameproject:item.tenduan})}
            }>
          <Text style={styles.textname}>Dự án {Platform.OS==='android'? item.tenduan.slice(0, 18): item.tenduan.slice(0, 25)}..</Text>
          <Text style={{height:20}}>ID :{item.id}</Text>


          <View style={{flexDirection:'row',alignItems:'center',alignItems:'center',marginVertical:3}}>
            <Image source={{uri:icon.statusItem}}   style={{width:24,height:24}}></Image>
          <Text style={{marginLeft:3,padding:4}}>Trạng thái :{item.trangthai}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',alignItems:'center',marginVertical:3}}>
            <Image source={{uri:icon.timeItem}}   style={{width:25,height:25}}></Image>
          <Text style={{marginLeft:3,padding:3}}>Kết thúc:{new Date(item.thoigianend).toLocaleDateString()}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',alignItems:'center',marginVertical:3}}>
            <Image source={{uri:icon.descriptionItem}}   style={{width:23,height:23}}></Image>
          <Text style={{marginLeft:3,padding:3}}>Mô tả {item.mota.slice(0, 25)}...</Text>
          </View>
        
          
          </TouchableOpacity>
        
       
          </View>
          <View style={{width:'3%',marginRight:4,height:'100%',backgroundColor:'#5AC2FE',flexDirection:'column',alignItems:'center'}}>
            
            {/*<TouchableOpacity style={{marginTop:20}}>
              <Image source={{uri:icon.star}} style={{width:25,height:25}}></Image>
            </TouchableOpacity>
            
            <TouchableOpacity style={{marginTop:'90%'}}>
              <Image source={{uri:icon.error}}  style={{width:25,height:25}}></Image>
          </TouchableOpacity>*/}
          </View>
    </View>
        )}
     
    
      renderRight={({ item }) => (
        <View  style={{ width: 130,height:139 ,flexDirection:'row',backgroundColor:'#fff',marginTop:1,justifyContent:'center',alignItems:'center'}}>
           <TouchableOpacity  onPress={()=> {
            props.pr.navigation.navigate('EditProject',{ name:item.tenduan,id:item.id,description:item.mota,desire:item.mongmuon,company:item.congty,starttime:item.thoigianstart,endtime:item.thoigianend,status:item.trangthai})
           }
           } style={styles.btnopacity1}>
            <Image style={{width:25,height:25,marginLeft:3}} source={{uri:icon.editItem}}></Image>
           </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ 
            Alert.alert(
              '',
              'bạn muốn xóa không ?',
              [
                  
                  {
                      text: 'Cancel',
                      style: 'cancel',
                  }, {
                      text: 'OK',
                      onPress: () =>  {  props.deletefun(item.id)
                      }
                  }
              ]
            )
            
            /*props.deletefun(item._id)*/}
             
          }  style={styles.btnopacity}>
            <Image style={{width:25,height:25}} source={{uri:icon.deleteitem}}></Image>
           </TouchableOpacity>
           </View>
        )}
        keyExtractor={item => item.id}
        itemBackgroundColor={'#ccc'}
        backgroundColor={'#ccc'}
       

   
    />
              
              
          </View>
          );


}
const styles = StyleSheet.create({
btnopacity:{
  marginLeft:20,marginTop:5,width:35,height:35 ,borderRadius:17,backgroundColor:'#ccc',alignItems:'center',justifyContent:'center'
},
btnopacity1:{
  marginTop:5,width:35,height:35 ,borderRadius:17,backgroundColor:'#ccc',alignItems:'center',justifyContent:'center'
},textname:{
  color:'#FF0000',fontWeight:'bold',fontSize:16
}
});



