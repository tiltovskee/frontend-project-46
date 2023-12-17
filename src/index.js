import path from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import makeTree from './getDiff.js';
import formatStylish from './formatters/stylish.js';

const readFile = (pathToFile) => {
  const fullPath = path.resolve(cwd(), '__fixtures__', pathToFile);
  const fileData = readFileSync(fullPath, 'utf-8');
  const fileExtension = path.extname(fullPath);
  return parse(fileData, fileExtension);
};

const genDiff = (filepath1, filepath2) => {
  const firstFile = readFile(filepath1);
  const secondFile = readFile(filepath2);
  const tree = makeTree(firstFile, secondFile);
  return formatStylish(tree);
};

export default genDiff;
