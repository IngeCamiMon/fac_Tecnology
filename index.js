const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const url = require('url');

const categorias = require('./routes/categorias');
const productos = require('./routes/productos');
const cargos = require('./routes/cargos');
const tiendas = require('./routes/tiendas');
const empleados = require('./routes/empleados');
const ingredientes = require('./routes/ingredientes');
const proveedores = require('./routes/proveedores');
const ventas = require('./routes/ventas');

let app = express();

app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(express.static(path.join(__dirname, 'app')));
app.use(logger('dev'));

app.use('/categorias', categorias);
app.use('/productos', productos);
app.use('/cargos', cargos);
app.use('/tiendas', tiendas);
app.use('/empleados', empleados);
app.use('/ingredientes', ingredientes);
app.use('/proveedores', proveedores);
app.use('/ventas', ventas);

app.get('/', (req, res) => {
    res.sendFile('app/index.html');
});

app.listen(app.get('port'), () => {
    console.log('App running port' + app.get('port'));
});
