# Using ChemDraw JS with Vanilla JavaScript

Example of how to use the ChemDraw JS library with vanilla JavaScript and HTML5.

This example demonstrates how to load the ChemDraw JS library when installed as an npm package. It is based on the example in the __ChemDraw JS Developer's Guide__. For a project without npm the same code can be used, just change the URL to the library as appropriate.

# Getting started with ChemDraw JS

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

You can use the cpr plugin and a small piece of configuration added to package.json to automate the process of copying license to where you need it.

Install the plugin using as a development dependency:

`npm install --save-dev cpr`

Configure the plugin by adding the following entry to your project's package.json:

```
  "scripts": {
    "postinstall": "cpr ../dependencies/chemdraw-js-license.xml  assets/ -o"
  }
```

## Running ChemDraw JS

To run the demo using a terminal starting at the repository root directory:

- cd to the project directory: `cd vanilla-javascript-demo`
- Install project dependencies using npm: `npm ci`
- Start the development server: `npm start`
