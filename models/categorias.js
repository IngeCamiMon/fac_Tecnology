const db = require('../dbconnection.js');

let categorias = {
    getAllCategorias,
    getCategoriaByID,
    addCategoria,
    deleteCategoria,
    updateCategoria
};

function getCategoriaByID(id, callback) {
    return db.query('SELECT * FROM categorias WHERE CodCat=?', [id], callback);
}

function getAllCategorias(callback) {
    return db.query('SELECT * FROM categorias', callback);
}

function addCategoria(cat, callback) {
    return db.query('INSERT INTO categorias(Nombre) values(?)',[cat.Nombre], callback);
}

function deleteCategoria(id, callback) {
    return db.query('DELETE FROM categorias WHERE CodCat=?', [id],callback);
}

function updateCategoria(id, cat, callback) {
    return db.query('UPDATE categorias SET Nombre=? where CodCat=?', [cat.Nombre, id], callback);
}

module.exports = categorias;