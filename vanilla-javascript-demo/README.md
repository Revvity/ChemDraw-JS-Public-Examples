# Using ChemDraw JS with Vanilla JavaScript

Example of how to use the ChemDraw JS library with vanilla JavaScript and HTML5.

This example demonstrates how to load the ChemDraw JS library when installed as an npm package. It is based on the example in the __ChemDraw JS Developer's Guide__. For a project without npm the same code can be used, just change the URL to the library as appropriate.

# Getting started with ChemDraw JS and Parcel

## Installing ChemDraw JS

You should have received three files as part of your ChemDraw JS subscription:

1. An npm package as a .tgz file
2. A license as an XML file
3. A ChemDraw Web Service (CDWS) docker image

For this demo, copy the license and npm package into /dependencies. The npm package will need to be renamed as `chemdraw-js.tgz`.

For full functionality, the web service will need to be run using Docker. Map port 80 in the Docker image to 8080 on your machine, e.g.:
```
docker load --input chemdraw-web-service-2.2.0-develop-1150.tar.gz
docker run -d -p 8080:80 pkiinformatics/chemdraw-web-service:2.2.0-develop-1150
```

## Bundling with Parcel

You can then use the static-files-copy plugin and a small piece of configuration added to package.json to automate the process of copying the ChemDraw JS library as part of the bundling process.

Install the plugin using as a development dependency:

`npm install --save-dev parcel-plugin-static-files-copy`

Configure the plugin by adding the following entry to your project's package.json:

```
"staticFiles": {
    "staticPath": [
      {
        "staticPath": "../dependencies/chemdraw-js-license.xml",
        "staticOutDir": "assets"
      },
      {
        "staticPath": "chemdraw-js.config.json",
        "staticOutDir": "assets"
      },
      {
        "staticPath": "node_modules/@pki-chemistry/chemdraw-js/dist/chemdrawweb",
        "staticOutDir": "assets/chemdrawweb"
      }
    ],
    "watcherGlob": "**"
}
```

## Running ChemDraw JS

To run the demo using a terminal starting at the repository root directory:

- cd to the project directory: `cd vanilla-javascript-demo`
- Install project dependencies using npm: `npm ci`
- Start the development server: `npm start`
