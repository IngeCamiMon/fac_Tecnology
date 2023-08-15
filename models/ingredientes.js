/**
 * Created by Jhoy on 24/04/2017.
 */
const db = require('../dbconnection');

function getAllIng(callback){
    return db.query('SELECT * FROM ingredientes', callback);
}

function getIngById(id, callback) {
    return db.query('SELECT * FROM ingredientes where CodIng=?', [id], callback);
}

function addIng(ing, callback) {
    return db.query('INSERT INTO ingredientes(Nombre) values(?)', [ing.Nombre], callback);
}

function deleteIng(id, callback) {
    return db.query('DELETE FROM ingredientes WHERE CodIng=?', [id], callback);
}

function updateIng(id, ing, callback) {
    return db.query('UPDATE ingredientes SET Nombre=? where CodIng=?', [ing.Nombre, id], callback);
}

module.exports = {
    getAllIng,
    getIngById,
    addIng,
    deleteIng,
    updateIng
};