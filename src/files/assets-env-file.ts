import { AssetsFile } from './assets-file';

export class AssetsEnvFile extends AssetsFile {
  constructor() {
    super('assets/env.js', [`window['env'] = window['env'] || {};`]);
  }

  protected serializeValue(name: string, value: string): string {
    return `'${value}'`;
  }
}
