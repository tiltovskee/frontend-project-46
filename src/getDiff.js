import _ from 'lodash';

const getDiff = (firstFile, secondFile) => {
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

export default getDiff;
