import React from 'react';
import { Platform, ScrollView, Image,Text } from 'react-native';
import { createStackNavigator,createDrawerNavigator,DrawerItems,SafeAreaView } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AccoutScreen from '../screens/AccoutScreen';
import ProjectInvolvedScreen from '../screens/ProjectInvolvedScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';
import DustChartScreen from '../screens/charts/DustChartScreen';
import CoChartScreen from '../screens/charts/CoChartScreen';
import HumidityChartScreen from '../screens/charts/HumidityChartScreen';
import TempChartScreen from '../screens/charts/TempChartScreen';
import ProjectDetailScreen from '../screens/project/ProjectDetailScreen';
import LogoutSreen from '../screens/Logout';
import AddprojectScreen from '../screens/project/addprojectScreen'
import WorkOfProjectScreen from '../screens/project/WorkOfProjectScreen'
import WorkDetailScreen from '../screens/WorkDetailScreen'
import EditProjectScreen from '../screens/project/EditProjectScreen'
import TestS from '../screens/TestScreen'



import Colors from '../constants/Colors';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Addproject:AddprojectScreen,
    ProjectDetail:ProjectDetailScreen,
    WorkOfProject:WorkOfProjectScreen,
    WorkDetail:WorkDetailScreen,
    EditProject:EditProjectScreen
  },
  config
  );
  HomeStack.navigationOptions = {
    drawerLabel: 'Trang chủ',
    drawerIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={ Platform.OS === 'ios'? 'ios-home': 'md-home'}/>
    ),
    
  };
  HomeStack.path = '';
  const Test = createStackNavigator(
    {
      Testsc: TestS,

    },
    config
    );
    Test.navigationOptions = {
      drawerLabel: 'Tét',
      drawerIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={ Platform.OS === 'ios'? 'ios-home': 'md-home'}/>
      ),
      
    };
    Test.path = '';

const AccoutStack = createStackNavigator(
  {
    Accout: AccoutScreen,
  },
  config
  );
  AccoutStack.navigationOptions = {
    drawerLabel: 'Tài khoản',
    drawerIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={ Platform.OS === 'ios'? 'ios-contact': 'md-contact'}/>
    ),
    
  };
  AccoutStack.path = '';
  
const ProjectInvolvedStack = createStackNavigator(
  {
    ProjectInvolved: ProjectInvolvedScreen,
  },
  config
);
ProjectInvolvedStack.navigationOptions = {
  drawerLabel: 'Dự án liên quan',
  drawerIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-business' : 'md-business'} />
  ),
};
ProjectInvolvedStack.path = '';

const ContactStack = createStackNavigator(
  {
  Contact: ContactScreen,
},
config
);
ContactStack.navigationOptions = {
  drawerLabel: 'Tất cả công việc',
  drawerIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'} />
    ),
  };
  ContactStack.path = '';
    
const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
  },
  config
);
AboutStack.navigationOptions = {
  drawerLabel: 'About Us',
  drawerIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-alert' : 'md-alert'} />
  ),
};
AboutStack.path = '';
const SearchStack = createStackNavigator(
  {
    About: AboutScreen,
  },
  config
);
SearchStack.navigationOptions = {
  drawerLabel: 'Tìm kiếm',
  drawerIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
};
SearchStack.path = '';

const LogoutStack = createStackNavigator(
  {
    Logout:LogoutSreen,
    DustChart: DustChartScreen,
    CoChart: CoChartScreen,
    HumidityChart: HumidityChartScreen,
    TempChart: TempChartScreen,
  },
  config
);
LogoutStack.navigationOptions = {
  drawerLabel: 'Logout',
  drawerIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-exit' : 'md-exit'} />
  ),
};
LogoutStack.path = '';

const tabNavigator = createDrawerNavigator(
  {
    HomeStack,
    AccoutStack,
    ProjectInvolvedStack,
    ContactStack,
    SearchStack,
    AboutStack,
    LogoutStack,
  },
  {
    hideStatusBar: false,
    drawerBackgroundColor: 'white',
    overlayColor: 'rgba(0,0,0,.5)',
    contentOptions: {
      tintColor:Colors.tabIconDefault,
      activeTintColor: Colors.tabIconSelected,
    },
    contentComponent: (props) => (
      <SafeAreaView>
        <Image source={{uri:'https://perureports.com/wp-content/uploads/2018/02/travel-2.jpg'}} style={{width:'100%',height:200,marginBottom:-5}}/>
        <ScrollView>
          <DrawerItems {...props} />
        </ScrollView>
      </SafeAreaView>
     )
  }
);

tabNavigator.path = '';

export default tabNavigator;