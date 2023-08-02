import { PathOrFileDescriptor } from 'fs';
import { EnvFile } from './env-file';

export class EnvOtherFile extends EnvFile {
  constructor(path: PathOrFileDescriptor) {
    super(path, `export const environment = {\n  production: false,\n};`);
  }

  protected parseLine(name: string, value: any): string {
    return `${name}: ${this.parseValue(value)}`;
  }

  protected includes(name: string): string {
    return `${name}:`;
  }
}
