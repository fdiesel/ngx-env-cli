import { PathOrFileDescriptor } from 'fs';
import { File } from './file';

export abstract class EnvFile extends File<any> {
  constructor(path: PathOrFileDescriptor, defaultObject: any) {
    super(
      path,
      /export const environment = ?\n?(?<object>{[\S\s]*?});/,
      defaultObject
    );
  }

  protected serializeName(name: string): string {
    return name;
  }

  protected deserializeContent(text: string): any {
    return eval('(' + text + ')');
  }

  protected serializeContent(content: any): string {
    return (
      'export const environment = ' +
      JSON.stringify(content, null, 2).replace(/"(.+)":/g, '$1:') +
      ';'
    );
  }

  public add(name: string, value: any): void {
    const { text, content } = this.read();
    content[this.serializeName(name)] = this.serializeValue(name, value);
    this.write(text, content);
  }

  public remove(name: string): void {
    const { text, content } = this.read();
    delete content[this.serializeName(name)];
    this.write(text, content);
  }
}
