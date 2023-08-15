/**
 * Created by Jhoy on 24/04/2017.
 */
/**
 * Created by Jhoy on 24/04/2017.
 */
const db = require('../dbconnection');

function getAllProv(callback){
    return db.query('SELECT * FROM proveedores', callback);
}

function getProvById(id, callback) {
    return db.query('SELECT * FROM proveedores WHERE CodProv=?', [id], callback);
}

function getProvIng(id, callback) {
    return db.query(`SELECT i.* FROM prov_has_ingr p INNER JOIN ingredientes i 
    ON p.CodIng = i.CodIng
    WHERE p.CodProv = ?;`, [id], callback)
}

function addProv(prov, callback) {
    return db.query(`INSERT INTO proveedores(Nombre, Nit) 
    values('${prov.Nombre}', ${prov.Nit})`, callback);
}

function addProvIng(idProv, idIng, callback){
    return db.query('INSERT INTO prov_has_ingr VALUES(?,?)', [idIng, idProv], callback);
}

function deleteProv(id, callback) {
    return db.query('DELETE FROM proveedores WHERE CodProv=?', [id], callback);
}

function deleteProvIng(idProv, idIng, callback){
    return db.query('DELETE FROM prov_has_ingr WHERE CodProv=? AND CodIng=?', [idProv, idIng], callback);
}

function updateProv(id, prov, callback) {
    return db.query(`UPDATE proveedores SET Nombre='${prov.Nombre}', Nit=${prov.Nit} WHERE CodProv=${id}`, callback);
}

module.exports = {
    getAllProv,
    getProvById,
    addProv,
    deleteProv,
    updateProv,
    getProvIng,
    deleteProvIng,
    addProvIng
};