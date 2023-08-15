let express = require('express');
let router = express.Router();
let tiendas = require('../models/tiendas');

router.get('/', (req, res) => {
    tiendas.getAllTiendas((err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', (req, res) => {
    tiendas.getTiendaById(req.params.id, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    tiendas.addTienda(req.body, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.delete('/:id', (req, res) => {
    tiendas.deleteTienda(req.params.id, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', (req, res) => {
    tiendas.editTienda(req.params.id, req.body, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    })
});

module.exports = router;