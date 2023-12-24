import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('resultStylish.txt');
const expectedPlain = readFile('resultPlain.txt');
const expectedJson = readFile('resultJson.txt');

const fileExtension = ['json', 'yml'];

test.each(fileExtension)('Test gendiff for %s files', (extension) => {
  const pathToFile1 = getFixturePath(`before.${extension}`);
  const pathToFile2 = getFixturePath(`after.${extension}`);
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(expectedStylish);
  expect(genDiff(pathToFile1, pathToFile2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(expectedJson);
});

test('Wrong format', () => {
  const pathToFile1 = getFixturePath('before.json');
  const pathToFile2 = getFixturePath('after.json');
  expect(() => {
    genDiff(pathToFile1, pathToFile2, 'mp3');
  }).toThrowError();
});

test('Wrong file type', () => {
  const pathToFile1 = getFixturePath('before.json');
  const pathToFile2 = getFixturePath('resultJson.txt');
  expect(() => {
    genDiff(pathToFile1, pathToFile2, 'stylish');
  }).toThrowError();
});
