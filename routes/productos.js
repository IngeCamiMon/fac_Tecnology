/**
 * Created by Jhoy on 15/04/2017.
 */
const express = require('express');
const router = express.Router();
const pro = require('../models/productos');

router.get('/', (req, res) => {
    pro.getAllProductos((err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', (req, res) => {
    pro.getProductoByID(req.params.id, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id/ingredientes', (req, res) => {
    pro.getProductosIng(req.params.id, (err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/:idPro/ingredientes/:idIng', (req, res) => {
    pro.addProdIng(req.params.idPro, req.params.idIng, (err, count) => {
        if(err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.delete('/:idPro/ingredientes/:idIng', (req, res) => {
    pro.deleteProdIng(req.params.idPro, req.params.idIng, (err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/categoria/:id', (req, res) => {
    pro.getProductosByCat(req.params.id, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    pro.addProducto(req.body, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    })
});

router.delete('/:id', (req, res) => {
    pro.deleteProducto(req.params.id, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', (req, res) => {
    pro.editProducto(req.params.id, req.body, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    })
});

module.exports = router;