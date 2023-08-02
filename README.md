# ngx-env-cli
cli to manage environment variables at runtime in angular

## Installation
```sh
npm i ngx-env-cli -g
```

## Usage
```
ngx-env init
```
Creates
- `assets/env.js`
- `assets/env.template.js`
- `environments/environment.ts`
- `environments/environment.development.ts`

Add `<script src="assets/env.js"></script>` to your `index.html`
```html
<!DOCTYPE html>
<html>
  <head>
    <script src="assets/env.js"></script>
  </head>
</html>
```

Use `envsubst` command to load environment variables

Docker nginx example: 

```Dockerfile
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
```
