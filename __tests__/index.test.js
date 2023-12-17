import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('result.txt');

test('genDiff json files', () => {
  const pathToFile1 = getFixturePath('before.json');
  const pathToFile2 = getFixturePath('after.json');
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(expectedStylish);
});



// Не забыть протестировать, что дефолтный формат - стайлиш