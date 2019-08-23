import * as React from 'react';
import { View, StyleSheet,Platform, Dimensions,Text,WebView,TouchableOpacity,FlatList,Button ,TextInput} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
import { Dialog, ProgressDialog, ConfirmDialog,} from "react-native-simple-dialogs";



const Tasks = (props) => (
 
  <View style={{flex:1,padding:10,}}>
    <Button title='btn' onPress={()=>{
      props.navigate.navigate('WorkOfProject',{idproject:props.idproject,nameproject:props.nameproject})
    
    
    }}></Button>
  
    <SwipeableFlatList
            data={[{lable:'ghf'}]}
            renderItem={({ item }) => (
              <View style={{marginTop:5,height: 68}}>
                <Text style={{ height:'90%', backgroundColor:'red'}}>{item.label}</Text>
                </View>
            )}
            keyExtractor={item => item.label}
        
            renderRight={({ item }) => (
            <View  style={{ width: 100 ,flexDirection:'row'}}>
                <Text>Xóa</Text>
               </View>
            )}
            backgroundColor={'white'}
        />
  </View>
       
);

const Menber = (props) => (
  
  <View style={{flex:1,padding:10,}}>
    <View style={{flexDirection:'column', height:60,backgroundColor:'red'}}>
    <Text>Mã  {props.idproject}</Text>
      <Text>Dự án {props.nameproject}</Text>
    </View>
    <View style={{backgroundColor:'#CCC',width:'100%'}}>
    <Text style={{backgroundColor:'#03BB2C',textAlign:'center'}}>Thanh vien tham gia</Text>
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
        { key: 'Tasks', title: 'Tasks' },
        { key: 'Menber', title: 'Menber' },
        { key: 'HumidChart', title: 'Humid' },
   
      ],
      itemmenber:'',
      nameproject:'',
      idproject:''
    };
    removeElement(array, element) {
      return array.filter(el => el !== element);
    }
   
    async getMenberProject(){
      var idproject=this.props.navigation.getParam('id', 'NO-NAME');
      const result = await axios(
        'http://192.168.1.8:3000/project/getonemenberproject?idproject='+idproject
      );
    //console.log(result.data)
    var removeidmenber=this.removeElement(Object.values(result.data),result.data._id)
    var removeIdproject=this.removeElement(removeidmenber,idproject)
    var removeNameproject=this.removeElement(removeIdproject,result.data.name)
    console.log(removeNameproject)
    this.setState({idproject:result.data.idproject,nameproject:result.data.name})
 
    this.setState({itemmenber:removeNameproject})
    }

async componentDidMount(){
this.getMenberProject()

}
    
    render() {
      return (
      
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          Tasks:()=> <Tasks item={this.data} navigate={this.props.navigation} idproject={this.state.idproject} nameproject={this.state.nameproject}/>,
          Menber:()=> <Menber itemmenber={this.state.itemmenber} nameproject={this.state.nameproject} idproject={this.state.idproject}/>,
          HumidChart: HumidChart,
      
        })}
        onIndexChange={index => {this.setState({index})}}
        initialLayout={{ width: Dimensions.get('window').width}}
      />
     
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});