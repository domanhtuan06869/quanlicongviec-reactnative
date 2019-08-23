

import React,{useEffect,useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,FlatList, RefreshControl,TouchableOpacity

} from 'react-native';



export default function FlastlistProject(props)  {
  const obj={"1":9,"2":8,"3":7,"4":6,"5":5,"6":4,"7":3,"8":2,"9":1,"10":0,"12":5};
  
          return(
            <View >
                <FlatList 
                style={{width:'100%'}}
       contentContainerStyle={{ }}

       // data={Object.values(obj)}
       data={props.listproject}
         renderItem={({item}) =>
         <View style={{backgroundColor:'#fff',marginTop:10}}>
      
           <View style={{flexDirection:'column'}}>
             <TouchableOpacity onPress={()=>{
               props.pr.navigation.navigate('ProjectDetail',{id:item._id,nameproject:item.name})}
             }>
           <Text>Dự án {item.name}</Text>
           <Text style={{}}>mã dự án :{item._id}</Text>
           <Text style={{}}>Trạng thái :{item.status}</Text>
           <Text style={{}}>ngày bắt đầu :{item.starttime}</Text>
           <Text style={{}}>ngày ket thuc:{item.endday}-{item.endmonth}</Text>
           </TouchableOpacity>
           <View style={{height:0.3,backgroundColor:'gray'}}></View>
           </View>
      
     </View>
                }
    keyExtractor={item => item._id}
    />
              
          </View>
          );

}


