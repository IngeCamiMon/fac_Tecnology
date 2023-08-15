let express = require('express');
let router = express.Router();
let cat = require('../models/categorias.js');

router.get('/', (req, res) => {
    cat.getAllCategorias((err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', (req, res) => {
    cat.getCategoriaByID(req.params.id, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    cat.addCategoria(req.body, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.delete('/:id', (req, res) => {
    cat.deleteCategoria(req.params.id, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', (req, res) => {
    cat.updateCategoria(req.params.id, req.body, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;