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
const myTest = fs.readFileSync(getFixturePath('expectedmytest.txt'), 'utf-8');

const recursive = genDiff(getFixturePath('file1hard.json'), getFixturePath('file2hard.json'));
const recursiveYaml = genDiff(getFixturePath('file1hard.yaml'), getFixturePath('file2hard.yml'));
const plain = genDiff(getFixturePath('file1hard.yaml'), getFixturePath('file2hard.yml'), 'plain');
const newTest = genDiff(getFixturePath('file1mytest.json'), getFixturePath('file2mytest.json'), 'stylish');
const tests = [
  { result: recursive, expected: expectedRecursive, name: 'standart' },
  { result: recursiveYaml, expected: expectedRecursive, name: 'yaml' },
  { result: newTest, expected: myTest, name: 'my test' },
  { result: plain, expected: expectedplain, name: 'plain format' },
];

test.each(tests)('gendiff $name', ({ result, expected }) => {
  expect(result).toEqual(expected);
});

test('gendiff json format', () => {
  const data = genDiff(getFixturePath('file1hard.yaml'), getFixturePath('file2hard.yml'), 'json');
  expect(() => JSON.parse(data)).not.toThrow();
});
