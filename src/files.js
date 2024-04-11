const fs = require('fs');

const { isArgumentsObject } = require('util/types');

function leerArchivo(path) {
    const data = fs.readFileSync(path);
    const todos = JSON.parse(data).todos;
    return todos;
}

function escribirArchivo(path, info){
    const data = JSON.stringify ({'todos':info});
    fs.writeFileSync(path, data);
}

module.exports ={
    'leerArchivo':leerArchivo,
    'escribirArchivo': escribirArchivo
}

module.exports = {
    leerArchivo,
    escribirArchivo
}