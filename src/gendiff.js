import { cwd } from 'process';
import path from 'path';
import has from 'lodash/has.js';
import fs from 'fs';
import convertToObject from './parsers.js';
import formatTree from './formatters/index.js';

const isAbsolute = (filepath) => filepath.startsWith('/');
const normalizeFilePath = (filepath) => {
  if (isAbsolute(filepath)) return filepath;
  return path.resolve(cwd(), filepath);
};
const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const generateComparedTree = (object1, object2) => {
  const keys = [...new Set([...Object.keys(object1), ...Object.keys(object2)])].sort();

  const result = keys.map((key) => {
    const value = [];
    if (isObject(object1[key]) && isObject(object2[key])) {
      return {
        name: key, isChanged: 'changed inside', value, children: generateComparedTree(object1[key], object2[key]),
      };
    } if (isObject(object1[key]) && has(object2, key)) {
      return {
        name: key, isChanged: 'changed', value: [object2[key]], children: generateComparedTree(object1[key], object1[key]),
      };
    } if (has(object1, key) && isObject(object2[key])) {
      return {
        name: key, isChanged: 'changed to obj', value: [object1[key]], children: generateComparedTree(object2[key], object2[key]),
      };
    } if (isObject(object1[key])) {
      return {
        name: key, isChanged: 'deleted', value, children: generateComparedTree(object1[key], object1[key]),
      };
    } if (isObject(object2[key])) {
      return {
        name: key, isChanged: 'added', value, children: generateComparedTree(object2[key], object2[key]),
      };
    }
    if (has(object1, key) && !has(object2, key)) {
      return {
        name: key,
        isChanged: 'deleted',
        value: [object1[key]],
      };
    } if (!has(object1, key) && has(object2, key)) {
      return {
        name: key,
        isChanged: 'added',
        value: [object2[key]],
      };
    } if (object1[key] === object2[key]) {
      return {
        name: key,
        isChanged: 'not changed',
        value: [object1[key]],
      };
    } if (object1[key] !== object2[key]) {
      return {
        name: key,
        isChanged: 'changed',
        value: [object1[key], object2[key]],
      };
    }
    return 'error';
  });

  return result;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const normFilepath1 = normalizeFilePath(filepath1);
  const normFilepath2 = normalizeFilePath(filepath2);
  const file1 = fs.readFileSync(normFilepath1);
  const file2 = fs.readFileSync(normFilepath2);
  const object1 = convertToObject(normFilepath1, file1);
  const object2 = convertToObject(normFilepath2, file2);
  const tree = generateComparedTree(object1, object2);
  const result = formatTree(tree, format);
  return result;
};

export default genDiff;
