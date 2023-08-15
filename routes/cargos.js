const express = require('express');
const router = express.Router();
let car = require('../models/cargos');

router.get('/', (req, res) => {
    car.getAllCargos((err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }  
    })
});

router.get('/:id', (req, res) => {
    car.getCargosById(req.params.id, (err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        } 
    });
});

router.post('/', (req, res) => {
    car.addCargo(req.body, (err, count) => {
        if(err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.delete('/:id', (req, res) => {
    car.deleteCargo(req.params.id, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', (req, res) => {
    car.updateCargo(req.params.id, req.body, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;