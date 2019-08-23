import React, { useState,useEffect } from 'react';
import { StyleSheet, View, StatusBar, Platform ,AsyncStorage,Image} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import SlideIntro from './components/SlideIntro';
import * as firebase from 'firebase';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
var firebaseConfig = {
  apiKey: "AIzaSyAy4hlIkRu7wOZFw_yl_ZQD_U9DwaY6_cI",
  authDomain: "test-8ca79.firebaseapp.com",
  databaseURL: "https://test-8ca79.firebaseio.com",
  projectId: "test-8ca79",
  storageBucket: "test-8ca79.appspot.com",
  messagingSenderId: "765297743299",
  appId: "1:765297743299:web:f578ccef0e69c668"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default function App() {

  console.disableYellowBox = true;
  const [introducted,setIntroducted] = useState(true);
  const [welcome,setwelcome] = useState(true);
  async function _retrieveData(){
    try {
      const value = await AsyncStorage.getItem('@s');
      if (value !== null) {
        setIntroducted(false)
      }
    } catch (error) {
      console.log(error);
    }
    setwelcome(false)
  };
  async function _storeData(){
    try {
      await AsyncStorage.setItem('@s', 'true');
    } catch (error) {
      console.log(error)
    }
    setIntroducted(false)
  };
  useEffect(()=>{
    setTimeout(() => {
      _retrieveData()
    });
    return ()=>{clearTimeout()}
  })
  return (
    welcome?<View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Image style={{width:300,height:100}} source={{uri:'https://i.imgur.com/uEH0E4K.gif'}}/></View>:
    introducted?<SlideIntro onDone={()=>{_storeData()}}/>:
    <View style={styles.container}>
      <GeneralStatusBarColor backgroundColor={'#2f95dc'}/>
      <AppNavigator />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    width:'100%'
  }
});
