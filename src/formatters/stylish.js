import _ from 'lodash';

const getIndent = (depth) => {
  const indent = ' ';
  const multiplier = 4;
  return indent.repeat((depth - 1) * multiplier);
};

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const entries = Object.entries(value);
  const string = entries.map(([childKey, childValue]) => `${getIndent(depth)}    ${childKey}: ${stringify(childValue, depth + 1)}`);
  return ['{', ...string, `${getIndent(depth)}}`].join('\n');
};

const toStylish = (tree) => {
  const iter = (node, depth) => {
    const data = node.map((item) => {
      switch (item.type) {
        case 'nested':
          return `${getIndent(depth)}    ${item.key}: ${iter(item.children, depth + 1)}`;
        case 'added':
          return `${getIndent(depth)}  + ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'deleted':
          return `${getIndent(depth)}  - ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth)}    ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'changed':
          return `${getIndent(depth)}  - ${item.key}: ${stringify(item.value1, depth + 1)}
${getIndent(depth)}  + ${item.key}: ${stringify(item.value2, depth + 1)}`;
        default:
          throw new Error(`Type ${item.type} is not allowed!`);
      }
    });
    return ['{', ...data, `${getIndent(depth)}}`].join('\n');
  };
  return iter(tree, 1);
};

export default toStylish;
