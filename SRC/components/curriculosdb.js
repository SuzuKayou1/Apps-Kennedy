import * as SQLite from 'expo-sqlite';

const curriculosDB = {
    db: SQLite.openDatabase('curriculos.db'),

    criarTabelaPdfCurriculos() {
        this.db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS pdfCurriculos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    pdfFilename TEXT NOT NULL, 
                    htmlPdf TEXT
                )`,
                [],
                () => console.log('Tabela pdfCurriculos criada com sucesso'),
                (_, error) => console.error('Erro ao criar tabela pdfCurriculos: ', error)
            );

            // Adiciona a coluna htmlPdf se ela não existir
            tx.executeSql(
                `PRAGMA table_info(pdfCurriculos);`,
                [],
                (_, result) => {
                    let columnExists = false;
                    for (let i = 0; i < result.rows.length; i++) {
                        if (result.rows.item(i).name === 'htmlPdf') {
                            columnExists = true;
                            break;
                        }
                    }
                    if (!columnExists) {
                        tx.executeSql(
                            `ALTER TABLE pdfCurriculos ADD COLUMN htmlPdf TEXT;`,
                            [],
                            () => console.log('Coluna htmlPdf adicionada com sucesso'),
                            (_, error) => console.error('Erro ao adicionar coluna htmlPdf: ', error)
                        );
                    }
                },
                (_, error) => console.error('Erro ao verificar coluna htmlPdf: ', error)
            );
        });
    },

    buscarPdfCurriculos(callback) {
        this.db.transaction(tx => {
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
    },

    inserirPdfCurriculo(pdfFilename, htmlPdf) {
        this.db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO pdfCurriculos (pdfFilename, htmlPdf) VALUES (?, ?)',
                [pdfFilename, htmlPdf],
                (_, result) => console.log('PDF do currículo inserido com sucesso'),
                (_, error) => console.error('Erro ao inserir PDF do currículo: ', error)
            );
        });
    },

    excluirPdfCurriculo(pdfId) {
        this.db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM pdfCurriculos WHERE id = ?',
                [pdfId],
                (_, result) => console.log('PDF do currículo excluído com sucesso'),
                (_, error) => console.error('Erro ao excluir PDF do currículo: ', error)
            );
        });
        
    },
    excluirTabela() {
        this.db.transaction(tx => {
            tx.executeSql(
                'DROP TABLE IF EXISTS pdfCurriculos;',
                (_, result) => console.log('Tabela excluída com sucesso!'),
                (_, error) => console.error('Erro ao excluir tabela: ', error)
            );
        });
    }
};

curriculosDB.criarTabelaPdfCurriculos(); // Chama o método para criar a tabela assim que o objeto é criado

export default curriculosDB;
