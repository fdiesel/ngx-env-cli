import { PathOrFileDescriptor } from 'fs';
import { File } from './file';

export abstract class EnvFile extends File {
  constructor(path: PathOrFileDescriptor, defaultContent: string) {
    super(path, defaultContent, 'export const environment', '};');
  }
}
