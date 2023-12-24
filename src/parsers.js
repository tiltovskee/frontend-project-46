import yaml from 'yaml';

const parse = (data, fileType) => {
  switch (fileType) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.parse(data);
    default:
      throw new Error(`This utility doesn't support parsing ${fileType} files!`);
  }
};

export default parse;
