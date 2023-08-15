/**
 * Created by Jhoy on 23/04/2017.
 */
const multipart = require('connect-multiparty');
const express = require('express');
const slug = require('slug');
const path = require('path');
const fs = require('fs');
let router = express.Router();
let party = multipart();

let emp = require('../models/empleados');

router.get('/', (req, res) => {
    emp.getAllEmpleados((err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', (req, res) => {
    emp.getEmpleadoById(req.params.id, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/cargos/:id', (req, res) => {
    emp.getEmpleadosByCar(req.params.id, (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', party,(req, res) => {
    let name = null;
    if (req.files.file) {
        let tempPath = req.files.file.path;
        let fname = req.files.file.name;
        let ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
        name = slug(req.body.Nombres + `${req.body.CodEmp}`).toLowerCase() + `.${ext}`;
        let uploadPath = path.resolve(`./app/img/uploads/${name}`);
        fs.readFile(tempPath, (err, data) => {
           fs.writeFile(uploadPath, data);
        });
        req.body.PhotoUrl = `/img/uploads/${name}`;
        postEmp();
    } else {
        postEmp();
    }

    function postEmp(){
        emp.addEmpleados(req.body, (err, count) => {
            if (err) {
                res.json(err);
            } else {
                res.json(count);
            }
        });
    }
});

router.delete('/:id', (req, res) => {
    emp.deleteEmpleado(req.params.id, (err, count) => {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', party, (req, res) => {
    let name = null;
    if (req.files.file) {
        let tempPath = req.files.file.path;
        let fname = req.files.file.name;
        let ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
        name = slug(req.body.Nombres + `${req.body.CodEmp}`).toLowerCase() + `.${ext}`;
        let uploadPath = path.resolve(`./app/img/uploads/${name}`);
        fs.readFile(tempPath, (err, data) => {
            fs.writeFile(uploadPath, data);
        });
        req.body.PhotoUrl = `/img/uploads/${name}`;
        postEmp();
    } else {
        postEmp();
    }

    function postEmp(){
        if (req.body.PhotoUrl == 'null'){
            req.body.PhotoUrl = null;
        }
        emp.updateEmpleado(req.params.id, req.body, (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

module.exports = router;