import path from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import makeTree from './makeTree.js';
import getFormater from './formatters/index.js';

const readFile = (pathToFile) => {
  const fullPath = path.resolve(cwd(), pathToFile);
  const fileData = readFileSync(fullPath, 'utf-8');
  const fileExtension = path.extname(fullPath);
  return parse(fileData, fileExtension);
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const firstFileContent = readFile(filepath1);
  const secondFileContent = readFile(filepath2);
  const tree = makeTree(firstFileContent, secondFileContent);
  const buildDiff = getFormater(outputFormat);
  return buildDiff(tree);
};

export default genDiff;
