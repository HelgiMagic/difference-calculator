/* eslint-disable import/extensions */
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

const genDiff = (filepath1, filepath2) => {
  const normFilepath1 = normalizeFilePath(filepath1);
  const normFilepath2 = normalizeFilePath(filepath2);
  if (extractFormat(filepath1) === 'json' && extractFormat(filepath2) === 'json') {
    const data = fs.readFileSync(normFilepath1);
    const data2 = fs.readFileSync(normFilepath2);
    const object1 = JSON.parse(data.toString());
    const object2 = JSON.parse(data2.toString());
    const keys = [...new Set([...Object.keys(object1), ...Object.keys(object2)])].sort();

    console.log('{');
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (has(object1, key) && !has(object2, key)) console.log(`  - ${key}: ${object1[key]}`);
      else if (!has(object1, key) && has(object2, key)) console.log(`  + ${key}: ${object2[key]}`);
      else if (object1[key] === object2[key]) console.log(`    ${key}: ${object1[key]}`);
      else if (object1[key] !== object2[key]) {
        console.log(`  - ${key}: ${object1[key]}`);
        console.log(`  + ${key}: ${object2[key]}`);
      }
    }
    console.log('}');
  }
};

export default genDiff;
