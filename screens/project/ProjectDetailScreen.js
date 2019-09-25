import * as React from 'react';
import { View, StyleSheet,Platform,ScrollView, RefreshControl,Alert,Text,AlertIOS,TouchableOpacity,FlatList,Button ,Image,TextInput} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import axios from 'axios';

import { Ionicons } from '@expo/vector-icons';
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
import { Dialog, ProgressDialog, ConfirmDialog,} from "react-native-simple-dialogs";
import icon from '../Iconitem'
import url from '../url'
const Tasks = (props) => (

 
  <View style={{flex:1,}}>
 
    <TouchableOpacity style={{width:'100%',height:'8%',alignItems:'center',justifyContent:'center',backgroundColor:'red'}}
    onPress={()=>
      props.navigate.navigate('WorkOfProject',{idproject:props.idproject,nameproject:props.nameproject,emailtag:props.emailtag}) }
    >
    <Text style={{color:'#fff',fontSize:17}}>Thêm công việc</Text>

  </TouchableOpacity>
  <ScrollView style={{backgroundColor:'#ccc'}} refreshControl={ <RefreshControl
      refreshing={props.fres}
      onRefresh={props.setFreshing}
    />}>
  <SwipeableFlatList
        
        data={props.listwork}
        renderItem={({ item }) => (
          <View  style={{backgroundColor:'#fff',marginTop:1,minHeight:139,flexDirection:'row'}}>
      
          <View style={{flexDirection:'column',marginLeft:10,width:'85%'}}>
            <TouchableOpacity onPress={()=>{
              props.navigate.navigate('WorkDetail',{idwork:item.id})}
            }>
          <Text style={styles.textname}>Công việc {item.tencongviec}</Text>
          <Text style={{height:20}}>ID :{item.id}</Text>


          <View style={{flexDirection:'row',alignItems:'center',alignItems:'center',marginVertical:3}}>
            <Image source={{uri:icon.statusItem}}   style={{width:24,height:24}}></Image>
          <Text style={{marginLeft:3,padding:4}}>Trạng thái :{item.trangthai}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',alignItems:'center',marginVertical:3}}>
            <Image source={{uri:icon.timeItem}}   style={{width:25,height:25}}></Image>
          <Text style={{marginLeft:3,padding:3}}>:{new Date(item.thoigianstart).toLocaleDateString()}->{new Date(item.thoigianend).toLocaleDateString()}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',alignItems:'center',marginVertical:3}}>
            <Image source={{uri:icon.descriptionItem}}   style={{width:23,height:23}}></Image>
          <Text style={{marginLeft:3,padding:3}}>Mô tả {item.mota}</Text>
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


<View  style={{ width: 130,height:139 ,flexDirection:'row',backgroundColor:'#ccc',marginTop:1,justifyContent:'center',alignItems:'center'}}>
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
        keyExtractor={item => item.id}
        itemBackgroundColor={'#ccc'}
        rightColor={'blue'}
        backgroundColor={'#ccc'}
        contentContainerStyle={{width:'100%'}}
   
    />
    </ScrollView>
  </View>
       
);

const Menber = (props) => (
  
  <View style={{width:'100%'}}>
    <View style={{flexDirection:'column', height:60,backgroundColor:'#87CFF9',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:17,color:'red'}}>ID : {props.idproject}</Text>
      <Text style={{fontSize:17}}>Dự án {props.nameproject}</Text>
    </View>
    <View style={{backgroundColor:'#CCC',width:'100%'}}>
   
    <FlatList 
                style={{width:'100%'}}
       contentContainerStyle={{ }}

       // data={Object.values(obj)}
       data={props.itemmenber}
         renderItem={({item}) =>
         <View style={{backgroundColor:'#fff',marginTop:1,width:'100%',flexDirection:'column'}}>
           <View style={{width:'100%', flexDirection:'row'}}>
             
           <Text style={{height:Platform.OS==='ios' ?40:35,width:'90%',paddingLeft:40,paddingTop:Platform.OS==='ios' ?10:6,textAlignVertical:'center'}}>{item.emailtag}</Text>
           <TouchableOpacity onPress={()=>{ Alert.alert(
              '',
              'bạn muốn xóa không ?',
              [
                  
                  {
                      text: 'Cancel',
                      style: 'cancel',
                  }, {
                      text: 'OK',
                      onPress: () =>  {  props.delete(item)
                      }
                  }
              ]
            )
            }} style={{paddingTop:Platform.OS==='ios' ?10:6,}}>
             <Image style={{width:20,height:20,}} source={{uri:icon.deletex}}></Image>
           </TouchableOpacity>
             </View>

     </View>
                }
    keyExtractor={item => item.emailtag}
    />
    <Text style={{backgroundColor:'gray',height:0.4}}/>
    </View>
  </View>
);

const Detail = (props) => (
  <View style={{flex:1,flexDirection:'column',backgroundColor:'#ccc'}}>
    <View style={{height:'35%',backgroundColor:'#57BEFB',flexDirection:'column'}}>
      <ScrollView style={{height:'60%',backgroundColor:'#57BEFB',flexDirection:'column'}}>
      <Text style={{fontSize:16,fontWeight:'bold',color:'#fff',marginLeft:8,marginTop:5}}>{props.nameproject}</Text>
      <Text style={{textAlign:'justify',color:'#fff',marginLeft:8,paddingRight:Platform.OS==='ios'?4:0,marginTop:5}}>{props.desire}</Text>
      </ScrollView>
      <View style={{flexDirection:'row',width:'100%',marginTop:Platform.OS==='ios'?'5%':'1%'}}>
      <Ionicons style={{marginLeft:10}} color={'white'} size={Platform.OS==='ios'?25:25} name={Platform.OS=='ios'?'ios-alarm':'md-alarm'}/>
      <Text style={{color:'#fff',marginLeft:8,textAlignVertical:'top',paddingTop:3}}>{props.start} -> hết hạn 20/12/2010</Text>
      </View>
   
    </View>
    <View style={{height:'13%',flexDirection:'row',alignItems:'center',backgroundColor:'#fff'}}>
      <View style={{width:'40%',height:'100%',flexDirection:'row',backgroundColor:props.status==='Đang làm'?'#BFF9D3':'yellow',alignItems:'center'}}>
      <Image source={{uri:icon.done}} style={{width:30,height:30,marginLeft:5}}></Image>
      <Text style={{color:'#36D86E',marginLeft:8,textAlignVertical:'center',paddingTop:3,fontSize:16}}>{props.status}</Text>  
      </View>
      <View  style={{width:'60%',height:'100%',flexDirection:'row',alignItems:'center'}}>
      <Image source={{uri:'https://i.pravatar.cc/300?5559'}} style={{width:50,height:50,borderRadius:Platform.OS==='ios'?25:45,marginLeft:10}}/>
        <View style={{height:'100%',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'gray'}}>người tạo</Text>
          <Text style={{fontSize:16}}>{props.email}</Text>
        </View>
      </View>
    </View>
    <ScrollView style={{height:'36%',backgroundColor:'#fff',marginTop:3}}>
    <Text style={{color:'#ccc'}}>Miêu tả chi tiết</Text>
    <Text style={{color:'gray'}}>{props.description} </Text>

    </ScrollView>
    
    <View style={{height:'16%',backgroundColor:'#fff',marginTop:3,flexDirection:'column'}}>
      <Text style={{color:'gray'}}>Đánh giá</Text>
      <View style={{flexDirection:'row'}}>
    <Image source={{uri:icon.star1}} style={{width:40,height:40,marginLeft:10}}/>
    <Image source={{uri:icon.star1}} style={{width:40,height:50,marginLeft:15}}/>
    <Image source={{uri:icon.star1}} style={{width:40,height:40,marginLeft:15}}/>
    <Image source={{uri:icon.star1}} style={{width:40,height:50,marginLeft:15}}/>
    <Image source={{uri:icon.star1}} style={{width:40,height:40,marginLeft:15}}/>
    
    </View>
    </View>
 
  </View>
)


export default class TabChartScreen extends React.Component {

  _onRefresh (){
    this.setState({ refreshing:true})
    this.getWork().then(() => {
      this.setState({ refreshing:false})
      console.log('rrre')
    }).catch((err)=>{
      console.log(err)
    });
  
  }
 



  static navigationOptions = ({ navigation }) => ({
    header:(
      <View style={{  justifyContent:"space-between",
      flexDirection:"row",
      backgroundColor:'#2f95dc',
      paddingVertical:10,
      paddingHorizontal:20,}}>
          <Ionicons onPress={()=>{navigation.goBack()}} color={'white'} size={Platform.OS==='ios'?40:35} name={Platform.OS=='ios'?'ios-arrow-back':'md-arrow-back'}/>
          <Text style={{fontSize:20,marginTop:5,color:'white',}}>Chi tiết dự án</Text>
          <Text></Text>
      </View>
    ),
  })


  state = {
      index: 0,
      routes: [
        { key: 'Tasks', title: 'Công việc' },
        { key: 'Menber', title: 'Thành viên' },
        { key: 'Detail', title: 'Chi tiết' },
   
      ],
      itemmenber:'',
      nameproject:this.props.navigation.getParam('nameproject', 'NO-NAME'),
      idproject: this.props.navigation.getParam('id', 'NO-NAME'),
      datawork:[],
      refreshing:false,
      nameproject:null,
      company:'',
      desire:'',
      email:'',
      start:'',
      end:'',
      status:'',
      description:'',
      emailtag:null

    };
 deleteemail= async(email) =>{

 const result = await axios(
    'https://project-tuan.herokuapp.com/project/deletemenberproject?idproject='+this.state.idproject+'&email='+email,
  ).then(()=>{
    this.getMenberProject()
  })
}

   
    async getMenberProject(){
      var idproject=this.props.navigation.getParam('id', 'NO-NAME');
      const result = await axios(
        url.url+'/project/getmenberprojectsql?idproject='+idproject
        /*'https://project-tuan.herokuapp.com/project/getonemenberproject?idproject='+idproject*/
      );
      const emailtag = await axios(
        url.url+'/project/getoneemailtagduan?idproject='+idproject
  
      );
     // console.log(emailtag.data)
      this.setState({emailtag:emailtag.data})
 
    this.setState({itemmenber:result.data})
    }
    async getWork(){
      var idproject=this.props.navigation.getParam('id', 'NO-NAME');
      const result = await axios(
        url.url+'/work/getworksql?idproject='+idproject
       /* 'https://project-tuan.herokuapp.com/work/getall?idproject='+idproject*/
      );
          this.setState({datawork:result.data})
          
    
        
      }
      async getProject() {
      var idproject=this.props.navigation.getParam('id', 'NO-NAME');
        
        const result = await axios(
          url.url+'/project/getoneduanwithid?idproject='+idproject
         /* 'https://project-tuan.herokuapp.com/project/getoneproject?id='+idproject*/
        );
       console.log(result.data)
        this.setState({nameproject:result.data.tenduan,start:result.data.starttime,status:result.data.trangthai,desire:result.data.mongmuon,description:result.data.mota,email:result.data.email})
      }


async componentDidMount(){
this.getProject()
this.getWork()

setTimeout(() => {
  this.getMenberProject()
},300);

}

  
    render() {
      return (
      
      <TabView
      style={{width:'100%'}}
        navigationState={this.state}
        renderScene={SceneMap({
          Tasks:()=> <Tasks listwork={this.state.datawork} emailtag={this.state.emailtag} fres={this.state.refreshing} setFreshing={()=>{
            this.setState({ refreshing:true})
            this.getWork().then(() => {
              this.setState({ refreshing:false})
              console.log('rrre')
            }).catch((err)=>{
              console.log(err)
            });

          }
   
        } navigate={this.props.navigation} idproject={this.state.idproject} nameproject={this.state.nameproject}/>,
          Menber:()=> <Menber delete={this.deleteemail} itemmenber={this.state.itemmenber} nameproject={this.state.nameproject} idproject={this.state.idproject}/>,
          Detail:()=><Detail  nameproject={this.state.nameproject}  desire={this.state.desire} start={this.state.start} end={this.state.end} status={this.state.status} description={this.state.description} email={this.state.email} />,
      
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