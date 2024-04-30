import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Platform, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { excluirPdfCurriculo, buscarPdfCurriculos, inserirPdfCurriculo } from './curriculosdb';
import { db } from './curriculosdb';

const PAGE_SIZE = 10; // Número de PDFs carregados por página

export default function ListaPDFs() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Número da página atual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas disponíveis

  useEffect(() => {
    // Solicitar permissão ao montar o componente
    solicitarPermissao();

    // Buscar PDFs ao montar o componente
    buscarPdfCurriculos();
  }, []);

  // Função para solicitar permissão de armazenamento
  const solicitarPermissao = async () => {
    try {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permissão negada para acessar a galeria de mídia e os arquivos.');
        }
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
    }
  };

  // Função para buscar os PDFs do banco de dados SQLite
  const buscarPdfCurriculos = async () => {
    const db = SQLite.openDatabase('curriculos.db');
    const offset = (page - 1) * PAGE_SIZE;
    const query = `SELECT * FROM pdfCurriculos ORDER BY id DESC LIMIT ${PAGE_SIZE} OFFSET ${offset}`;

    setLoading(true);

    try {
      const { rows } = await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            query,
            [],
            (_, result) => resolve(result),
            (_, error) => reject(error)
          );
        });
      });

      const data = rows._array;

      if (data.length > 0) {
        setPdfs(data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar PDFs: ', error);
      setLoading(false);
    }
  };

  // Função para carregar mais PDFs quando o usuário rolar até o final da lista
  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Função para excluir o PDF
  const excluirPDF = async (pdfId) => {
    try {
      // Excluir PDF do banco de dados
      await excluirPdfCurriculo(pdfId);

      // Atualizar a lista de PDFs após a exclusão
      const newPdfs = pdfs.filter(pdf => pdf.id !== pdfId);
      setPdfs(newPdfs);

      // Informar ao usuário que o PDF foi excluído com sucesso
      Alert.alert('Sucesso', 'PDF excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir PDF: ', error);
    }
  };

  // Função para abrir o PDF
  const abrirPDF = async (pdfData) => {
    try {
      // Verificar se pdfData é uma string válida
      if (typeof pdfData !== 'string') {
        console.error('Dados do PDF inválidos');
        return;
      }

      // Solicitar permissão do usuário antes de abrir o arquivo
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Por favor, conceda permissão para acessar seus arquivos de mídia e PDFs.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
        return;
      }

      const pdfUri = `${FileSystem.cacheDirectory}curriculo_${Date.now()}.pdf`;
      await FileSystem.writeAsStringAsync(pdfUri, pdfData, { encoding: FileSystem.EncodingType.Base64 });
      await MediaLibrary.saveToLibraryAsync(pdfUri);
    } catch (error) {
      console.error('Erro ao abrir PDF: ', error);
    }
  };

  // Função para compartilhar o PDF
  const handleSharePDF = async (pdfData) => {
    try {
      // Verificar se pdfData é uma string válida
      if (typeof pdfData !== 'string') {
        console.error('Dados do PDF inválidos');
        return;
      }

      // Solicitar permissão do usuário antes de compartilhar o arquivo
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Por favor, conceda permissão para acessar seus arquivos de mídia e PDFs.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
        return;
      }

      // Gera o PDF
      const pdfUri = `${FileSystem.cacheDirectory}curriculo_${Date.now()}.pdf`;
      await FileSystem.writeAsStringAsync(pdfUri, pdfData, { encoding: FileSystem.EncodingType.Base64 });
      
      // Compartilha o PDF
      await MediaLibrary.shareAsync(pdfUri);
    } catch (error) {
      console.error('Erro ao compartilhar PDF: ', error);
    }
  };

  // Função para atualizar a lista de PDFs
  const atualizarListaPDFs = () => {
    setPage(1);
    buscarPdfCurriculos();
  };

  // Renderizar cada item da lista
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => abrirPDF(item.pdfData)}>
      <View style={styles.itemContainer}>
        <Text>{item.pdfFilename}</Text>
        <TouchableOpacity onPress={() => excluirPDF(item.id)}>
          <Text style={styles.excluirButton}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSharePDF(item.pdfData)}>
          <Text style={styles.exportarButton}>Exportar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginTop: 100, alignItems: 'center' }}> 
      <Text style={styles.text1}>Curriculos</Text>
     
      <FlatList 
        data={pdfs}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}_${index}`} // Adicionando uma chave única
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator />}
      />

<TouchableOpacity onPress={atualizarListaPDFs}>
        <Text style={styles.atualizarButton}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text1:{
    marginBottom: 20,
    fontSize: 40,
    fontWeight: 'bold'

  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  excluirButton: {
    marginLeft: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  exportarButton: {
    marginLeft: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  atualizarButton: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
});
