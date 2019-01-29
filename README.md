# @hmcts/annotation-ui-lib 
Annotation code is in projects/annotation-ui-lib

### Running development application
- set environment variable to define if app connects to localhost or aat:
  ```
  export APP_ENV=local
  ```
- start app server
  ```
  yarn install; export S2S_SECRET={{insert secret here}}; export IDAM_SECRET={{insert secret here}}; export APP_ENV=local; yarn start-dev-proxy;
  ```
- start node server
  ```
  yarn install; export S2S_SECRET={{insert secret here}}; export IDAM_SECRET={{insert secret here}}; export APP_ENV=local; yarn watch-dev-node;
  ``` 
- go to http://localhost:3000 and the viewer should load the document.

### Building annotation library
- npm run package
- distributable will be created under dist/annotation-ui-lib

### Using as a dependency in your angular app
- add @hmcts/annotation-ui-lib as a dependency in package.json
- import HmctsEmViewerUiModule and declare it in your NgModule imports.

  For example:
  ```
  import { HmctsEmViewerUiModule } from 'annotation-ui-lib';

  @NgModule({
    imports: [
      ...,
      HmctsEmViewerUiModule,
    ]
  })
  ```
- import assets to your angular.json
  ```
    {
        "glob": "**/*",
        "input": "node_modules/@hmcts/annotation-ui-lib/assets",
        "output": "/assets"
    }
  ```
- and styles
  ```
  "styles": [
    "node_modules/@hmcts/annotation-ui-lib/assets/annotation-ui-theme.scss",
    ...
  ],
  ```
- import JS dependencies as scripts within angular.json
  ```
  "scripts": [
      "node_modules/@hmcts/annotation-ui-lib/assets/js/pdf.js",
      "node_modules/@hmcts/annotation-ui-lib/assets/js/pdf.worker.js",
      "node_modules/@hmcts/annotation-ui-lib/assets/js/pdf_viewer.js",
      "node_modules/@hmcts/annotation-ui-lib/assets/js/pdf-annotate.min.js"
      ...
  ]
  ```
- component entry point:
  ```
  <app-document-viewer
      [baseUrl]="'http://localhost:3000/api'"
      [annotate]="true"
      [pdfWorker]="'/public/javascripts/pdf-worker.js'"
      [url]="'https://dm-store-aat.service.core-compute-aat.internal/documents/35f3714e-30e0-45d6-b4fb-08f51c271f8e'"
  ></app-document-viewer>
  ```
