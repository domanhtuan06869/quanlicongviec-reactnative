import React, { Component } from 'react';
import {
  Text,
  View,Button,StyleSheet,
  Platform,TextInput,ScrollView,TouchableOpacity,KeyboardAvoidingView,TouchableHighlight
} from 'react-native';
import TagInput from 'react-native-tag-input';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from "react-native-modal-datetime-picker";
import url from '../url'
import AutoTags from 'react-native-tag-autocomplete';


export default class addprojectScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => ({
    header:(
      <View style={{  justifyContent:"space-between",
      flexDirection:"row",
      backgroundColor:'#2f95dc',
      paddingVertical:10,
      paddingHorizontal:20,}}>
          <Ionicons onPress={()=>{navigation.goBack()}} color={'white'} size={Platform.OS==='ios'?40:35} name={Platform.OS=='ios'?'ios-arrow-back':'md-arrow-back'}/>
          <Text style={{fontSize:20,marginTop:5,color:'white',}}>Thêm dự án</Text>
          <Ionicons style={{marginTop:5}} size={30} color={'white'} name={Platform.OS=='ios'?'ios-search':'md-search'}/>
      </View>
    ),
  })


  state = {
    suggestions :[],
    tagsSelected : [],

   name:this.props.navigation.getParam('name', 'NO-NAME'),
    status:'',
    desire:this.props.navigation.getParam('desire', 'NO-NAME'),
    description:this.props.navigation.getParam('description', 'NO-NAME'),
    company:this.props.navigation.getParam('company', 'NO-NAME'),
    load:false,
    isDateTimePickerVisible: false,
    isDateTimePickerVisible2: false,
    starttime:new Date(this.props.navigation.getParam('starttime', 'NO-NAME')).toLocaleDateString(),
    endtime:new Date(this.props.navigation.getParam('endtime', 'NO-NAME')).toLocaleDateString(),
    id:this.props.navigation.getParam('id', 'NO-NAME'),
    idemailtag:[]
  };

  customFilterData = query => {
    //override suggestion filter, we can search by specific attributes
    query = query.toUpperCase();
    let searchResults = this.state.suggestions.filter(s => {
      return (
     
        s.email.toUpperCase().includes(query)
      );
    });
    return searchResults;
  };

  customRenderTags = tags => {
    //override the tags render
    return (
      <View style={styles.customTagsContainer}>
        {this.state.tagsSelected.map((t, i) => {
          return (
            <TouchableHighlight
              key={i}
              style={styles.customTag}
              onPress={() => this.handleDelete(i)}
            >
              <Text style={{ color: "white" }}>
                 { t.email}
              </Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  };

  customRenderSuggestion = suggestion => {
    //override suggestion render the drop down
    const name = suggestion.email;
    return (
      <Text style={{marginVertical:2,fontSize:15}}>
        {name.substr(0, name.indexOf(" "))}  {suggestion.email}
      </Text>
    );
  };

  handleDelete = index => {
    //tag deleted, remove from our tags array
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
    
  };

  handleAddition = contact => {
    //suggestion clicked, push it to our tags array
    this.setState({ tagsSelected: this.state.tagsSelected.concat([contact]) });
  };

  onCustomTagCreated = userInput => {
    //user pressed enter, create a new tag from their input
    const contact = {
      emailtag: userInput,
    
    };
    this.handleAddition(contact);
  };



  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  showDateTimePicker2 = () => {
    this.setState({ isDateTimePickerVisible2: true });
  };
 
  hideDateTimePicker2 = () => {
    this.setState({ isDateTimePickerVisible2: false });
  };
 
  handleDatePicked = date => {
    this.setState({starttime:date})
    console.log(this.state.starttime)
    this.hideDateTimePicker();
  };
  handleDatePicked2 = date => {
    this.setState({endtime:date})
    console.log(this.state.endtime)
    this.hideDateTimePicker2();
  };

  ///Tạo mới 1 project
async createproject(){
  this.setState({load:true})
  setTimeout(() => {
    this.setState({load:false})
  },10000);
  var arrayEmail=this.state.tagsSelected.map(function (obj) {
    return obj.email;
  });
  var arrayToken=this.state.tagsSelected.map(function (obj) {
    return obj.token;
  });
  let email = await SecureStore.getItemAsync('email');
  let details = {
    name:this.state.name,
    email:email,
    emailtag:arrayEmail,
    company:this.state.company,
    desire:this.state.desire,
    starttime:this.state.endtime,
    endtime:this.state.endtime,
    status:this.state.status,
    description:this.state.description,
    id:this.state.id,
    token:arrayToken

  }
  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  fetch(  url.url+'/project/updateprojectsql'   /*'https://project-tuan.herokuapp.com/project'*/, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  body: formBody,
  }).then((response) => response.text())
  .then((responseData) => {

  })
  .catch((err) => { });
}


 addAll=()=>{
this.createproject().then(()=>{
  this.setState({load:false})
  this.props.navigation.push('Home')
}).catch(()=>{
  setTimeout(()=>{
    this.setState({load:false})
  },5000)
})
}
 componentDidMount(){
  this.getMenberProject()
}
   
async getMenberProject(){
  var idproject=this.props.navigation.getParam('id', 'NO-NAME');
  const result = await axios(
    url.url+ '/project/getemailandtoken?idproject='+idproject
   
  )
  const resultuser = await axios( url.url+'/users/getuser');
  this.setState({suggestions:resultuser.data})
 this.setState({tagsSelected:result.data})


}
  render() {

    return (
      <KeyboardAvoidingView style={{flex: 1,alignItems:'center'}} behavior='height'>
                 <Spinner visible={this.state.load}
                   color='blue'>                  
                   </Spinner>
                   <ScrollView style={{width:'100%'}}>
      <View style={{ width:'100%', marginTop: 30,paddingBottom:40 }}>
      
        
        <View style={{flexDirection:'column',width:'100%',alignItems:'center'}}>

        
<TextInput  style={styles.textinput} onChangeText={(name) => this.setState({name})} value={this.state.name} placeholder='Tên dự án'></TextInput>  

 <TextInput style={styles.textinput}  onChangeText={(company) => this.setState({company})} value={this.state.company} placeholder='Tên công ty'></TextInput>    

<TextInput style={styles.textinput}  onChangeText={(desire) => this.setState({desire})} value={this.state.desire} placeholder='Mong muốn'></TextInput>

</View>
       
        <View style={{marginTop:10, flexDirection: 'row', alignItems: 'center',width:'100%',marginLeft:'5%'}}>
        <AutoTags
            //required
            suggestions={this.state.suggestions}
            tagsSelected={this.state.tagsSelected}
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
            //optional
            placeholder="Add a Email.."
            filterData={this.customFilterData}
            renderSuggestion={this.customRenderSuggestion}
            renderTags={this.customRenderTags}
            onCustomTagCreated={this.onCustomTagCreated}
            autoFocus={false}
         
         
          />
        </View>
   <View style={{width:'90%', borderColor: 'gray',marginLeft:'5%',marginTop:10,borderRadius:4,justifyContent:'center',alignItems:'center',
   borderWidth: 1, height: 40,}}>
        <RNPickerSelect
        color='black'
        style={{color:'black'}}
      onValueChange={(value) => this.setState({status:value})}
      placeholder={{
        label: 'Chọn trạng thái...',
        value: null,color:'black'
    }}
      items={[
        { label: 'Đang làm', value: 'Đang làm' ,color:'black'},
        { label: 'Hoàn Thành', value: 'Hoàn Thành' },
        { label: 'Đình chỉ', value: 'Đình chỉ' },
      ]}
    />
    </View>
    <View style={{flexDirection:'row',marginTop:10, width:'100%',marginLeft:'4%',alignItems:'center'}}>
       <TouchableOpacity style ={styles.textinputop} onPress={this.showDateTimePicker} >
      <Text style={styles.textbtn2}>Thời gian bắt đầu </Text>
       </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={'date'}
        />
             <Text style={{textAlignVertical:'center',paddingLeft:'15%',paddingTop:13,width:'50%',  borderColor: 'gray',
   borderWidth: 1, height: 40,borderRadius:4,marginHorizontal:3,}}>{new Date(this.state.starttime).toLocaleDateString()}</Text>

       </View>
       <View style={{flexDirection:'row',marginTop:10, width:'100%',marginLeft:'4%',alignItems:'center'}}>
       <TouchableOpacity style ={styles.textinputop} onPress={this.showDateTimePicker2} >
      <Text style={styles.textbtn2}>Thời gian kết thúc </Text>
       </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible2}
          onConfirm={this.handleDatePicked2}
          onCancel={this.hideDateTimePicker2}
          mode={'date'}
        />
       <Text style={{textAlignVertical:'center',paddingLeft:'15%',paddingTop:13,width:'50%',  borderColor: 'gray',
   borderWidth: 1, height: 40,borderRadius:4,marginHorizontal:3,}}>{new Date(this.state.endtime).toLocaleDateString()}</Text>

       </View>
  <TextInput style={styles.textinputdescription}  onChangeText={(description) => this.setState({description})} value={this.state.description} placeholder='Mô tả'></TextInput>

      </View>
      </ScrollView>
      <TouchableOpacity onPress={this.addAll} style={styles.containerview} >
          <Text style={styles.textbtn}>TẠO DỰ ÁN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
textinput:{
  width:'90%',  borderColor: 'gray',
   borderWidth: 1, height: 50,marginVertical:6,borderRadius:4
},
textinputnumber:{
  width:'18.5%',  borderColor: 'gray',
   borderWidth: 1, height: 40,marginVertical:6,borderRadius:4,marginHorizontal:3
},
textinputnumbeyear:{
  width:'50%',  borderColor: 'gray',
   borderWidth: 1, height: 40,marginVertical:6,borderRadius:4,marginHorizontal:3
},
textinputdescription:{
  width:'90%',  borderColor: 'gray',
   borderWidth: 1, height: 50,marginVertical:6,borderRadius:4, marginLeft:'5%'
},
containerview:{
  width:'100%',alignItems:'center',borderRadius:4,height:45,justifyContent:'center'
},
textbtn:{
 width:'100%',height:'100%',backgroundColor:'red',textAlign:'center',color:'#fff',paddingTop:15,fontSize:17
},
textinputop:{
  width:'38.5%', borderColor:'#fff', height: 40,marginVertical:6,borderRadius:4,marginHorizontal:3
},textbtn2:{
  width:'100%',height:'100%',backgroundColor:'red',textAlign:'center',color:'#fff',paddingTop:5,fontSize:17,borderRadius:4
 }, customTagsContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  backgroundColor: "#efeaea",
  width:'85%'
 
},
customTag: {
  backgroundColor: "#9d30a5",
  justifyContent: "center",
  alignItems: "center",
  height: 30,
  marginLeft: 5,
  marginTop: 5,
  borderRadius: 30,
  padding: 8
},


autocompleteContainer: {
  flex: 1,
  left: 20,

  right: 20,
  zIndex: 1
},
label: {
  color: "#614b63",
  fontWeight: "bold",
  marginBottom: 10
},
})