import {
  PathOrFileDescriptor,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from 'fs';
import { dirname } from 'path';

export abstract class File<Content> {
  public readonly path: PathOrFileDescriptor;
  public readonly regexp: string | RegExp;
  public readonly defaultContent: Content;

  constructor(
    path: PathOrFileDescriptor,
    regexp: string | RegExp,
    defaultContent: Content
  ) {
    this.path = path;
    this.regexp = regexp;
    this.defaultContent = defaultContent;
  }

  protected abstract deserializeContent(text: string): Content;
  protected abstract serializeContent(content: Content): string;
  protected abstract serializeName(name: string): string;
  protected abstract serializeValue(name: string, value: string): string;
  public abstract add(name: string, value: any): void;
  public abstract remove(name: string): void;

  protected parseValue(value: any): string {
    return typeof value === 'string' ? `'${value}'` : value;
  }

  public init(): void {
    if (!existsSync(this.path.toString())) {
      mkdirSync(dirname(this.path.toString()), { recursive: true });
      const text = this.serializeContent(this.defaultContent);
      writeFileSync(this.path, text, { flag: 'w' });
    }
  }

  public read(): { text: string; content: Content } {
    const text = readFileSync(this.path).toString();
    const sigText = text.match(this.regexp)![1];
    const content = this.deserializeContent(sigText);
    return { text, content };
  }

  public write(oldText: string, content: any): void {
    const newSigText = this.serializeContent(content).replace(
      /"(window\['env'\]\[.+\] \|\| .+)"/,
      '$1'
    );
    const newText = oldText.replace(this.regexp, newSigText);
    writeFileSync(this.path, newText);
  }
}
