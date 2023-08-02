import {
  PathOrFileDescriptor,
  existsSync,
  readFileSync,
  writeFileSync
} from 'fs';

export abstract class File {
  protected readonly path: PathOrFileDescriptor;
  protected readonly defaultContent: string;
  protected readonly contentPrefix: string;
  protected readonly contentSuffix: string;

  constructor(
    path: PathOrFileDescriptor,
    defaultContent: string,
    contentPrefix: string,
    contentSuffix: string
  ) {
    this.path = path;
    this.defaultContent = defaultContent;
    this.contentPrefix = contentPrefix;
    this.contentSuffix = contentSuffix;
  }

  protected abstract parseLine(name: string, value: any): string;
  protected abstract includes(name: string): string;

  protected parseValue(value: any): string {
    return typeof value === 'string' ? `'${value}'` : value;
  }

  private getContentPosition(lines: string[]): { start: number; end: number } {
    const start = lines.findIndex((line) => line.includes(this.contentPrefix));
    let end = start;
    for (let i = start; i < lines.length; i++) {
      if (lines[i].includes(this.contentSuffix)) {
        end = i;
        break;
      }
    }
    return { start, end };
  }

  public init(): void {
    if (!existsSync(this.path.toString())) {
      writeFileSync(this.path, this.defaultContent, { flag: 'w' });
    }
  }

  public add(name: string, value: any): void {
    const lines = this.read();
    const contentPosition = this.getContentPosition(lines);
    if (
      contentPosition.end > contentPosition.start + 1 &&
      !lines[contentPosition.end - 1].endsWith(',') &&
      !lines[contentPosition.end - 1].endsWith(';')
    ) {
      lines[contentPosition.end - 1] += ',';
    }
    lines.splice(contentPosition.end, 0, '  ' + this.parseLine(name, value));
    this.write(lines);
  }

  public remove(name: string): void {
    const lines = this.read();
    const filteredLines = lines.filter(
      (line) => !line.includes(this.includes(name))
    );
    this.write(filteredLines);
  }

  protected read(): string[] {
    return readFileSync(this.path).toString().split('\n');
  }

  protected write(lines: string[]): void {
    writeFileSync(this.path, lines.join('\n') + '\n');
  }
}
