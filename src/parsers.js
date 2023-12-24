import yaml from 'yaml';

const parse = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.parse(data);
    default:
      throw new Error(`This utility doesn't support parsing ${extension} files!`);
  }
};

export default parse;
