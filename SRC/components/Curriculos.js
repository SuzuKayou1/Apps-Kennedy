import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Share, Alert, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import curriculosDB from './curriculosdb';
import * as Animatable from 'react-native-animatable';
import { Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Importando o hook useFocusEffect

export default function ListaCurriculos({ navigation }) {
  const [curriculos, setCurriculos] = useState([]);
  const [htmlPdf, setHtmlPdf] = useState('');

  const solicitarPermissao = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão negada para acessar a galeria de mídia e os arquivos.');
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
    }
  };

  const carregarCurriculos = () => {
    curriculosDB.buscarPdfCurriculos((data) => {
      setCurriculos(data);
    });
  };

  const visualizarCurriculo = (htmlPdf) => {
    setHtmlPdf(htmlPdf);
  };

  const voltarParaLista = () => {
    setHtmlPdf('');
  };

  const sharePDF = async (pdfFilename, htmlPdf) => {
    try {
      const uri = `${FileSystem.cacheDirectory}${pdfFilename}`;
      await FileSystem.writeAsStringAsync(uri, htmlPdf);
      await Share.share({ url: uri, title: 'Compartilhar PDF' });
    } catch (error) {
      console.error('Erro ao compartilhar PDF:', error);
    }
  };

  const confirmarExclusao = (pdfId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja excluir este PDF?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Excluir', onPress: () => excluirCurriculo(pdfId) },
      ],
      { cancelable: false }
    );
  };

  const excluirCurriculo = (pdfId) => {
    curriculosDB.excluirPdfCurriculo(pdfId);
    carregarCurriculos();
  };

  const atualizarLista = () => {
    carregarCurriculos();
  };

  // Atualizando a lista de currículos sempre que a tela é exibida
  useFocusEffect(
    React.useCallback(() => {
      solicitarPermissao();
      carregarCurriculos();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.pdfFilename}>{item.pdfFilename}</Text>
      <View style={styles.buttonPdf}>
        <TouchableOpacity style={styles.buttonPdf1} onPress={() => visualizarCurriculo(item.htmlPdf)}>
          <Entypo name="eye" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPdf2} onPress={() => sharePDF(item.pdfFilename, item.htmlPdf)}>
          <Entypo name="share" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPdf3} onPress={() => confirmarExclusao(item.id)}>
          <Entypo name="trash" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animatable.Text 
        style={styles.title}
        animation="fadeInDown"
        duration={1500}
      >Currículos</Animatable.Text>
      {htmlPdf ? (
        <>
          <WebView
            originWhitelist={['*']}
            source={{ html: htmlPdf }}
            style={{ flex: 1 }}
          />
          <TouchableOpacity style={styles.voltar} onPress={voltarParaLista}>
            <Entypo name="controller-fast-backward" size={24} color="black" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Animatable.View 
            style={styles.listContainer}
            animation="fadeInUp"
            duration={1500}
          >
            <FlatList
              data={curriculos}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </Animatable.View>
          <TouchableOpacity onPress={atualizarLista} style={styles.button}>
            <Text style={styles.buttonText}>Atualizar Lista</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFF',
    flex: 1,
  },
  item: {
    marginBottom: 30,
  },
  title: {
    fontSize: 43,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80
  },
  pdfFilename: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center', 
  },
  listContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 60,
  },
  buttonPdf: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonPdf1: {
    borderRadius: 20,
    padding: 3,
    marginTop: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#0495d4',
  },
  buttonPdf2: {
    borderRadius: 20,
    padding: 3,
    marginTop: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#00b02f',
  },
  buttonPdf3: {
    borderRadius: 20,
    padding: 3,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#b00000',
  },
  button: {
    marginBottom: 20,
    position: 'absolute',
    bottom: 20,
    left: 50,
    right: 50,
    backgroundColor: '#0396EB',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  voltar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});
