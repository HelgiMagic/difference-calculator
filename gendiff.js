import fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import has from 'lodash/has.js';

const isAbsolute = (filepath) => filepath.startsWith('/');
const normalizeFilePath = (filepath) => {
  if (isAbsolute(filepath)) return filepath;
  return path.resolve(cwd(), filepath);
};
const extractFormat = (filepath) => path.extname(filepath).slice(1);
const convertToObject = (filepath) => {
  switch (extractFormat(filepath)) {
    case 'json':
      return JSON.parse(fs.readFileSync(filepath));
    default:
      throw new Error(`Unknown format: '${extractFormat(filepath)}'!`);
  }
};

const compare = (object1, object2) => {
  const keys = [...new Set([...Object.keys(object1), ...Object.keys(object2)])].sort();
  const result = keys.reduce((acc, key) => {
    if (has(object1, key) && !has(object2, key)) acc.push(`- ${key}: ${object1[key]}`);
    else if (!has(object1, key) && has(object2, key)) acc.push(`+ ${key}: ${object2[key]}`);
    else if (object1[key] === object2[key]) acc.push(`  ${key}: ${object1[key]}`);
    else if (object1[key] !== object2[key]) {
      acc.push(`- ${key}: ${object1[key]}`);
      acc.push(`+ ${key}: ${object2[key]}`);
    }
    return acc;
  }, ['{']);
  return `${result.join('\n   ')}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const normFilepath1 = normalizeFilePath(filepath1);
  const normFilepath2 = normalizeFilePath(filepath2);
  const object1 = convertToObject(normFilepath1);
  const object2 = convertToObject(normFilepath2);
  const result = compare(object1, object2);
  console.log(result);
  return result;
};

export default genDiff;
