import { EnvFile } from './env-file';

export class EnvProdFile extends EnvFile {
  constructor() {
    super('./environments/environment.ts', {
      production: true
    });
  }

  protected serializeValue(name: string, value: string): string {
    return `window['env']['${name}'] || ${this.parseValue(value)}`;
  }
}
