import * as React from 'react';
import { View, StyleSheet,Platform, Alert,Text,WebView,TouchableOpacity,FlatList,Button ,Image,TextInput} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import axios from 'axios';

import { Ionicons } from '@expo/vector-icons';
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
import { Dialog, ProgressDialog, ConfirmDialog,} from "react-native-simple-dialogs";
import icon from '../Iconitem'

const Tasks = (props) => (

 
  <View style={{flex:1,}}>
 
    <TouchableOpacity style={{width:'100%',height:'8%',alignItems:'center',justifyContent:'center',backgroundColor:'red'}}
    onPress={()=>
      props.navigate.navigate('WorkOfProject',{idproject:props.idproject,nameproject:props.nameproject}) }
    >
    <Text>Thêm công việc</Text>

  </TouchableOpacity>
  <SwipeableFlatList
        
        data={props.listwork}
        renderItem={({ item }) => (
          <View  style={{backgroundColor:'#fff',marginTop:1,minHeight:139,flexDirection:'row'}}>
      
          <View style={{flexDirection:'column',marginLeft:10,width:'85%'}}>
            <TouchableOpacity onPress={()=>{
              props.pr.navigation.navigate('ProjectDetail',{id:item._id,nameproject:item.name})}
            }>
          <Text style={styles.textname}>Công việc {item.name}</Text>
          <Text style={{height:20}}>ID :{item._id}</Text>


          <View style={{flexDirection:'row',alignItems:'center',alignItems:'center',marginVertical:3}}>
            <Image source={{uri:icon.statusItem}}   style={{width:24,height:24}}></Image>
          <Text style={{marginLeft:3,padding:4}}>Trạng thái :{item.status}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',alignItems:'center',marginVertical:3}}>
            <Image source={{uri:icon.timeItem}}   style={{width:25,height:25}}></Image>
          <Text style={{marginLeft:3,padding:3}}>Kết thúc:{item.endday}-{item.endmonth}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',alignItems:'center',marginVertical:3}}>
            <Image source={{uri:icon.descriptionItem}}   style={{width:23,height:23}}></Image>
          <Text style={{marginLeft:3,padding:3}}>Mô tả {item.description}</Text>
          </View>
        
          
          </TouchableOpacity>
        
       
          </View>
          <View style={{width:'15%',marginRight:4,height:'100%',backgroundColor:'#5AC2FE',flexDirection:'column',alignItems:'center'}}>
            <TouchableOpacity style={{marginTop:20}}>
              <Image source={{uri:icon.star}} style={{width:25,height:25}}></Image>
            </TouchableOpacity>
            
            <TouchableOpacity style={{marginTop:'90%'}}>
              <Image source={{uri:icon.error}}  style={{width:25,height:25}}></Image> 
            </TouchableOpacity>
          </View>
    </View>
        )}
     
    
        renderRight={({ item }) => (


<View  style={{ width: 130,height:139 ,flexDirection:'row',backgroundColor:'#fff',marginTop:1,justifyContent:'center',alignItems:'center'}}>
           <TouchableOpacity  onPress={()=>{
              alert('edt')
           }} style={styles.btnopacity1}>
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
                      onPress: () =>  {  deleteprojectInvolved(item._id).then(()=>{
                        getProject()
                      })
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
        keyExtractor={item => item._id}
        itemBackgroundColor={'#ccc'}
        rightColor={'blue'}
        backgroundColor={'#ccc'}
        contentContainerStyle={{width:'100%'}}
   
    />
  </View>
       
);

const Menber = (props) => (
  
  <View style={{width:'100%'}}>
    <View style={{flexDirection:'column', height:60,backgroundColor:'#87CFF9',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:17}}>ID : {props.idproject}</Text>
      <Text style={{fontSize:17}}>Dự án {props.nameproject}</Text>
    </View>
    <View style={{backgroundColor:'#CCC',width:'100%'}}>
   
    <FlatList 
                style={{width:'100%'}}
       contentContainerStyle={{ }}

       // data={Object.values(obj)}
       data={props.itemmenber}
         renderItem={({item}) =>
         <View style={{backgroundColor:'#fff',marginTop:2,width:'100%'}}>
      
           <Text style={{height:Platform.OS==='ios' ?40:35,width:'100%',textAlign:'center',paddingTop:Platform.OS==='ios' ?10:6,textAlignVertical:'center'}}>{item}</Text>


     </View>
                }
    keyExtractor={item => item}
    />
    <Text style={{backgroundColor:'gray',height:0.4}}/>
    </View>
  </View>
);

const HumidChart = () => (
  <View style={{flex:1,padding:10,}}>
    <Text>Today statistics</Text>
 
  </View>
)


export default class TabChartScreen extends React.Component {



 

  

  static navigationOptions = ({ navigation }) => ({
    header:(
      <View style={{  justifyContent:"space-between",
      flexDirection:"row",
      backgroundColor:'#2f95dc',
      paddingVertical:10,
      paddingHorizontal:20,}}>
          <Ionicons onPress={()=>{navigation.goBack()}} color={'white'} size={Platform.OS==='ios'?40:35} name={Platform.OS=='ios'?'ios-arrow-back':'md-arrow-back'}/>
          <Text style={{fontSize:20,marginTop:5,color:'white',}}>Detail</Text>
          <Text></Text>
      </View>
    ),
  })


  state = {
      index: 0,
      routes: [
        { key: 'Tasks', title: 'Công việc' },
        { key: 'Menber', title: 'Thành viên' },
        { key: 'HumidChart', title: 'Chi tiết' },
   
      ],
      itemmenber:'',
      nameproject:'',
      idproject:'',
      datawork:[]
    };
    removeElement(array, element) {
      return array.filter(el => el !== element);
    }
   
    async getMenberProject(){
      var idproject=this.props.navigation.getParam('id', 'NO-NAME');
      const result = await axios(
        'https://project-tuan.herokuapp.com/project/getonemenberproject?idproject='+idproject
      );
    //console.log(result.data)
    var removeidmenber=this.removeElement(Object.values(result.data),result.data._id)
    var removeIdproject=this.removeElement(removeidmenber,idproject)
    var removeNameproject=this.removeElement(removeIdproject,result.data.name)
    console.log(removeNameproject)
    this.setState({idproject:result.data.idproject,nameproject:result.data.name})
 
    this.setState({itemmenber:removeNameproject})
    }
    async getWork(){
      var idproject=this.props.navigation.getParam('id', 'NO-NAME');
      const result = await axios(
        'https://project-tuan.herokuapp.com/work/getall?idproject='+idproject
      );
          this.setState({datawork:result.data})
          
          console.log(idproject)
        
      }
async componentDidMount(){

this.getWork()
setTimeout(() => {
  this.getMenberProject()
},1000);

}

    
    render() {
      return (
      
      <TabView
      style={{width:'100%'}}
        navigationState={this.state}
        renderScene={SceneMap({
          Tasks:()=> <Tasks listwork={this.state.datawork}  navigate={this.props.navigation} idproject={this.state.idproject} nameproject={this.state.nameproject}/>,
          Menber:()=> <Menber itemmenber={this.state.itemmenber} nameproject={this.state.nameproject} idproject={this.state.idproject}/>,
          HumidChart: HumidChart,
      
        })}
        onIndexChange={index => {this.setState({index})}}
       // initialLayout={{ width: Dimensions.get('window').width}}
      />
     
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },btnopacity:{
    marginLeft:20,marginTop:5,width:35,height:35 ,borderRadius:17,backgroundColor:'#ccc',alignItems:'center',justifyContent:'center'
  },
  btnopacity1:{
    marginTop:5,width:35,height:35 ,borderRadius:17,backgroundColor:'#ccc',alignItems:'center',justifyContent:'center'
  },textname:{
    color:'#FF0000',fontWeight:'bold',fontSize:16
  }
});