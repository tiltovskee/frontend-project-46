import yaml from 'yaml';

const parse = (rawData, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(rawData);
    case '.yaml':
    case '.yml':
      return yaml.parse(rawData);
    default:
      throw new Error(`This utility doesn't support parsing ${extension} files!`);
  }
};

export default parse;
