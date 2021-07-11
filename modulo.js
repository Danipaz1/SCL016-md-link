let fs = require('fs');
let fetch = require('node-fetch');
let path = require('path');
let markdowndLinkExtractor = require('markdown-link-extractor');

//RUTA ABS
const anyFile = process.argv[2];
let absolutePath = path.resolve(anyFile);

//Retornar extensión de archivo
let mdFile = path.extname(absolutePath);

//option --validate
let options = process.argv[3];

//Leer un archivo con ruta absoluta

const readAFile = (anyFile, options) => {


    return new Promise((resolve, reject) => {


        fs.readFile(anyFile, 'utf8', (err, document) => {
            let links = markdowndLinkExtractor(document);
            let absolutePath = path.resolve(anyFile);
            let arrayLink = links.map((link) => {
                return ({ absolutePath, link });

            })

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
                    })

                    resolve(arrayLink)


                })
                    .catch(err => reject(err))

            } else {

                if (mdFile === '.md') {

                    resolve(arrayLink);

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