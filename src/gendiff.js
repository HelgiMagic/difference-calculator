import path from 'path';
import fs from 'fs';
import convertToObject from './parsers.js';
import formatTree from './formatters/index.js';
import generateComparedTree from './tree-generator.js';

const extractFormat = (filePath) => path.extname(filePath).slice(1);

const getAbsolutePath = (filePath) => path.resolve(filePath);

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const absolutePath1 = getAbsolutePath(filePath1);
  const absolutePath2 = getAbsolutePath(filePath2);

  const file1 = fs.readFileSync(absolutePath1);
  const file2 = fs.readFileSync(absolutePath2);

  const file1exFormat = extractFormat(absolutePath1);
  const file2exFormat = extractFormat(absolutePath2);

  const object1 = convertToObject(file1, file1exFormat);
  const object2 = convertToObject(file2, file2exFormat);

  const tree = generateComparedTree(object1, object2);
  return formatTree(tree, format);
};

export default genDiff;
