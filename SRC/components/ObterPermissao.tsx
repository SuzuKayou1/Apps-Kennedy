import * as MediaLibrary from 'expo-media-library';

async function obterPermissaoMediaLibrary() {
  try {
    // Verifica se já tem permissão
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === 'granted') {
      console.log('Permissão concedida para acessar a biblioteca de mídia.');
    } else {
      console.log('Permissão para acessar a biblioteca de mídia negada.');
    }
  } catch (error) {
    console.error('Erro ao solicitar permissão para acessar a biblioteca de mídia:', error);
  }
}

// Chama a função para solicitar permissão ao iniciar o aplicativo
obterPermissaoMediaLibrary();

export  {obterPermissaoMediaLibrary};
