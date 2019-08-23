import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Platform,View,Text} from 'react-native';
import colors from '../constants/Colors';
export default function HeaderBar(props) {
    return (
    <View style={{justifyContent:"space-between",flexDirection:"row",backgroundColor:colors.tintColor,paddingVertical:10,paddingHorizontal:20,}}>
        <Ionicons onPress={props.onPress} color={'white'} size={35} name={Platform.OS=='ios'?'ios-menu':'md-menu'}/>
        <Text style={{fontSize:20,marginTop:5,color:'white',}}>HOME</Text>
        <Ionicons onPress={props.on} style={{marginTop:5}} size={Platform.OS==='ios'?40:35} color={'white'} name={Platform.OS=='ios'?'ios-add':'md-add'}/>
    </View>
  );
}