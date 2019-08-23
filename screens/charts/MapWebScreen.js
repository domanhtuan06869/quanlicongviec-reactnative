import React,{useState,useEffect} from 'react';
import {WebView,Text,ActivityIndicator,View} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
export default function DustChartScreen(props) {
  const {navigate} = props.navigation;
  const[latitude,setLatitude] = useState()
  const[longitude,setLongitude] = useState()
  const[loadmap,setloadmap] = useState(true);

  async function getLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      navigate('home');
    }
    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude)
    setLongitude(location.coords.longitude)
    setloadmap(false);
  }
  useEffect(()=>{
    getLocation();
  })
  return (
    loadmap?
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size="large" color={'#2f95dc'} /></View>:
    <WebView source={{uri:`http://52.221.226.126/mapweb?latitude=${latitude}&&longitude=${longitude}`}}/>
  );
}

DustChartScreen.navigationOptions = props=>{
  return{
  header:null
}};
