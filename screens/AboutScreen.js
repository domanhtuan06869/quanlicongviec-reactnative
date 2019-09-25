import React, { Component } from 'react';
import { Text, View,TextInput, StyleSheet,Button,FlatList } from 'react-native';
import { Constants } from 'expo';
import io from 'socket.io-client';
import axios from 'axios';
import url from './url'
const SOCKET_URL = 'http://192.168.1.4:3000';

export default class App extends Component {
  async che(){
    const result = await axios(
      'http://192.168.1.4:3000?aa=kjhkh'
    )
    this.setState({name:result.data.name})

  }
  async post(){
    const result = await axios(
      'http://192.168.1.4:3000/aa?chat='+this.state.name
    )
   

  }

  socket = io.connect(SOCKET_URL, {
 
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    transports: ["websocket"]
  });

  state = {
    conncted: false,
    datalist:[],
    chat:'',
    namei:''
  };
  

  componentWillMount() {
    this.onConnectSocket();
  }

  onConnectSocket = () => {
    //Vérification si socket n'est pas à null
    if(this.socket) {
      //Ecoute de l'évènement
      
      this.socket.on('connect', () => {
        this.che()
        //Modification du status de connexion
     
        this.socket.on('ping',data=>{
          //
         
        if(data!=undefined)
            this.setState({datalist:data})
           
          })
      
      });
    
   
    }
  }
click=()=>{
 this.post()
   


}
  render() {
    return (
      <View style={styles.container}>
        <FlatList 
       contentContainerStyle={{
        alignSelf: 'center', 
        marginTop:10
      
    }}
  data={this.state.datalist}
  renderItem={({item}) =>
<View>
  <Text>idd:{item.mess}</Text>
</View>

}
  keyExtractor={item =>item.mess}
/>
        <TextInput  style={{
  width:'90%',  borderColor: 'gray',
   borderWidth: 1, height: 50,marginVertical:6,borderRadius:4
}} onChangeText={(name) => this.setState({name})} value={this.state.name} placeholder='Tên dự án'></TextInput>  
        <Button title='dxvfsdvdzx' onPress={this.click}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    backgroundColor: '#ecf0f1',
  },
});
