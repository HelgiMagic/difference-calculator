import yaml from 'js-yaml';
import path from 'path';

const extractFormat = (filepath) => path.extname(filepath).slice(1);

const convertToObject = (filepath, file) => {
  switch (extractFormat(filepath)) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown format: '${extractFormat(filepath)}'!`);
  }
};

export default convertToObject;
