//fs.lstatSync(path).isDirectory()
//path.isAbsolute identifica si es absoluta o no
//path.resolve ruta absoluta
//fs.realpath si la ruta es original o no


/*let path = require('path');

let userPath = process.argv;
console.log(userPath);

//creacion de promesa basica

let myPromise = Promise.resolve('todo bien');

myPromise.then(res=> {
    console.log(res);
})

// creacion de nueva promesa




let myNewPromise = new Promise((resolve, rejects) => {
    setTimeout(() => resolve(10), 0);
    });
    
    myNewPromise.then(res=> {
        res = res*500;
        console.log(res);
    })

    let path = require("path");
    var fetch = require("node-fetch");

    const pathUser = process.argv[2];
    let absPath = path.resolve(pathUser);
    let mdFile = path.extname(absPath); */
//objetos en arreglos

let arraybla = [1,2,3];
let arrayobjeto = arraybla.forEach((elemento) => {
});

let array = ["0001|XXX", "0002|YYY", "0003|ZZZ"];

let resultado = array.map(function(elemento){
  let dividir = elemento.split("|");

 console.log({code: dividir[0], name: dividir[1]});
});


let fetch = require('node-fetch')

function ajaxPositive(response) {
    console.log('response.ok: ', response.ok);
    if(response.ok) {
      response.text().then(showResult);
    } else {
      showError('status code: ' + response.status);
      return false;
    }
  }

  console.log(ajaxPositive(response));

