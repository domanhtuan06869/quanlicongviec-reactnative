import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {TouchableOpacity,Platform} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/Colors';
export default function MapWeb(props) {
    return (
        <LinearGradient colors={['#4568dc', '#b06ab3']} start={{ x: 0, y: 0.1 }} end={{ x: 1, y: 1 }} style={[_style,props.style]}>
        <TouchableOpacity onPress={props.onPress}>
          <Ionicons size={28} color={'white'} name={Platform.OS=='ios'?'ios-map':'md-map'}/>
        </TouchableOpacity>
      </LinearGradient>
  );
}
const _style = {position:"absolute",
                bottom:0,
                right:0,
                margin:10,
                borderRadius:50,
                backgroundColor:colors.tintColor,
                shadowColor: 'black',
                shadowOpacity: 0.8,
                alignItems:"center",
                justifyContent:"center",
                width:50,
                height:50,
                elevation: 20,
                zIndex:1000,}
