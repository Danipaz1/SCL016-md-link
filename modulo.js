  
let fs = require('fs');
let fetch = require('node-fetch');
let pathFile = require('path');
let markdownLinkExtractor = require('markdown-link-extractor');
let chalk = require('chalk');

/*let mdLinks = (pathFile, options = {validate:false}) => {

    let markdownLinkExtractor = require('markdown-link-extractor');
    let stats = fs.statSync(pathFile);
    let extName = path.extname(pathFile);
    

    if(extName === '.md'){
        let markdown = fs.readFileSync(pathFile).toString();
        let links = markdowndLinkExtractor(markdown);
        let arrayFetch = [];
        //recorrer links
        links.forEach(function (link) {
            console.log(link);
        })
}} 

mdLinks(pathFile).then(console.log);*/

//module.export = mdLinks;

let mdLinks = (path, options) => {

let abPath = pathFile.resolve(path);
let extName = pathFile.extname(path);
let stats = fs.statSync(path);
let throughDir = stats.isDirectory();


if(extName === '.md'){
let markdown = fs.readFileSync(abPath).toString();
let links = markdownLinkExtractor(markdown);

    const linkCallback = links.map ((link) => {
    return new Promise((resolve, reject) => {

        
        fetch(link.href)
        .then((response) => {

            if (response.status === 200) {
                resolve({
                    "Link": link.href,
                    "Validación": "Ok",
                    "Ruta": abPath,
                    "Texto": link.text,
                    
                })
            }
            else {
                resolve({
                    "Link": link.href,
                    "Validación": "Link not found",
                    "Ruta": abPath,
                    "Texto": link.text,
                })
            }
        })
        .catch(err => {
            resolve({
                "Link": link,
                "Validación": 'Link not found',
                "Ruta": abPath,
                "Texto": link.text,
            })
        })
});
});
return Promise.all(linkCallback)


}

else if (throughDir === true) {
    const readDir = fs.readdirSync(path)
    return (Promise.all(readDir.map((anyFile) => {
        const files = pathFile.join(abPath, anyFile);
        //agreagar option
        return mdLink(files);
    })).then(abArray => {
        let emptyArray = []

        for (let i= 0 ; i < abArray.length; i++){
            emptyArray = emptyArray.concat(abArray[i])
            }

        return emptyArray;
    })


    )

} else {
    return Promise.resolve([]);


}

}

if (require.index === module)
mdLink(process.argv[2]).then(console.log);

module.exports = mdLinks;
