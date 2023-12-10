import { test, expect } from '@jest/globals';
import getDiff from '../src/getDiff.js';
// import { fileURLToPath } from 'url';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('getDiff flat json files', () => {
  const obj1 = { key1: 'value1', key2: 2, key3: true };
  const obj2 = { key1: 'value1', key2: 22, key4: false };
  expect(getDiff(obj1, obj2)).toEqual(`{
    key1: value1
  - key2: 2
  + key2: 22
  - key3: true
  + key4: false
}`);
});
