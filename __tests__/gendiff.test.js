import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = fs.readFileSync(getFixturePath('expectedstylish.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expectedplain.txt'), 'utf-8');

const jsonExtension = [getFixturePath('file1hard.json'), getFixturePath('file2hard.json')];
const yamlExtension = [getFixturePath('file1hard.yaml'), getFixturePath('file2hard.yml')];

const tests = [
  { data: jsonExtension, name: 'json' },
  { data: yamlExtension, name: 'yaml' },
];

test.each(tests)('gendiff .$name', ({ data: [arg1, arg2] }) => {
  expect(genDiff(arg1, arg2)).toEqual(expectedStylish);
  expect(genDiff(arg1, arg2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(arg1, arg2, 'plain')).toEqual(expectedPlain);
  expect(() => JSON.parse(genDiff(arg1, arg2, 'json'))).not.toThrow();
});
