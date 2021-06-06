let fs = require('fs');
let fetch = require('node-fetch');
let path = require('path');
let chalk = require('chalk');
let markdowndLinkExtractor = require('markdown-link-extractor');
//const { log } = require('console');


//RUTA ABS
const anyFile = process.argv[2];
let absPath = path.resolve(anyFile);

//Retornar extensión de archivo
let mdFile = path.extname(absPath);

//option --validate



//const mdLinks = (ruta, options = {validate:false}) => {
//}


//Leer un archivo con ruta absoluta

const readAFile = (anyFile, options ) => {

    return new Promise((resolve, reject) => {
        
        fs.readFile(anyFile, 'utf8', (err, document) => {      
            
            if (mdFile == '.md') {
                //let pathLink = [].concat(absPath, links);
                //entries= Object.entries(pathLink);
                let links = markdowndLinkExtractor(document);
                let options = process.argv[3];
                let absPath = path.resolve(anyFile);
                let arrayLink = links.map((link)=>{
                    return ({absPath, link});
                })
          
                //resolve(arrayLink);

                                            
                if(options === '--validate'){
                    const arrayFetch  = arrayLink.map((linkItem)=> {
                        return fetch(linkItem.link) 
                    })

                    Promise.allSettled(arrayFetch).then(res => {
                        res.forEach((resFetch, index)  => {
                            //console.log(resFetch.status)
                            if(resFetch.status == 'rejected'){
                                //console.log(resFetch.reason.errno)
                                arrayLink[index].status = resFetch.reason.errno;

                            }
                            if(resFetch.status == 'fulfilled'){
                                //sconsole.log(resFetch.value.status)
                                arrayLink[index].status = resFetch.value.status
                            }

                        })
                        resolve(arrayLink);
                        
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

mdLinks(pathFile).then(console.log);

//module.export = mdLinks;

let mdLinks = (path, options = {validate: false}) => {

let abPath = pathFile.resolve(path);
let extName = pathFile.extname(path);
let stats = fs.statSync(path);
let throughDir = stats.isDirectory();


if(extName === '.md'){
let markdown = fs.readFileSync(abPath).toString();
let links = markdownLinkExtractor(markdown);
let arrayFetch = [];
//recorrer lineas
for(let i=0; i < links.length; i++){
    const text = links[i].text;
    const url= links[i];
//mostrar cuales estan rotos
let linkFetch = h(fetclinks[i])
    .then(res=>{
    if(process.argv[3] === '--validate'){
        let infoLinks = {
            link:res.url,
            texto: text,
            ruta: ruta,
            status:res.status,
            statusText: res.statusText  
        };
        return infoLinks;
    }else{
        let infoLinks = {
            links:res.url,
            texto: text,
            ruta: ruta
        }
        return infoLinks;
    }    
    })
    .catch(error =>{
        let fail = {
            urlLink: url,
            satusLink:"error",
        }
        return fail;   
    })
    arrayFetch.push(linkFetch);
}

return Promise.all(arrayFetch);

}else if(stats.isDirectory()=== true){
    let recursividad = fs.readdirSync(ruta)
    return(Promise.all(recursividad.map(elemento =>{
    let recur = path.join(ruta, elemento)
    return mdLinks(recur)
})))
}else{
    console.log(chalk.red('El archivo debe ser en formato .md'));
}

};

module.export = mdLinks;*/