/**
 * Created by Jhoy on 15/04/2017.
 */
const db = require('../dbconnection.js');

function getAllProductos(callback) {
    return db.query('SELECT * FROM productos', callback);
}

function getProductoByID(id, callback) {
    return db.query('SELECT * FROM productos WHERE CodPro = ?', [id], callback);
}

function getProductosByCat(idCat, callback) {
    return db.query('SELECT * FROM productos WHERE CodCat = ?', [idCat], callback);
}

function addProdIng(idPro, idIng, callback) {
    return db.query('INSERT INTO prod_has_ingr VALUES(?,?)', [idIng, idPro], callback);
}

function getProductosIng(id, callback) {
    return db.query(`SELECT i.* FROM prod_has_ingr p INNER JOIN ingredientes i 
    ON p.CodIng = i.CodIng
    WHERE p.CodPro = ?`, [id], callback)
}

function deleteProducto(id, callback) {
    return db.query('DELETE FROM productos WHERE CodPro = ?', [id], callback);
}

function addProducto(pro, callback) {
    let desc = pro.Descripcion ? `'${pro.Descripcion}'` : null;
    return db.query(`INSERT INTO productos(Nombre,Descripcion,Precio,CodCat) VALUES
    ('${pro.Nombre}', ${desc}, ${pro.Precio},${pro.CodCat})`, callback);
}

function deleteProdIng(idPro, idIng, callback) {
    return db.query('DELETE FROM prod_has_ingr WHERE CodPro=? AND CodIng=?', [idPro, idIng], callback);
}

function editProducto(id, pro, callback) {
    return db.query(`UPDATE productos SET 
    Nombre = '${pro.Nombre}', Descripcion = '${pro.Descripcion || null}', 
    Precio = ${pro.Precio},
    CodCat = ${pro.CodCat} WHERE CodPro = ${id}`, callback);
}

module.exports = {
    getAllProductos,
    getProductoByID,
    getProductosByCat,
    addProducto,
    deleteProducto,
    editProducto,
    getProductosIng,
    addProdIng,
    deleteProdIng
};
