import { existsSync, mkdirSync, readdirSync } from 'fs';
import { AssetsEnvFile } from '../files/assets-env-file';
import { AssetsEnvTemplateFile } from '../files/assets-env-template-file';
import { EnvOtherFile } from '../files/env-other-file';
import { EnvProdFile } from '../files/env-prod-file';

function mkDirIfNotExists(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir);
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
  console.log(
    `add '<script src="assets/env.js"></script>' to your scripts in index.html`
  );
  console.log(
    `use command 'envsubst < assets/env.template.js > assets/env.js' when starting the application`
  );
  console.log(
    `docker nginx example: 'CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]'`
  );
}
