const db = require('../dbconnection');

function getAllTiendas(callback) {
    return db.query('SELECT * FROM sucursales', callback);
}

function getTiendaById(id, callback){
    return db.query(`SELECT * FROM sucursales WHERE CodSuc = ${id}`, callback);
}

function addTienda(tienda, callback) {
    return db.query(`INSERT INTO sucursales
        (Direccion, Latitud, Longitud) values
        ('${tienda.Direccion}', ${tienda.Latitud}, ${tienda.Longitud}) 
    `, callback);
}

function deleteTienda(id, callback){
    return db.query(`DELETE FROM sucursales WHERE CodSuc = ${id}`, callback);
}

function editTienda(id, tienda, callback){
    return db.query(`UPDATE sucursales SET 
    Direccion = '${tienda.Direccion}', Latitud = '${tienda.Latitud}', 
    Longitud = ${tienda.Longitud} WHERE CodSuc = ${id}`, callback);
}

module.exports = {
    getAllTiendas,
    getTiendaById,
    addTienda,
    deleteTienda,
    editTienda
};