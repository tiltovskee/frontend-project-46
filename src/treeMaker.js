import _ from 'lodash';

const makeTree = (firstFile, secondFile) => {
  const keysList = _.union(_.keys(firstFile), _.keys(secondFile));
  const tree = keysList.map((key) => {
    if (_.isObject(firstFile[key]) && _.isObject(secondFile[key])) {
      return { key, status: 'nested', children: makeTree(firstFile[key], secondFile[key]) };
    }
    if (!Object.hasOwn(firstFile, key)) {
      return { key, value: secondFile[key], status: 'added' };
    }
    if (!Object.hasOwn(secondFile, key)) {
      return { key, value: firstFile[key], status: 'deleted' };
    }
    if (firstFile[key] === secondFile[key]) {
      return { key, value: firstFile[key], status: 'unchanged' };
    }
    return {
      key,
      valueBefore: firstFile[key],
      valueAfter: secondFile[key],
      status: 'changed',
    };
  });
  return _.sortBy(tree, 'key');
};

export default makeTree;
