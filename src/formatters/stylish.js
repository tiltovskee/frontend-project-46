import _ from 'lodash';

const getIndent = (depth) => {
  const indent = ' ';
  const multiplier = 4;
  return indent.repeat(depth * multiplier - 2);
};

const getIndentForBrackets = (depth) => {
  const indent = ' ';
  const multiplier = 4;
  return indent.repeat((depth - 1) * multiplier);
};

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const entries = Object.entries(value);
  const strFromObj = entries.map((pair) => `${getIndent(depth)}  ${pair[0]}: ${stringify(pair[1], depth + 1)}`);
  return ['{', ...strFromObj, `${getIndentForBrackets(depth)}}`].join('\n');
};

const formatStylish = (tree) => {
  const iter = (node, depth) => {
    const data = node.map((item) => {
      const {
        key,
        status,
        children,
        value,
        valueBefore,
        valueAfter,
      } = item;
      switch (status) {
        case 'nested':
          return `${getIndent(depth)}  ${key}: ${iter(children, depth + 1)}`;
        case 'added':
          return `${getIndent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${getIndent(depth)}- ${key}: ${stringify(valueBefore, depth + 1)}
${getIndent(depth)}+ ${key}: ${stringify(valueAfter, depth + 1)}`;
        default:
          throw new Error(`Status ${status} not allowed!`);
      }
    });
    return ['{', ...data, `${getIndentForBrackets(depth)}}`].join('\n');
  };
  return iter(tree, 1);
};

export default formatStylish;
