import React, { Component } from 'react';
import {
  Text,
  View,Button,StyleSheet,
  Platform,TextInput,ScrollView,TouchableOpacity,KeyboardAvoidingView
} from 'react-native';
import TagInput from 'react-native-tag-input';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const inputProps = {
 // keyboardType: 'default',
  placeholder: 'email',
 
  style: {
    fontSize: 14,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
   
  },
};


export default class WorkOfProjectScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => ({
    header:(
      <View style={{  justifyContent:"space-between",
      flexDirection:"row",
      backgroundColor:'#2f95dc',
      paddingVertical:10,
      paddingHorizontal:20,}}>
          <Ionicons onPress={()=>{navigation.goBack()}} color={'white'} size={Platform.OS==='ios'?40:35} name={Platform.OS=='ios'?'ios-arrow-back':'md-arrow-back'}/>
          <Text style={{fontSize:20,marginTop:5,color:'white',}}>SETTING</Text>
          <Ionicons style={{marginTop:5}} size={30} color={'white'} name={Platform.OS=='ios'?'ios-search':'md-search'}/>
      </View>
    ),
  })


  state = {
    tags: ['dmt@gmail.com','tuan@gmail.com'],
    objectTags:{},
    text: "",
    horizontalTags: [],
    horizontalText: "",
    name:'',
    status:'',
    target:'',
    description:'',
    endday:'',
    endmonth:'',
    endyear:'',
    load:false
  };

  onChangeTags = (tags) => {
    this.setState({ tags });
  
  }

  onChangeText = (text) => {
    this.setState({ text });
   // console.log(this.state.tags)

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        tags: [...this.state.tags, this.state.text],
        text: "",
      });
    }
  }

  labelExtractor = (tag) => tag;

  onChangeHorizontalTags = (horizontalTags) => {
    this.setState({
      horizontalTags,
    });
  };

  onChangeHorizontalText = (horizontalText) => {
    this.setState({ horizontalText });

    const lastTyped = horizontalText.charAt(horizontalText.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        horizontalTags: [...this.state.horizontalTags, this.state.horizontalText],
        horizontalText: "",
      });
      this._horizontalTagInput.scrollToEnd();
    }
  }


  ///Tạo mới 1 cv moi
creatework= async()=>{
   var idproject= this.props.navigation.getParam('idproject', 'NO-NAME')
    var nameproject=  this.props.navigation.getParam('nameproject', 'NO-NAME')
   // console.log(idproject)
   setTimeout(() => {
    this.setState({load:false})
   }, 5000);
  this.setState({load:true})
  let email = await SecureStore.getItemAsync('email');
  let details = {
    name:this.state.name,
    email:email,
    emailtag:this.state.tags,
    target:this.state.target,
    endday:this.state.endday,
    endmonth:this.state.endmonth,
    endyear:this.state.endyear,
    status:this.state.status,
    description:this.state.description,
    idproject:idproject,
    nameproject:nameproject
   
  }
  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  fetch('https://project-tuan.herokuapp.com/work', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  body: formBody,
  }).then((response) => 
  {
    this.setState({load:false})
    this.props.navigation.push('ProjectDetail',{id:idproject,nameproject:nameproject})
  
  }
  )
  .then((responseData) => {

 
  })
  .catch((err) => { console.log(err); });
}





  render() {

    return (
      <KeyboardAvoidingView style={{flex: 1,alignItems:'center'}} behavior='height'>
                 <Spinner visible={this.state.load}
                   color='blue'>                  
                   </Spinner>
                   <ScrollView style={{width:'100%'}}>
      <View style={{ width:'100%', marginTop: 30 }}>
      
        
        <View style={{flexDirection:'column',width:'100%',alignItems:'center'}}>

        


<TextInput  style={styles.textinput} onChangeText={(name) => this.setState({name})} value={this.state.name} placeholder='Tên công việc'></TextInput>  

 <TextInput style={styles.textinput}  onChangeText={(target) => this.setState({target})} value={this.state.target} placeholder='Mục tiêu công việc'></TextInput>    


</View>
       
        <View style={{marginTop:10, flexDirection: 'row', alignItems: 'center',width:'100%',marginLeft:'5%'}}>
          <TagInput
            value={this.state.tags}
            onChange={this.onChangeTags}
            labelExtractor={this.labelExtractor}
            text={this.state.text}
            onChangeText={this.onChangeText}
            tagColor="gray"
            tagTextColor="white"
            inputProps={inputProps}
            maxHeight={100}
            borderWidth={1}
            tagContainerStyle={{height:Platform.OS==='ios'?35:20}}
            
           
           
            
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
        value: null,
    }}
      items={[
        { label: 'Đang làm', value: 'Đang làm' ,color:'black'},
        { label: 'Hoàn Thành', value: 'Hoàn Thành' },
        { label: 'Đình chỉ', value: 'Đình chỉ' },
      ]}
    />
    </View>
       <View style={{flexDirection:'row',marginTop:10, width:'100%',marginLeft:'4%',alignItems:'center'}}>
       <TextInput style={styles.textinputnumber}  onChangeText={(endday) => this.setState({endday})} value={this.state.endday} keyboardType='numeric' placeholder='Ngày'></TextInput>
       <TextInput style={styles.textinputnumber}  onChangeText={(endmonth) => this.setState({endmonth})} value={this.state.endmonth} keyboardType='numeric' placeholder='Tháng'></TextInput>
       <TextInput style={styles.textinputnumbeyear}  onChangeText={(endyear) => this.setState({endyear})} value={this.state.endyear} keyboardType='numeric' placeholder='Năm'></TextInput>


       </View>
  <TextInput style={styles.textinputdescription}  onChangeText={(description) => this.setState({description})} value={this.state.description} placeholder='description'></TextInput>

      </View>
      </ScrollView>
      <TouchableOpacity onPress={this.creatework} style={styles.containerview} >
          <Text style={styles.textbtn}>TẠO CÔNG VIỆC</Text>
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
}
})