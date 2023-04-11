import { cwd } from 'process';
import path from 'path';
import fs from 'fs';
import convertToObject from './parsers.js';
import formatTree from './formatters/index.js';
import generateComparedTree from './tree-generator.js';

const extractFormat = (filepath) => path.extname(filepath).slice(1);

const normalizeFilePath = (filepath) => path.resolve(cwd(), filepath);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const normFilepath1 = normalizeFilePath(filepath1);
  const normFilepath2 = normalizeFilePath(filepath2);
  const file1 = fs.readFileSync(normFilepath1);
  const file2 = fs.readFileSync(normFilepath2);
  const file1exFormat = extractFormat(normFilepath1);
  const file2exFormat = extractFormat(normFilepath2);
  const object1 = convertToObject(file1, file1exFormat);
  const object2 = convertToObject(file2, file2exFormat);
  const tree = generateComparedTree(object1, object2);
  const result = formatTree(tree, format);
  return result;
};

export default genDiff;
