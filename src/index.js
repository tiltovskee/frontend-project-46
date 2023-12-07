import path from 'node:path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { parse } from 'yaml';
import _ from 'lodash';

const parseFile = (filePath) => {
  const resolvedFilePath = path.resolve(cwd(), filePath);
  const fileExtension = path.extname(resolvedFilePath);
  const fileData = readFileSync(resolvedFilePath, 'utf8');
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileData);
    case '.yaml':
      return parse(fileData);
    case '.yml':
      return parse(fileData);
    default:
      throw new Error(`This utility doesn't support parsing ${fileExtension} files!`);
  }
};

const genDiff = (firstFilePath, secondFilePath) => {
  const firstFile = parseFile(firstFilePath);
  const secondFile = parseFile(secondFilePath);
  const listOfKeys = _.union(_.keys(firstFile), _.keys(secondFile));
  const differencies = listOfKeys.reduce((acc, key) => {
    const newAcc = { key };
    if (!Object.hasOwn(firstFile, key)) {
      newAcc.value = secondFile[key];
      newAcc.status = 'added';
      acc.push(newAcc);
      return acc;
    }
    if (!Object.hasOwn(secondFile, key)) {
      newAcc.value = firstFile[key];
      newAcc.status = 'deleted';
      acc.push(newAcc);
      return acc;
    }
    if (firstFile[key] === secondFile[key]) {
      newAcc.value = firstFile[key];
      newAcc.status = 'unchanged';
      acc.push(newAcc);
      return acc;
    }
    newAcc.value = secondFile[key];
    newAcc.status = 'changed';
    acc.push(newAcc);
    return acc;
  }, []);
  const sortedDifferencies = _.sortBy(differencies, 'key');
  const diffOut = sortedDifferencies.map((node) => {
    switch (node.status) {
      case 'added':
        return `  + ${node.key}: ${node.value}`;
      case 'deleted':
        return `  - ${node.key}: ${node.value}`;
      case 'unchanged':
        return `    ${node.key}: ${node.value}`;
      case 'changed':
        return `  - ${node.key}: ${firstFile[node.key]}
  + ${node.key}: ${secondFile[node.key]}`;
      default:
        throw new Error(`Status ${node.status} doesn't declared!`);
    }
  }).join('\n');
  return `{
${diffOut}
}`;
};

export default genDiff;
