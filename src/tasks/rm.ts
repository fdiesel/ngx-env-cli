import { AssetsEnvFile } from '../files/assets-env-file';
import { AssetsEnvTemplateFile } from '../files/assets-env-template-file';
import { EnvProdFile } from '../files/env-prod-file';

export function rm(name: string) {
  new AssetsEnvFile().remove(name);
  new AssetsEnvTemplateFile().remove(name);
  new EnvProdFile().remove(name);
}
