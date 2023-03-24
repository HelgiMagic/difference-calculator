import { cwd } from 'process';
import path from 'path';
import has from 'lodash/has.js';
import fs from 'fs';
import convertToObject from './parsers.js';

const isAbsolute = (filepath) => filepath.startsWith('/');
const normalizeFilePath = (filepath) => {
  if (isAbsolute(filepath)) return filepath;
  return path.resolve(cwd(), filepath);
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
  const file1 = fs.readFileSync(normFilepath1);
  const file2 = fs.readFileSync(normFilepath2);
  const object1 = convertToObject(normFilepath1, file1);
  const object2 = convertToObject(normFilepath2, file2);
  const result = compare(object1, object2);
  console.log(result);
  return result;
};

export default genDiff;
