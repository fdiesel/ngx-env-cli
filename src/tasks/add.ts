import { readdirSync } from 'fs';
import { AssetsEnvFile } from '../files/assets-env-file';
import { AssetsEnvTemplateFile } from '../files/assets-env-template-file';
import { EnvOtherFile } from '../files/env-other-file';
import { EnvProdFile } from '../files/env-prod-file';

export function add(name: string, def: string): void {
  new AssetsEnvFile().add(name, def);
  new AssetsEnvTemplateFile().add(name, null);
  new EnvProdFile().add(name, def);
  readdirSync('environments', { withFileTypes: true })
    .map((file) => file.name)
    .filter((fileName) => fileName !== 'environment.ts')
    .forEach((fileName) =>
      new EnvOtherFile('environments/' + fileName).add(name, def)
    );
}
