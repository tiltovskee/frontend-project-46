import yaml from 'yaml';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.parse(data);
    default:
      throw new Error(`This utility doesn't support parsing ${format} files!`);
  }
};

export default parse;
