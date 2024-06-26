import {StyleSheet, View } from 'react-native';
import Key from './SRC/components/KeyBord';
import Home from './SRC/components/Home';
import Preview from './SRC/components/Preview';
import ListaCurriculos from './SRC/components/Curriculos';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Splash } from './SRC/components/splash';
import * as SQLite from 'expo-sqlite';
import curriculosDB from './SRC/components/curriculosdb';
import ButtonNew from './SRC/constants/ButtonNew';
const Tab = createBottomTabNavigator();


const Stack = createNativeStackNavigator();




function TelaCurriculo({route, navigation}){
  return(
    <Key navigation={navigation} route={route}/>
  );
}

function TelaHome({navigation}){
  return(
      <Home navigation={navigation}/>
  );
}

function TelaPreview({route ,navigation}){
  return(
      <Preview navigation={navigation} route={route}/>
  );
}



function TabNavigator(){
  return(
    <Tab.Navigator 
    initialRouteName="Home" 
    
    >

    <Tab.Screen name="Home" 
    component={StackScreen} 
    
    
    options={{
      headerShown: false,
      tabBarLabel: 'Home',
      tabBarItemStyle: {paddingBottom: 40, paddingTop: 10},
      tabBarActiveBackgroundColor: '#ECF5FA',
      tabBarInactiveBackgroundColor: '#ECF5FA',
    
      tabBarStyle: { height: 100, alignItems: 'center',  borderTopWidth: 0, paddingBottom: 0},
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="home" color={color} size={26}/>
        
      ),
      tabBarItemStyle: { paddingBottom: 10, paddingTop: 10 },
     
    }}
    />
    <Tab.Screen name="Novo Curriculo" 
    component={TelaCurriculo} 
    
      options={{
        tabBarLabel: '',
        headerShown: false,
        tabBarActiveBackgroundColor: '#F2EFF2',
        tabBarInactiveBackgroundColor: '#F2EFF2',
        tabBarStyle: { height: 100, alignItems: 'center', paddingBottom: 0, borderTopWidth: 0},
      tabBarIcon: ({ focused, size, color }) => (

       <ButtonNew size={size} color={color} focused={focused}/>
   
      )
    }}
    />

<Tab.Screen name="Curriculos" 
    component={ListaCurriculos} 
    
      options={{
        headerShown: false,
        tabBarItemStyle: { paddingTop: 10, paddingBottom: 40},
        tabBarActiveBackgroundColor: '#FFFF',
        tabBarInactiveBackgroundColor: '#FFFF',
        tabBarStyle: { height: 100, alignItems: 'center', paddingBottom: 0, borderTopWidth: 0},
      tabBarLabel: 'Curriculos',
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="folder-table-outline" size={26} color={color} />
      ),
      tabBarItemStyle: { paddingBottom: 10, paddingTop: 10 }
    }}
    />
   </Tab.Navigator>

  );
}

function StackScreen(){
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name='TelaHome' component={TelaHome} options={{ title: 'Home' }}/>
      <Stack.Screen name="ListaCurriculos" component={ListaCurriculos} />
   
    <Stack.Screen name='TelaCurriculo' component={TelaCurriculo} options={{ title: 'Criação' }}/>
    <Stack.Screen name='TelaPreview' component={TelaPreview} options={{ title: 'Preview' }}/>
  </Stack.Navigator>
  );
}



export default function App() {
  const [splashComplete, setSplashComplete] = useState(false);

  return ( 
    splashComplete
    ?
  <NavigationContainer>
    <TabNavigator/>   
          
        </NavigationContainer>
        : <Splash onComplete={setSplashComplete}/>
    
);

}