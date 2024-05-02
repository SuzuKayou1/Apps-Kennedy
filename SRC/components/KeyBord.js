import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  ScrollView,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { obterPermissaoMediaLibrary } from './ObterPermissao'; // Importe a função de solicitação de permissão
import * as Animatable from 'react-native-animatable';

const KeyboardAvoidingComponent = (props) => {
  const [nome, setNome] = useState("");
  const [resumo, setResumo] = useState("");
  const [contato, setContato] = useState("");
  const [formacao, setFormacao] = useState("");
  const [skills, setSkills] = useState("");
  const [idiomas, setIdiomas] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [certificacoes, setCertificacoes] = useState("");
  const [softSkills, setSoftSkills] = useState("");

  useEffect(() => {
    // Solicita permissão ao montar o componente
    obterPermissaoMediaLibrary();
  }, []);

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
          <Animatable.Text
 style={styles.header}
animation="fadeInDown"
              duration={1500}
>Insira seus dados:</Animatable.Text>
<Animatable.View
animation="fadeInUp"
duration={1500}>
            <TextInput placeholder="Nome Completo" style={styles.textInput} keyboardType='default' value={nome} onChangeText={setNome} />
            <TextInput placeholder="Resumo - Ex: Idade, Profissao, Objetivos, etc" style={styles.textInput} keyboardType='default' value={resumo} onChangeText={setResumo} />
            <TextInput placeholder="Contato - Ex: Email, Celular/Wpp, Linkedin" style={styles.textInput} keyboardType='default' value={contato} onChangeText={setContato} multiline />
            <TextInput placeholder="Skills Relevantes - Ex: Linguagens, Areas de Especializacao" style={styles.textInput} keyboardType='default' value={skills} onChangeText={setSkills} multiline />
            <TextInput placeholder="Formação" style={styles.textInput} keyboardType='default' value={formacao} onChangeText={setFormacao} />
            <TextInput placeholder="Idiomas" style={styles.textInput} keyboardType='default' value={idiomas} onChangeText={setIdiomas} multiline />
            <TextInput placeholder="Experiências" style={styles.textInput} keyboardType='default' value={experiencia} onChangeText={setExperiencia} multiline />
            <TextInput placeholder="Certificações" style={styles.textInput} keyboardType='default' value={certificacoes} onChangeText={setCertificacoes} multiline />
            <TextInput placeholder="Soft Skills" style={styles.textInput} keyboardType='default' value={softSkills} onChangeText={setSoftSkills} multiline />
            <View style={styles.btnContainer}>
              <Button title="Salvar" onPress={() => props.navigation.navigate('TelaPreview', {
                nome: nome,
                resumo: resumo,
                contato: contato,
                formacao: formacao,
                skills: skills,
                idiomas: idiomas,
                experiencia: experiencia,
                certificacoes: certificacoes,
                softSkills: softSkills,
              })} />
            </View>
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#F2EFF2',
    
  },
  
  inner: {
    marginTop: 0,
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    alignSelf: 'center',
    color: '#230B41',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 48,
    marginTop: 25

  },
  textInput: {
    height: 40,
    alignSelf: 'stretch',
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    marginTop: 12,
    backgroundColor: 'white',
    borderRadius: 30,
    width: 300,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 200,
    

  },
});

export default KeyboardAvoidingComponent;
