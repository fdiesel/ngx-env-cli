import { EnvFile } from './env-file';

export class EnvProdFile extends EnvFile {
  constructor() {
    super(
      'environments/environment.ts',
      `export const environment = {\n  production: true,\n};`
    );
  }

  protected parseLine(name: string, value: any): string {
    return `${name}: window['env']['${name}'] || ${this.parseValue(value)}`;
  }

  protected includes(name: string): string {
    return `${name}: window['env']['${name}']`;
  }
}
