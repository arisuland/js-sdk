# @arisuland/sdk
> ☔🕊️ **JavaScript client library for accessing Arisu's API, made in TypeScript**

## Monorepo Struture
The `@arisuland/sdk` monorepo is split into several packages:

- [@arisuland/sdk](https://github.com/arisuland/javascript-sdk/tree/master/packages/sdk) **~** Main package for Node.js users
- [@arisuland/sdk-browser](https://github.com/arisuland/javascript-sdk/tree/master/packages/sdk-browser) **~** Browser-specific package
- [Deno](https://github.com/arisuland/javascript-sdk/tree/master/packages/deno) **~** Main package for Deno users

## Usage
### Node.js
```js
// CommonJS
const { Client } = require('@arisuland/sdk');

// ES Modules
import { Client } from '@arisuland/sdk';

const client = new Client({
  baseURL: 'https://api.arisu.land', // Base URL of Tsubaki (edit this to your domain if self-hosting)
  accessKey: '' // Access key for authentication (https://docs.arisu.land/tsubaki/authentication#getting-access-key)
});

// Make a request to fetch a user
client
  .users('noel')
  .return([
    'name',
    'projects',
    ['avatarUrl', 512]
  ])
  .get();

/*
{
  "name": "Noel",
  "projects": [
    ...
  ],
  "avatarUrl": "..."
}
*/

// Query a user's profile from GraphQL
client.query(`
  query {
    users(username: "noel") {
      name
      projects
      avatarUrl(size: 512)
    }
  }
`);

/*
{
  "name": "Noel",
  "projects": [
    ...
  ],
  "avatarUrl": "..."
}
*/
```

### Browser
Add this to your `<head>` tag:

```html
<!-- You can replace `latest` with the version number, just in case a version fails or whatever -->
<script src="https://cdn.arisu.land/sdk-js/latest/sdk.min.js"></script>
```

```js
// You will now have access to the `Arisu` global
Arisu.defaults({
  baseURL: 'https://api.arisu.land', // Base URL of Tsubaki (edit this to your domain if self-hosting)
  accessKey: '' // Access key for authentication (https://docs.arisu.land/tsubaki/authentication#getting-access-key)
});

// Make a request to fetch a user
Arisu
  .users('noel')
  .return([
    'name',
    'projects',
    ['avatarUrl', 512]
  ]).get();

/*
{
  "name": "Noel",
  "projects": [
    ...
  ],
  "avatarUrl": "..."
}
*/
```

### Deno
Coming soon.

## Contributing
> If you want to contribute to this project, please read the [contributing guide](./.github/CONTRIBUTING.md).

## License
**@arisuland/sdk** is released under the **GPL-3.0** License. :3
