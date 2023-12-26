import path from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import makeTree from './treeMaker.js';
import getFormater from './formatters/index.js';

const readFile = (pathToFile) => {
  const fullPath = path.resolve(cwd(), pathToFile);
  const fileData = readFileSync(fullPath, 'utf-8');
  const format = path.extname(fullPath).slice(1);
  return parse(fileData, format);
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);
  const tree = makeTree(fileContent1, fileContent2);
  const buildDiff = getFormater(outputFormat);
  return buildDiff(tree);
};

export default genDiff;
