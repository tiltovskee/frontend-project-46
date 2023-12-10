import path from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import getDiff from './getDiff.js';

const readFile = (pathToFile) => {
  const fullPath = path.resolve(cwd(), pathToFile);
  const fileData = readFileSync(fullPath, 'utf8');
  const fileExtension = path.extname(fullPath);
  return parse(fileData, fileExtension);
};

const genDiff = (filepath1, filepath2) => {
  const firstFile = readFile(filepath1);
  const secondFile = readFile(filepath2);
  return getDiff(firstFile, secondFile);
};

export default genDiff;
