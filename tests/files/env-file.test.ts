import { existsSync, rmSync, rmdirSync } from 'fs';
import { dirname } from 'path';
import { EnvProdFile } from '../../src/files/env-prod-file';

const file = new EnvProdFile();

beforeEach(() => {
  if (existsSync(file.path.toString())) {
    rmSync(file.path.toString());
  }
  file.init();
});

describe('file', () => {
  describe('env-file', () => {
    test('regexp should return significant object', () => {
      const expected = {
        production: true
      };
      const actual = file.read().content;
      expect(actual).toEqual(expected);
    });
    test('should add to object', () => {
      const expected = {
        production: true,
        name: 'value'
      };
      file.add('name', 'value');
      const actual = file.read().content;
      expect(actual).toEqual(expected);
    });
  });
});

afterAll(() => {
  rmSync(file.path.toString());
  rmdirSync(dirname(file.path.toString()));
});
