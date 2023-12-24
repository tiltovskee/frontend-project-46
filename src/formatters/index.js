import toPlain from './plain.js';
import toStylish from './stylish.js';
import toJson from './json.js';

const getFormater = (format) => {
  switch (format) {
    case 'stylish':
      return toStylish;
    case 'plain':
      return toPlain;
    case 'json':
      return toJson;
    default:
      throw new Error(`Format ${format} is not supported!`);
  }
};

export default getFormater;
