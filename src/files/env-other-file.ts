import { PathOrFileDescriptor } from 'fs';
import { EnvFile } from './env-file';

export class EnvOtherFile extends EnvFile {
  constructor(path: PathOrFileDescriptor) {
    super(path, {
      production: false
    });
  }

  protected serializeValue(name: string, value: string): string {
    return value;
  }
}
