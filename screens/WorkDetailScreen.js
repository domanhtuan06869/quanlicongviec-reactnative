import React,{useEffect,useState} from 'react';
import {Image, StyleSheet,ScrollView,TextInput, Text, View,Platform, Button,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/Colors';
import icon from '../screens/Iconitem'
export default function AccoutScreen(props) {
    const [heightlayout,setHeightlayout]=useState(0)
    const [heightdefault,setHeightdefault]=useState(27)
    const [iconlist,setIconlist]=useState(icon.arrowright)
    const [pdbt,setpadding]=useState(100)
    
 function onLayout(event) {
    const {x, y, height, width} = event.nativeEvent.layout;
     setHeightlayout(height)
  }
  function checkHeigth(){
      if(heightlayout!=heightdefault){
        setHeightdefault(heightlayout+20)
          setIconlist(icon.dropdow)
          setpadding(80+heightlayout)
      }if(heightlayout+20===heightdefault){
        setHeightdefault(27)
          setIconlist(icon.arrowright)
          setpadding(100)
      }
  }

  return (
<View style={{flex:1,flexDirection:'column'}}>
    <ScrollView style={{height:'100%',flexDirection:'column',backgroundColor:'#ccc'}}>
    <View style={{backgroundColor:'#57BEFB',flexDirection:'column'}}>
      <View style={{backgroundColor:'#57BEFB',flexDirection:'column'}}>
      <Text style={{fontSize:16,fontWeight:'bold',color:'#fff',marginLeft:8,marginTop:5}}>Xuất nhập khẩu Vàng</Text>
      <Text style={{textAlign:'justify',color:'#fff',marginLeft:8,paddingRight:Platform.OS==='ios'?4:0,marginTop:5}}>Donald John Trump (sinh ngày 14 tháng 6 năm 1946) là đương kim Tổng thống Hoa Kỳ thứ 45.Trump đã hai lần chạy đua cho chức Tổng thống Hoa Kỳ. Năm 2000, ông phát động một chiến dịch thăm  dò và giành chiến thắng ở hai cuộc bầu cử sơ bộ của Đảng Cải cách. Tháng 6 năm 2015, thắng ở hai cuộc bầu cử sơ bộ của Đảng Cải cách. Tháng 6 năm 2015, thắng ở hai cuộc bầu cử sơ bộ của Đảng Cải cách. Tháng 6 năm 2015,,</Text>
      </View>
      <View style={{flexDirection:'row',width:'100%',marginTop:Platform.OS==='ios'?20:10}}>
      <Ionicons style={{marginLeft:10}} color={'white'} size={Platform.OS==='ios'?25:25} name={Platform.OS=='ios'?'ios-alarm':'md-alarm'}/>
      <Text style={{color:'#fff',marginLeft:8,textAlignVertical:'top',paddingTop:3}}>Ngày tạo 20/10/2019 -> hết hạn 20/12/2010</Text>
      </View>
   
    </View>
    <View style={{height:60,flexDirection:'row',alignItems:'center',backgroundColor:'#fff'}}>
      <View style={{width:'40%',height:'100%',flexDirection:'row',backgroundColor:'#BFF9D3',alignItems:'center'}}>
      <Image source={{uri:icon.done}} style={{width:30,height:30,marginLeft:5}}></Image>
      <Text style={{color:'#36D86E',marginLeft:8,textAlignVertical:'center',paddingTop:3,fontSize:16}}>Hoàn thành</Text>  
      </View>
      <View  style={{width:'60%',height:'100%',flexDirection:'row',alignItems:'center'}}>
      <Image source={{uri:'https://i.pravatar.cc/300?5559'}} style={{width:50,height:50,borderRadius:Platform.OS==='ios'?25:45,marginLeft:10}}/>
        <View style={{height:'100%',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'gray'}}>người tạo</Text>
          <Text style={{fontSize:16}}>Leona Messi</Text>
        </View>
      </View>
    </View>
    <View style={{height:'36%',backgroundColor:'#fff',marginTop:3}}>
    <Text style={{color:'#ccc'}}>Miêu tả chi tiết</Text>
    <Text style={{color:'gray'}}>Barack Hussein Obama II (IPA: /bəˈɹɑk oʊˈbɑː.mə/; sinh ngày 4 tháng 8 năm 1961) là tổng thống thứ 44 của Hoa Kỳ từ năm 2009 đến năm 2017. Ông là người Mỹ gốc Phi đầu tiên được bầu vào chức vụ này. Lớn lên ở Honolulu, Hawaii, cá nhân ông thừa hưởng những nền văn hoá Phi-Âu-Á-Mỹ của thế giới từ thuở thiếu thời, Obama tốt nghiệp Viện Đại học Columbia và Trường Luật Viện Đại học Harvard, nơi ông từng là chủ tịch Harvard Law Review. Obama có thiên hướng hoạt động vì cộng đồng từ thời thanh niên và hoạt động cộng đồng tại Chicago </Text>

    </View>

    <View style={{height:heightdefault,backgroundColor:'#fff',marginTop:3}}>
        <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>checkHeigth()}>
            <Text style={{color:'gray'}}>Danh sách công việc</Text><Image style={{width:20,height:20}} source={{uri:iconlist}}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginLeft:'52%'}} onPress={()=> alert('Đang nâng cấp')}>
            <Image style={{width:25,height:25}} source={{uri:icon.plus}}></Image>
        </TouchableOpacity>
        </View>
       
        <View style={{padding:10}} onLayout={(event) => onLayout(event)} >
           <View style={{flexDirection:'row',width:'100%'}}>
           <Text style={{width:'90%'}}>Công việc nhỏ</Text>
           <Image style={{width:20,height:20}} source={{uri:icon.deletex}}></Image>
           </View>
           <View style={{flexDirection:'row',width:'100%',marginTop:4}}>
           <Text style={{width:'90%'}}>Công việc nhỏ</Text>
           <Image style={{width:20,height:20}} source={{uri:icon.deletex}}></Image>
           </View>
           <View style={{flexDirection:'row',width:'100%',marginTop:4}}>
           <Text style={{width:'90%'}}>Công việc nhỏ</Text>
           <Image style={{width:20,height:20}} source={{uri:icon.deletex}}></Image>
           </View>
           <View style={{flexDirection:'row',width:'100%',marginTop:4}}>
           <Text style={{width:'90%'}}>Công việc nhỏ</Text>
           <Image style={{width:20,height:20}} source={{uri:icon.deletex}}></Image>
           </View>
           <View style={{flexDirection:'row',width:'100%',marginTop:4}}>
           <Text style={{width:'90%'}}>Công việc nhỏ</Text>
           <Image style={{width:20,height:20}} source={{uri:icon.deletex}}></Image>
           </View>
        </View>
        
    </View>
    <View style={{backgroundColor:'#fff',marginTop:3,flexDirection:'column',paddingBottom:Platform.OS==='ios'?pdbt+20:pdbt}}>
      <Text style={{color:'gray'}}>Ghi Chú</Text>
   
    <View style={{flexDirection:'row',marginTop:5}}>
    <Image source={{uri:'https://i.pravatar.cc/300?5559'}} style={{width:50,height:50,borderRadius:Platform.OS==='ios'?25:45,marginLeft:10}}/>
       <View style={{padding:5,backgroundColor:'#ccc',marginLeft:5,borderRadius:10,flexDirection:'column'}}>
       <Text style ={{fontWeight:'bold'}}>Đỗ Tuân</Text>
<Text style={{fontSize:10,fontWeight:'100',fontStyle:'italic'}}>3 phút trước</Text>
<Text > CÓ GÌ ĐÓ KHÔNG ỔN</Text>
           </View>   
    </View>
    <View style={{flexDirection:'row',marginTop:5}}>
    <Image source={{uri:'https://i.pravatar.cc/300?5559'}} style={{width:50,height:50,borderRadius:Platform.OS==='ios'?25:45,marginLeft:10}}/>
       <View style={{padding:5,backgroundColor:'#ccc',marginLeft:5,borderRadius:10,flexDirection:'column'}}>
       <Text style ={{fontWeight:'bold'}}>Đỗ Tuân</Text>
<Text style={{fontSize:10,fontWeight:'100',textAlign:'justify',fontStyle:'italic',maxWidth:'95%'}}>3 phút trước</Text>
<Text > CÓ GÌ ĐÓ KHÔNG ỔN  dfgsd sdfsdf dgsdf gsdgsd gdsgsdfbgdfgdfgfdgdfgdf</Text>
           </View>   
    </View>
    <View style={{flexDirection:'row',marginTop:5}}>
    <Image source={{uri:'https://i.pravatar.cc/300?5559'}} style={{width:50,height:50,borderRadius:Platform.OS==='ios'?25:45,marginLeft:10}}/>
       <View style={{padding:5,backgroundColor:'#ccc',marginLeft:5,borderRadius:10,flexDirection:'column'}}>
       <Text style ={{fontWeight:'bold'}}>Đỗ Tuân</Text>
<Text style={{fontSize:10,fontWeight:'100',fontStyle:'italic'}}>3 phút trước</Text>
<Text > CÓ GÌ ĐÓ KHÔNG ỔN</Text>
           </View>   
    </View>
    </View>
    </ScrollView>
    <View style={{backgroundColor:'#fff', height: 55,flexDirection:'row',alignItems:'center'}}>
    <TextInput style={{width:'85%',  borderColor: 'gray', borderWidth: 1,marginTop:4,marginLeft:2,
     height: 45,}} placeholder='  Bình luận'></TextInput>
      <Image style={{width:35,height:30}}
      source={{uri:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fsend-256.png?alt=media&token=5933f2ab-aaf1-4478-9d7d-715fc28746ab'}}>

      </Image>
    </View>
    
  </View>
  );
}

AccoutScreen.navigationOptions = props=>{
  return{
  header:(
    <View style={styles.header}>
        <Ionicons onPress={()=>{props.navigation.openDrawer()}} color={'white'} size={35} name={Platform.OS=='ios'?'ios-menu':'md-menu'}/>
        <Text style={{fontSize:20,marginTop:5,color:'white',}}>Công Việc</Text>
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
