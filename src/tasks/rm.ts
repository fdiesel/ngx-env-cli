import { readdirSync } from 'fs';
import { AssetsEnvFile } from '../files/assets-env-file';
import { AssetsEnvTemplateFile } from '../files/assets-env-template-file';
import { EnvOtherFile } from '../files/env-other-file';
import { EnvProdFile } from '../files/env-prod-file';

export function rm(name: string) {
  new AssetsEnvFile().remove(name);
  new AssetsEnvTemplateFile().remove(name);
  new EnvProdFile().remove(name);
  readdirSync('environments', { withFileTypes: true })
    .map((file) => file.name)
    .filter((fileName) => fileName !== 'environment.ts')
    .forEach((fileName) =>
      new EnvOtherFile('environments/' + fileName).remove(name)
    );
}
