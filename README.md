# ChemDraw JS Examples

This repository contains examples of simple applications built using ChemDraw JS. The examples are intended to help developers understand how to incorporate ChemDraw JS into their own applications.

## Examples

### Webpack/Typescript/React

A simple application that uses webpack, TypeScript and React. Shows how to configure Webpack to load ChemDraw JS.

### JavaScript/HTML5

An example of how to use the ChemDraw JS library with vanilla JavaScript and HTML5.

## FAQ

### Is there an installer for ChemDraw JS?

We do not have an installer because ChemDraw JS is not an application. It is a library to help developers write applications that require chemical sketching.

You should receive four things with your ChemDraw JS subscription:

1. An npm package as a .tgz file - this should be installed with `npm install file:chemdraw-js-package.tgz`, where `chemdraw-js-package.tgz` is the path to the package.
2. A license in XML format - this must be passed in to the CDJS `attach()` function
3. A Docker image for the ChemDraw Web Service - this is an optional server-side component that provides additional functionality for CDJS
4. Documentation including a Developer's Guide and an API Reference

### Can I use ChemDraw JS without attaching it to the DOM?

ChemDraw JS is a sketcher, not a general chemistry engine. It is not possible to use ChemDraw JS without attaching it to the DOM.

The ChemDraw Web Service can be used for more general chemistry tasks, for example:

1. Converting between formats
2. Generating SVG images from chemistry data
3. Building reactions
4. Getting properties from chemistry data

Information on the available endpoints can be found at `/1.0/help`, e.g. http://localhost:8080/1.0/help

The CDWS API is private and subject to change at any time. Use this service at your own risk.
