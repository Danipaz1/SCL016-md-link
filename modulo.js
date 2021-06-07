let fs = require('fs');
let fetch = require('node-fetch');
let path = require('path');
let chalk = require('chalk');
let markdowndLinkExtractor = require('markdown-link-extractor');


//RUTA ABS
const anyFile = process.argv[2];
let absPath = path.resolve(anyFile);

//Retornar extensión de archivo
let mdFile = path.extname(absPath);

//option --validate
let option = process.argv[3];





//const mdLinks = (ruta, options = {validate:false}) => {
//}


//Leer un archivo con ruta absoluta

const readAFile = (anyFile, options) => {


    return new Promise((resolve, reject) => {


        fs.readFile(anyFile, 'utf8', (err, document) => {

            if (mdFile === '.md') {
                //let pathLink = [].concat(absPath, links);
                //entries= Object.entries(pathLink);
                let links = markdowndLinkExtractor(document);
                let absPath = path.resolve(anyFile);
                let arrayLink = links.map((link) => {
                    return ({ absPath, link });

                })
                    //resolve (arrayLink);

                    

                if (options === '--validate') {

                    const arrayFetch = arrayLink.map((linkItem) => {
                        return fetch(linkItem.link)
                    })

                    Promise.allSettled(arrayFetch).then(res => {
                        res.forEach((resFetch, index) => {
                            //console.log(resFetch.status)
                            if (resFetch.status == 'rejected') {
                                //console.log(resFetch.reason.errno)
                                arrayLink[index].status = resFetch.reason.errno;

                            }
                            if (resFetch.status == 'fulfilled') {
                                //sconsole.log(resFetch.value.status)
                                arrayLink[index].status = resFetch.value.status

                            }

                            return arrayLink;
                        })

                        resolve(arrayLink)


                    })
                        .catch(err => reject(err))

                }

            }



        })

    })
        .then(file => console.log(file))
        .catch(err => console.log('Ingresa un archivo con extension .md', err));
}

module.exports = (anyFile, options) => {

    return readAFile(anyFile, options);
};














