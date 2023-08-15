const db = require('../dbconnection');

function getAllCargos(callback){
    return db.query('SELECT * FROM cargos', callback);
}

function getCargosById(id, callback) {
    return db.query('SELECT * FROM cargos where CodCar=?', [id], callback);
}

function addCargo(car, callback) {
    return db.query('INSERT INTO cargos(Nombre) values(?)', [car.Nombre], callback);
}

function deleteCargo(id, callback) {
    return db.query('DELETE FROM cargos WHERE CodCar=?', [id], callback);
}

function updateCargo(id, car, callback) {
    return db.query('UPDATE cargos SET Nombre=? where CodCar=?', [car.Nombre, id], callback);
}

module.exports = {
    getAllCargos,
    getCargosById,
    addCargo,
    deleteCargo,
    updateCargo
};