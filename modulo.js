  
let fs = require('fs');
let fetch = require('node-fetch');
let path = require('path');
let anyFile = process.argv[2];
let pathFile = path.resolve(anyFile);
let chalk = require('chalk');

let mdLinks = (ruta, options = {validate:false}) => {

    let mdLinkExtractor = require('markdown-link-extractor');
    let extName = path.extname(pathFile);
    let stats = fs.statSync(pathFile);

    if(extName === '.md'){
        let markdown = fs.readFile(pathFile).toString();
        let links = markdownLinkExtractor(markdown);
        let arrayFetch = [];
        console.log(links);
}} 
