import * as SQLite from 'expo-sqlite';

// Abre ou cria o banco de dados SQLite
const db = SQLite.openDatabase('curriculos.db');

// Função para criar a tabela pdfCurriculos se não existir
const criarTabelaPdfCurriculos = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS pdfCurriculos (id INTEGER PRIMARY KEY AUTOINCREMENT, pdfFilename TEXT NOT NULL)'
        );
    });
};

// Função para buscar os PDFs do banco de dados
const buscarPdfCurriculos = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM pdfCurriculos',
            [],
            (_, { rows }) => {
                const data = rows._array;
                callback(data);
            },
            (_, error) => console.error('Erro ao buscar PDFs: ', error)
        );
    });
};

// Função para inserir um PDF de currículo no banco de dados
const inserirPdfCurriculo = (pdfFilename) => {
    // Gerar um número aleatório entre 1 e 1000 para adicionar ao nome do arquivo
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const nomeAleatorio = `curriculo_${randomNumber}`;

    // Adicionar o número aleatório ao nome do arquivo PDF
    const pdfFilenameAleatorio = `${nomeAleatorio}_${pdfFilename}`;

    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO pdfCurriculos (pdfFilename) VALUES (?)',
            [pdfFilenameAleatorio],
            (_, result) => console.log('PDF do currículo inserido com sucesso'),
            (_, error) => console.error('Erro ao inserir PDF do currículo: ', error)
        );
    });
};

// Função para excluir um PDF de currículo do banco de dados
const excluirPdfCurriculo = (pdfId) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM pdfCurriculos WHERE id = ?',
            [pdfId],
            (_, result) => console.log('PDF do currículo excluído com sucesso'),
            (_, error) => console.error('Erro ao excluir PDF do currículo: ', error)
        );
    });
};

export { buscarPdfCurriculos, inserirPdfCurriculo, excluirPdfCurriculo, criarTabelaPdfCurriculos, db};
