/**
 * Created by Jhoy on 24/04/2017.
 */
const express = require('express');
const router = express.Router();
let ing = require('../models/ingredientes');

router.get('/', (req, res) => {
    ing.getAllIng((err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    })
});

router.get('/:id', (req, res) => {
    ing.getIngById(req.params.id, (err, rows) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    ing.addIng(req.body, (err, count) => {
        if(err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.delete('/:id', (req, res) => {
    ing.deleteIng(req.params.id, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', (req, res) => {
    ing.updateIng(req.params.id, req.body, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;