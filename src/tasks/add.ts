import { AssetsEnvFile } from '../files/assets-env-file';
import { AssetsEnvTemplateFile } from '../files/assets-env-template-file';
import { EnvProdFile } from '../files/env-prod-file';

export function add(name: string, def: string): void {
  new AssetsEnvFile().add(name, def);
  new AssetsEnvTemplateFile().add(name, null);
  new EnvProdFile().add(name, def);
}
