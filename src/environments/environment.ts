// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //apiBaseUrl: 'https://freedom-api-com-br.umbler.net/api/v1/',
  apiBaseUrl: "http://localhost:8085/",
  token_header_key: "Authorization",
  access_token: "currentUser",
};
