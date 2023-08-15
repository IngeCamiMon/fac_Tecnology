/**
 * Created by Jhoy on 23/04/2017.
 */
const db = require('../dbconnection');

function getAllEmpleados(callback){
    return db.query('SELECT * FROM nomina', callback);
}

function getEmpleadoById(id, callback){
    return db.query('SELECT * FROM nomina WHERE CodEmp = ?', [id], callback);
}

function getEmpleadosByCar(idCar, callback){
    return db.query('SELECT * FROM nomina WHERE CodCar = ?', [idCar], callback);
}

function addEmpleados(e, callback){
    let photo = e.PhotoUrl ? `'${e.PhotoUrl}'` : null;

    return db.query(`INSERT INTO nomina 
    (CodEmp, Nombres, Apellidos, Salario, Fecha_ingreso, PhotoUrl, CodCar, CodSuc) VALUES 
    (${e.CodEmp},'${e.Nombres}','${e.Apellidos}',${e.Salario},'${e.Fecha_ingreso}',${photo},${e.CodCar},${e.CodSuc})`,
      callback);
}

function deleteEmpleado(id, callback){
    return db.query('DELETE FROM nomina WHERE CodEmp = ?', [id], callback);
}

function updateEmpleado(id, e, callback) {
    let photo = e.PhotoUrl ? `'${e.PhotoUrl}'` : null;
    return db.query(`UPDATE nomina SET CodEmp = ${e.CodEmp}, Nombres = '${e.Nombres}', 
    Apellidos = '${e.Apellidos}', Salario = ${e.Salario}, Fecha_ingreso = '${e.Fecha_ingreso}',
    PhotoUrl = ${photo}, CodCar = ${e.CodCar}, CodSuc = ${e.CodSuc} WHERE CodEmp = ${id}`, callback);
}

module.exports = {
    getAllEmpleados,
    getEmpleadoById,
    addEmpleados,
    deleteEmpleado,
    updateEmpleado,
    getEmpleadosByCar
};