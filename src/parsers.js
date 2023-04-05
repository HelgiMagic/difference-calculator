import yaml from 'js-yaml';

const convertToObject = (file, extractFormat) => {
  switch (extractFormat) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown format: '${extractFormat}'!`);
  }
};

export default convertToObject;
