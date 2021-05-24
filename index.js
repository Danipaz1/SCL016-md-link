/*module.exports = () => {
  // ...
};*/

const mdLinks = require('./modulo.js');
let anyFile = process.argv[2];

"use strict";

let fs = require('fs');
let markdownLinkExtractor = require('markdown-link-extractor');

let markdown = fs.readFileSync('README.md').toString();

let links = markdownLinkExtractor(markdown);

links.forEach(function (link) {
    console.log(link);
});


