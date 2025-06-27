# Using ChemDraw JS with Webpack, React and Typescript

This is an example of how to use the ChemDraw JS library with [Webpack](https://webpack.js.org/), [TypeScript](https://www.typescriptlang.org/) and [React](https://reactjs.org/).

This example demonstrates how to use the Webpack bundler to build a React application with ChemDraw JS. While it is currently not possible to bundle the ChemDraw JS library into an application, we can still take advantage of a bundler for our main application build process while managing ChemDraw JS as a static asset.

To install and run the demo using a terminal starting at the repository root directory:-
- cd to the project directory: `cd webpack-typescript-react-demo`
- Install project dependencies using npm: `npm ci`
- Start the development server: `npm start`

# Getting started with ChemDraw JS and Webpack

## Installing ChemDraw JS

You should have received three files as part of your ChemDraw JS subscription:

1. An npm package as a .tgz file
2. A license as an XML file
3. A ChemDraw Web Service (CDWS) docker image

For this demo:

1. Copy the license into /dependencies.
2. Run `npm install` to install dependencies
3. Install the npm package e.g. `npm install chemdraw-js-package.tgz` replacing "chemdraw-js-package.tgz" with the path to your ChemDraw JS package.

For full functionality, the web service will need to be run using Docker. Map port 80 in the Docker image to 8080 on your machine, e.g.:
```
docker load --input chemdraw-web-service-2.2.0-develop-1150.tar.gz
docker run -d -p 8080:80 pkiinformatics/chemdraw-web-service:2.2.0-develop-1150
```

## Bundling with Webpack

Because ChemDraw JS cannot be bundled directly into an application we recommend using a script tag in the html entry point of the application to load the library script.

First configure the [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) to copy the ChemDraw JS library to the webpack output. The `from` location should be set to the path to the library inside node_modules, while the `to` location should be set to a suitable location relative to the output path (In our example we use `assets/chemdrawweb`). By using this plugin the library will work correctly with a development server (e.g. webpack-dev-server) and a production build.

Once the copy is configured the script tag must be included in the output HTML. Our example uses the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) with the [html-webpack-template](https://github.com/jaketrent/html-webpack-template) to do this. The plugin is commonly used by webpack projects to dynamically generate HTML. The html-webpack-template package provides a template that provides extended options to the plugin. In our example we use the `script` entry to add a script tag to the applications HTML file.

```
plugins: [
  new CopyPlugin([{ from: "node_modules/@revvity-signals/chemdraw-js/dist/chemdrawweb", to: "assets/chemdrawweb"}]),
  new HtmlWebpackPlugin({
    title: "cdjs-webpack-demo",
    template: require("html-webpack-template"),
    scripts: ["http:/assets/chemdrawweb/chemdrawweb.js"]
  })
],
```

If you are providing your own HTML file without using a template generator you should include the following script tag in your HTML file:-

`<script src="http:/assets/chemdrawweb/chemdrawweb.js"></script>`
