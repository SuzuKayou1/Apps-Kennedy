
import * as SQLite from 'expo-sqlite';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export async function generatePDF(html) {
    return await printToFileAsync({
        html: html,
        base64: false
    });
}

export async function sharePDF(uri) {
    await shareAsync(uri);
}
