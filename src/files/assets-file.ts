import Case from 'case';
import { PathOrFileDescriptor } from 'fs';
import { File } from './file';

export abstract class AssetsFile extends File<string[]> {
  constructor(path: PathOrFileDescriptor, defaultContent: string[]) {
    super(
      path,
      /\(function ?\(window\) ?\n?{([\S\s]*?)}\)\(this\);/,
      defaultContent
    );
  }

  protected serializeName(name: string): string {
    return `window['env']['${Case.camel(name)}']`;
  }

  protected deserializeContent(text: string): string[] {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');
  }

  protected serializeContent(content: string[]): string {
    return `(function (window) {\n  ` + content.join('\n  ') + `\n})(this);`;
  }

  public add(name: string, value: any): void {
    const { text, content } = this.read();
    const serializedName = this.serializeName(name);
    const exists =
      content.findIndex((item) => item.startsWith(serializedName)) !== -1;
    if (!exists) {
      content.push(`${serializedName} = ${this.serializeValue(name, value)};`);
      this.write(text, content);
    }
  }

  public remove(name: string): void {
    const { text, content } = this.read();
    const indexToDelete = content.findIndex((line) =>
      line.includes(this.serializeName(name))
    );
    if (indexToDelete !== -1) {
      content.splice(indexToDelete, 1);
      this.write(text, content);
    }
  }
}
