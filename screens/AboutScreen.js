import React, { Component } from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';
import { Constants } from 'expo';
import io from 'socket.io-client';

const SOCKET_URL = 'http://192.168.1.5:3000';

export default class App extends Component {

  socket = io.connect(SOCKET_URL, {
    transports: ['websocket'],
    reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
  });

  state = {
    conncted: false,
    data:''
  };
  

  componentDidMount() {
    this.onConnectSocket();
  }

  onConnectSocket = () => {
    //Vérification si socket n'est pas à null
    if(this.socket) {
      //Ecoute de l'évènement
      this.socket.on('connect', () => {
        
       

        //Modification du status de connexion
        this.setState({
          connected: true
        });
      });
      this.socket.on('ping',data=>{
        this.setState(data)
      })
    }
  }
click=()=>{
 this.socket.emit('haha', 'con chim bay qua');

}
  render() {
    return (
      <View style={styles.container}>
        <Text>dem{this.state.data}</Text>
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
