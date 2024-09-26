import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const save = async (data) => {
    // Obtenha o caminho correto do arquivo
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const databaseFile = path.join(__dirname, './../database.json');

    // Leia o arquivo, atualize os dados e escreva novamente
    const currentData = JSON.parse(await readFile(databaseFile, 'utf-8'));
    currentData.push(data);

    await writeFile(databaseFile, JSON.stringify(currentData, null, 2));
};