import React from 'react';
import {View, Text, StyleSheet, Button, ImageBackground, Image} from 'react-native';
import KeyboardAvoidingComponent from './KeyBord';
import Preview from './Preview';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import * as SQLite from 'expo-sqlite';
import * as Animatable from 'react-native-animatable';

const Img2 = require("../../assets/2.png");
const Stack = createNativeStackNavigator();

function TelaCurriculo({route, navigation}){
    return(
      <KeyboardAvoidingComponent navigation={navigation} route={route}/>
    );
}
  
   
function TelaPreview({route ,navigation}){
    return(
        <Preview navigation={navigation} route={route}/>
    );
}

function StackScreen(){
    return (
      <Stack.Navigator>
    
      <Stack.Screen name='TelaCurriculo' component={TelaCurriculo} options={{ title: 'Criação' }}/>
      <Stack.Screen name='TelaPreview' component={TelaPreview} options={{ title: 'Preview' }}/>
    </Stack.Navigator>
    );
}

export default function TelaHome(props){
    const[fontsLoaded] = useFonts ({
      Montserrat_400Regular,
      Montserrat_500Medium,
      Montserrat_600SemiBold,
      Montserrat_700Bold
    })
    if(!fontsLoaded){
      return null
    }
    return(
        <View style={styles.container}>
          <ImageBackground source={require('../../assets/bkg.png')}
          style={styles.imgbkg}> 
        
            <Animatable.Text
              style={styles.header}
              animation="fadeInDown"
              duration={1500}
            >
              Olá!
            </Animatable.Text>

            <Animatable.Image
              source={Img2}
              style={styles.image}
              animation="fadeInDown"
              duration={1500}
            />

            <Animatable.Text
              style={styles.paragraph}
              animation="fadeInUp"
              duration={1500}
            >
              Vamos criar um currículo adaptado para as maiores plataformas de IA do mercado com facilidade?
            </Animatable.Text>

            <Animatable.Text
              style={styles.frase}
              animation="fadeInUp"
              duration={1500}
            >
              Clique aqui e vamos começar!
            </Animatable.Text>
    
          </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42b5d2',
  },
  header: {
    fontSize: 35,
    fontFamily: 'Montserrat_700Bold',
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5, 
    marginTop: 50,
  },
  image: {
    width: 300, 
    height: 300,
    alignSelf: 'center',
    marginTop: 20,
  },
  paragraph: {
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
    maxWidth: 380,
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 70,
    alignSelf: 'center',
    textAlign: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5, 
  },
  frase: {
    fontFamily:'Montserrat_700Bold',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 65,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#230B41',
  },
  curriculos: {
    marginBottom: 500
  },
  imgbkg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
