const db = require('../dbconnection');

function getAllVentas(callback){
    return db.query(`SELECT v.Fecha, v.CodVen, n.* FROM ventas v
    INNER JOIN nomina n ON n.CodEmp = v.CodEmp`, callback);
}

function getProdByVenta(id, callback) {
    return db.query(`SELECT * FROM vent_has_prod v
        INNER JOIN productos p ON p.CodPro = v.CodPro 
        WHERE CodVen = ?`, [id], callback);
}

function getVentaById(id, callback){
    return db.query(`SELECT v.Fecha, v.CodVen, n.* FROM ventas v
    INNER JOIN nomina n ON n.CodEmp = v.CodEmp WHERE CodVen = ?`, [id], callback);
}

function addVenta(venta, callback) {
    return db.query('INSERT INTO ventas(Fecha, CodEmp) VALUES(?, ?)', [venta.Fecha, venta.CodEmp], callback);
}

function addProVenta(id, prod, callback) {
    return db.query(`INSERT INTO vent_has_prod VALUES(${prod.Cantidad}, ${id}, ${prod.CodPro})`, callback);
}

module.exports = {
    getAllVentas,
    addVenta,
    addProVenta,
    getProdByVenta,
    getVentaById
};
