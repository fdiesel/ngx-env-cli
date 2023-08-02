import fs, { readdirSync } from 'fs';
import { AssetsEnvFile } from '../files/assets-env-file';
import { AssetsEnvTemplateFile } from '../files/assets-env-template-file';
import { EnvOtherFile } from '../files/env-other-file';
import { EnvProdFile } from '../files/env-prod-file';

function mkDirIfNotExists(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

export function init(): void {
  new AssetsEnvFile().init();
  new AssetsEnvTemplateFile().init();
  new EnvProdFile().init();
  const envFiles = readdirSync('environments', { withFileTypes: true })
    .map((file) => file.name)
    .filter((fileName) => fileName !== 'environment.ts');
  if (envFiles.length === 0) {
    new EnvOtherFile('environments/environment.development.ts').init();
  }
}
