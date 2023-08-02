import { PathOrFileDescriptor } from 'fs';
import { File } from './file';

export abstract class AssetsFile extends File {
  constructor(path: PathOrFileDescriptor, defaultContent: string) {
    super(path, defaultContent, 'function (window)', '(this);');
  }
}
