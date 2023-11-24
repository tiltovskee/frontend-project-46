import path from 'node:path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process'; // пока что не знаю зачем это нужно

const parseFile = (fileName) => {
  const pathToFile = path.resolve(`${cwd()}/__fixtures__/${fileName}`);
  const fileData = readFileSync(pathToFile, 'utf8');
  if (fileName.endsWith('.json')) {
    const parsedData = JSON.parse(fileData);
    console.log(parsedData); // удалить
    return parsedData;
  }
  console.log('Файлы формата .yaml мы пока что не умеем парсить. Обратитесь в следующие шаги.');
  return null;
};

export default parseFile;
