/**
 * Created by Jhoy on 25/04/2017.
 */
const express = require('express');
const router = express.Router();
let prov = require('../models/proveedores');

router.get('/', (req, res) => {
    prov.getAllProv((err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    })
});

router.get('/:id', (req, res) => {
    prov.getProvById(req.params.id, (err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id/ingredientes', (req, res) => {
    prov.getProvIng(req.params.id, (err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    prov.addProv(req.body, (err, count) => {
        if(err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.post('/:idProv/ingredientes/:idIng', (req, res) => {
    prov.addProvIng(req.params.idProv, req.params.idIng, (err, count) => {
        if(err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.delete('/:idProv/ingredientes/:idIng', (req, res) => {
    prov.deleteProvIng(req.params.idProv, req.params.idIng, (err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.delete('/:id', (req, res) => {
    prov.deleteProv(req.params.id, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', (req, res) => {
    prov.updateProv(req.params.id, req.body, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;