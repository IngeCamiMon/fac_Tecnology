const express = require('express');
const router = express.Router();
let ven = require('../models/ventas');

router.get('/', (req, res) => {
    ven.getAllVentas((err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }  
    })
});

router.get('/:id', (req, res) => {
    ven.getVentaById(req.params.id, (err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        } 
    });
});

router.get('/:id/productos', (req, res) => {
    ven.getProdByVenta(req.params.id, (err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }  
    })
});

router.post('/', (req, res) => {
    ven.addVenta(req.body, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    })
});

router.post('/:id/productos', (req, res) => {
    ven.addProVenta(req.params.id, req.body, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

module.exports = router;