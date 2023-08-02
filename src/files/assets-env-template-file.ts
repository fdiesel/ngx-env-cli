import Case from 'case';
import { AssetsFile } from './assets-file';

export class AssetsEnvTemplateFile extends AssetsFile {
  constructor() {
    super('assets/env.template.js', [`window['env'] = window['env'] || {};`]);
  }

  protected serializeValue(name: string, value: string): string {
    return `'\${${Case.constant(name)}}'`;
  }
}
