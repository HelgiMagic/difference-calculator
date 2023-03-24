/* eslint-disable no-undef */
import genDiff from '../index.js';

const expected = `{
   - follow: false
     host: hexlet.io
   - proxy: 123.234.53.22
   - timeout: 50
   + timeout: 20
   + verbose: true
}`;

test('genDiff JSON', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expected);
});

test('genDiff YAML', () => {
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml')).toEqual(expected);
});
