import React from 'react';
import {Image, StyleSheet, Text,FlatList, View,Platform,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/Colors';
export default function ContactScreen(props) {
  return (
    <View style={styles.container}>
            <FlatList
          contentContainerStyle={{
        width:'100%'
        
          
        }}
      
          data={[{id:'12effdt6eư',name:'Đào tạo đá bóng',nameproject:'Dạy đá bóng'},{id:'12effdt6e2',name:'Đào tạo bơi',nameproject:'Daỵ bơi'},{id:'12effd6t6e',name:'Đào tạo múa',nameproject:'Dạy học múa'},{id:'12eff55dt6e',name:'ĐÀo tạo bắn cung',nameproject:'Dạy học bắn'}]}
       
          renderItem={({item}) =>  <View style={{width:'100%'}}>
            <View  style={{marginVertical:1,width:'100%',backgroundColor:'#fff'}}>
              <TouchableOpacity onPress={()=>{
                props.navigation.navigate('WorkDetail')
              }} style={{width:'100%',alignItems:'center'}}>
              <Text style={{color:'blue',fontSize:16}}>ID {item.id}</Text>
              <Text style={{color:'red',fontSize:16}}>Tên {item.id}</Text>
               <Text style={{fontSize:16}}> Thuộc dự án {item.id}</Text>
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
