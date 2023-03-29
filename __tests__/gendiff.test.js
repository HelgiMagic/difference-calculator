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
const expectedRecursive = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const plainRecursive = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test('genDiff JSON', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expected);
});

test('genDiff YAML', () => {
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml')).toEqual(expected);
});

test('gendiff JSON recursive', () => {
  expect(genDiff('__fixtures__/file1hard.json', '__fixtures__/file2hard.json')).toEqual(expectedRecursive);
});

test('gendiff YAML recursive', () => {
  expect(genDiff('__fixtures__/file1hard.yaml', '__fixtures__/file2hard.yml')).toEqual(expectedRecursive);
});

test('gendiff YAML plain recursive', () => {
  expect(genDiff('__fixtures__/file1hard.yaml', '__fixtures__/file2hard.yml', 'plain')).toEqual(plainRecursive);
});
