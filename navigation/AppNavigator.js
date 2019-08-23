import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Loading from '../screens/user/loading'
import Login from '../screens/user/login'
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    Loading:Loading,
    Login:Login,
    Main: MainTabNavigator,
  })
);
