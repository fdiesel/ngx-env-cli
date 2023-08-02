import Case from 'case';
import { AssetsFile } from './assets-file';

export class AssetsEnvFile extends AssetsFile {
  constructor() {
    super(
      'assets/env.js',
      `// do not edit\n(function (window) {\n  window['env'] = window['env'] || {};\n})(this);`
    );
  }

  protected parseLine(name: string, value: any): string {
    return `window['env']['${Case.camel(name)}'] = ${this.parseValue(value)};`;
  }

  protected includes(name: string): string {
    return `window['env']['${Case.camel(name)}']`;
  }
}
