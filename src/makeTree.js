import _ from 'lodash';

const makeTree = (firstFileData, secondFileData) => {
  const keysList = _.union(_.keys(firstFileData), _.keys(secondFileData));
  const tree = keysList.map((key) => {
    if (_.isObject(firstFileData[key]) && _.isObject(secondFileData[key])) {
      return { key, status: 'nested', children: makeTree(firstFileData[key], secondFileData[key]) };
    }
    if (!Object.hasOwn(firstFileData, key)) {
      return { key, value: secondFileData[key], status: 'added' };
    }
    if (!Object.hasOwn(secondFileData, key)) {
      return { key, value: firstFileData[key], status: 'deleted' };
    }
    if (firstFileData[key] === secondFileData[key]) {
      return { key, value: firstFileData[key], status: 'unchanged' };
    }
    return {
      key,
      valueBefore: firstFileData[key],
      valueAfter: secondFileData[key],
      status: 'changed',
    };
  });
  return _.sortBy(tree, 'key');
};

export default makeTree;
