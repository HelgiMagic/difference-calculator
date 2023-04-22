import path from 'path';
import fs from 'fs';
import convertToObject from './parsers.js';
import formatTree from './formatters/index.js';
import generateComparedTree from './tree-generator.js';

const extractFormat = (filePath) => path.extname(filePath).slice(1);

const getFullFilePath = (filePath) => path.resolve(filePath);

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const fullFilePath1 = getFullFilePath(filePath1);
  const fullFilePath2 = getFullFilePath(filePath2);

  const file1 = fs.readFileSync(fullFilePath1);
  const file2 = fs.readFileSync(fullFilePath2);

  const file1exFormat = extractFormat(fullFilePath1);
  const file2exFormat = extractFormat(fullFilePath2);

  const object1 = convertToObject(file1, file1exFormat);
  const object2 = convertToObject(file2, file2exFormat);

  const tree = generateComparedTree(object1, object2);
  return formatTree(tree, format);
};

export default genDiff;
