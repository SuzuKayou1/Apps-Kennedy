import React from 'react';
import { StyleSheet, ScrollView, Text, Button, View } from 'react-native';
import curriculosDB from './curriculosdb';
import { generatePDF, sharePDF } from './PDFUtils';

export default function Preview(props) {
    const { nome, resumo, contato, formacao, skills, idiomas, experiencia, certificacoes, softSkills } = props.route.params;

    // Funções para contar linhas e retornar uma linha específica do texto
    function contarLinhas(texto) {
        let linhas = texto.split(/\r\n|\r|\n/)
        return linhas.length
    }

    function Linhas(texto, indice) {
        let linhas = texto.split(/\r\n|\r|\n/)
        return linhas[indice]
    }

    // HTML do currículo
    const html = `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
          font-family: Arial, sans-serif;
          text-align: center;
          padding-top: 10%;
          padding-bottom: 10%;
      }

      .container {
          width: 80%;
          margin: auto;
          text-align: left;
          background-color: #f2f2f2;
          padding: 20px;
          border: 1px solid #ccc;
      }

      h1 {
          font-size: 24px;
      }

      h2 {
          font-size: 18px;
      }

      ul, ol {
          list-style: none;
          padding-left: 0;
      }
      #nome{
        text-align: center;
      }

      </style>
      <title>Currículo</title>
      </head>
      <body>
          <div class="container">
              <h1 id="nome">${nome}</h1>
              <hr>
              <h2>Resumo</h2>
              <p>${resumo}</p>
              <hr>
              <h2>Contato</h2>
              <ul>
                  <li>${Linhas(contato, 0)}</li>
                  ${contarLinhas(contato) == 2 ?
                    '<li>' + Linhas(contato, 1) + '</li>' : contarLinhas(contato) == 3 ?
                    '<li>' + Linhas(contato, 1) + '</li>' + '<li>' + Linhas(contato, 2) + '</li>': contarLinhas(contato) == 4 ?
                    '<li>' + Linhas(contato, 1) + '</li>' + '<li>' + Linhas(contato, 2) + '</li>' + '<li>' + Linhas(contato, 3) + '</li>': contarLinhas(contato) == 5 ?
                    '<li>' + Linhas(contato, 1) + '</li>' + '<li>' + Linhas(contato, 2) + '</li>' + '<li>' + Linhas(contato, 3) + '</li>' + Linhas(contato, 4) + '</li>': ''}
              </ul>
              <hr>
              <h2>Formação</h2>
              <ul>
                  <li>${formacao}</li>
              </ul>
              <hr>
              <h2>Skills</h2>
              <ul>
                  <li>${skills}</li>
                  ${contarLinhas(skills) == 2 ?
                    '<li>' + Linhas(skills, 1) + '</li>' : contarLinhas(skills) == 3 ?
                    '<li>' + Linhas(skills, 1) + '</li>' + '<li>' + Linhas(skills, 2) + '</li>': contarLinhas(skills) == 4 ?
                    '<li>' + Linhas(skills, 1) + '</li>' + '<li>' + Linhas(skills, 2) + '</li>' + '<li>' + Linhas(skills, 3) + '</li>': contarLinhas(skills) == 5 ?
                    '<li>' + Linhas(skills, 1) + '</li>' + '<li>' + Linhas(skills, 2) + '</li>' + '<li>' + Linhas(skills, 3) + '</li>' + Linhas(skills, 4) + '</li>': ''}
              </ul>
              <hr>
              <h2>Idiomas</h2>
              <ul>
                  <li>${idiomas}</li>
                  ${contarLinhas(idiomas) == 2 ?
                    '<li>' + Linhas(idiomas, 1) + '</li>' : contarLinhas(idiomas) == 3 ?
                    '<li>' + Linhas(idiomas, 1) + '</li>' + '<li>' + Linhas(idiomas, 2) + '</li>': contarLinhas(idiomas) == 4 ?
                    '<li>' + Linhas(idiomas, 1) + '</li>' + '<li>' + Linhas(idiomas, 2) + '</li>' + '<li>' + Linhas(idiomas, 3) + '</li>': contarLinhas(idiomas) == 5 ?
                    '<li>' + Linhas(idiomas, 1) + '</li>' + '<li>' + Linhas(idiomas, 2) + '</li>' + '<li>' + Linhas(idiomas, 3) + '</li>' + Linhas(idiomas, 4) + '</li>': ''}
              </ul>
              <hr>
              <h2>Experiências</h2>
              <ul>
                  <li>${experiencia}</li>
                  ${contarLinhas(experiencia) == 2 ?
                    '<li>' + Linhas(experiencia, 1) + '</li>' : contarLinhas(experiencia) == 3 ?
                    '<li>' + Linhas(experiencia, 1) + '</li>' + '<li>' + Linhas(experiencia, 2) + '</li>': contarLinhas(experiencia) == 4 ?
                    '<li>' + Linhas(experiencia, 1) + '</li>' + '<li>' + Linhas(experiencia, 2) + '</li>' + '<li>' + Linhas(experiencia, 3) + '</li>': contarLinhas(experiencia) == 5 ?
                    '<li>' + Linhas(experiencia, 1) + '</li>' + '<li>' + Linhas(experiencia, 2) + '</li>' + '<li>' + Linhas(experiencia, 3) + '</li>' + Linhas(experiencia, 4) + '</li>': ''}
              </ul>
              <hr>
              <h2>Certificações</h2>
              <ul>
                  <li>${certificacoes}</li>
                  ${contarLinhas(certificacoes) == 2 ?
                    '<li>' + Linhas(certificacoes, 1) + '</li>' : contarLinhas(certificacoes) == 3 ?
                    '<li>' + Linhas(certificacoes, 1) + '</li>' + '<li>' + Linhas(certificacoes, 2) + '</li>': contarLinhas(certificacoes) == 4 ?
                    '<li>' + Linhas(certificacoes, 1) + '</li>' + '<li>' + Linhas(certificacoes, 2) + '</li>' + '<li>' + Linhas(certificacoes, 3) + '</li>': contarLinhas(certificacoes) == 5 ?
                    '<li>' + Linhas(certificacoes, 1) + '</li>' + '<li>' + Linhas(certificacoes, 2) + '</li>' + '<li>' + Linhas(certificacoes, 3) + '</li>' + Linhas(certificacoes, 4) + '</li>': ''}
              </ul>
              <hr>
              <h2>Soft Skills</h2>
              <ul>
                  <li>${softSkills}</li>
                  ${contarLinhas(softSkills) == 2 ?
                    '<li>' + Linhas(softSkills, 1) + '</li>' : contarLinhas(softSkills) == 3 ?
                    '<li>' + Linhas(softSkills, 1) + '</li>' + '<li>' + Linhas(softSkills, 2) + '</li>': contarLinhas(softSkills) == 4 ?
                    '<li>' + Linhas(softSkills, 1) + '</li>' + '<li>' + Linhas(softSkills, 2) + '</li>' + '<li>' + Linhas(softSkills, 3) + '</li>': contarLinhas(softSkills) == 5 ?
                    '<li>' + Linhas(softSkills, 1) + '</li>' + '<li>' + Linhas(softSkills, 2) + '</li>' + '<li>' + Linhas(softSkills, 3) + '</li>' + Linhas(softSkills, 4) + '</li>': ''}
              </ul>
          </div>
      </body>
    </html>`;

    async function handleSharePDF() {
        try {
            // Gera o PDF
            const file = await generatePDF(html);

            // Nome do arquivo com o nome e um número aleatório
            const nomeArquivo = `${nome}_${Math.floor(Math.random() * 1000)}.pdf`;

            // Salva o nome do arquivo no banco de dados SQLite
            curriculosDB.inserirPdfCurriculo(nomeArquivo, html);

            // Compartilha o PDF
            await sharePDF(file.uri);
        } catch (error) {
            console.error('Erro ao compartilhar PDF:', error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{nome}</Text>
            <Text style={styles.hr} />
            <Text style={styles.topicos}>Resumo</Text>
            <Text style={styles.hr} />
            <Text style={styles.paragraph}>{resumo}</Text>
            <Text style={styles.hr} />
            <Text style={styles.topicos}>Contato</Text>
            <Text style={styles.hr} />
            <Text style={styles.paragraph}>{contato}</Text>
            <Text style={styles.hr} />
            <Text style={styles.topicos}>Formação</Text>
            <Text style={styles.hr} />
            <Text style={styles.paragraph}>{formacao}</Text>
            <Text style={styles.hr} />
            <Text style={styles.topicos}>Skills</Text>
            <Text style={styles.hr} />
            <Text style={styles.paragraph}>{skills}</Text>
            <Text style={styles.hr} />
            <Text style={styles.topicos}>Idiomas</Text>
            <Text style={styles.hr} />
            <Text style={styles.paragraph}>{idiomas}</Text>
            <Text style={styles.hr} />
            <Text style={styles.topicos}>Experiências</Text>
            <Text style={styles.hr} />
            <Text style={styles.paragraph}>{experiencia}</Text>
            <Text style={styles.hr} />
            <Text style={styles.topicos}>Certificações</Text>
            <Text style={styles.hr} />
            <Text style={styles.paragraph}>{certificacoes}</Text>
            <Text style={styles.hr} />
            <Text style={styles.topicos}>Soft Skills</Text>
            <Text style={styles.hr} />
            <Text style={styles.paragraph}>{softSkills}</Text>
            <View style={styles.button}>
                <Button title='Salvar' onPress={handleSharePDF} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        
        flexGrow: 1,
        backgroundColor: '#FFF',
        width: '100%',
    },
    header:{
        marginTop: 60,
        margin: 30,
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textAlign: 'center'

    },
    title: {
        margin: 30,
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textAlign: 'center'
    },
    paragraph: {
        margin: 24,
        fontSize: 14,
        fontFamily: 'Arial'
    },
    topicos: {
        margin: 24,
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 'bold',
    },
    hr: {
        height: 1,
        width: '100%',
        backgroundColor: 'black'
    },
    button: {
        height: 100,
        marginBottom: 10
    }
});
