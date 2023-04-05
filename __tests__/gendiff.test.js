/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedRecursive = fs.readFileSync(getFixturePath('expectedrecursive.txt'), 'utf-8');

const expectedplain = fs.readFileSync(getFixturePath('expectedplain.txt'), 'utf-8');
const jsonRecursive = fs.readFileSync(getFixturePath('expectedjson.txt'), 'utf-8');

test('gendiff JSON recursive', () => {
  expect(genDiff('__fixtures__/file1hard.json', '__fixtures__/file2hard.json')).toEqual(expectedRecursive);
});

test('gendiff YAML recursive', () => {
  expect(genDiff('__fixtures__/file1hard.yaml', '__fixtures__/file2hard.yml')).toEqual(expectedRecursive);
});

test('gendiff YAML plain recursive', () => {
  expect(genDiff('__fixtures__/file1hard.yaml', '__fixtures__/file2hard.yml', 'plain')).toEqual(expectedplain);
});

test('gendiff YAML JSON recursive', () => {
  expect(genDiff('__fixtures__/file1hard.yaml', '__fixtures__/file2hard.yml', 'json')).toEqual(jsonRecursive);
});
